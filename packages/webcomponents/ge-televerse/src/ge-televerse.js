import QRCode from 'qrcode/lib/browser.js';

const STYLES = `
  :host {
    display: block;
    font-family: var(--md-sys-typescale-body-large-font, 'Roboto', sans-serif);
    color: var(--md-sys-color-on-surface, #1c1b1f);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
    background: var(--md-sys-color-surface-container-low, #f7f2fa);
  }

  .qr-wrapper {
    padding: 16px;
    background: #fff;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }

  .qr-wrapper canvas {
    display: block;
    width: 200px;
    height: 200px;
    image-rendering: pixelated;
  }

  .label {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    color: var(--md-sys-color-on-surface-variant, #49454f);
    text-align: center;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
  }

  .status--waiting {
    color: var(--md-sys-color-on-surface-variant, #49454f);
  }

  .status--uploading {
    color: var(--md-sys-color-primary, #6750a4);
  }

  .status--complete {
    color: var(--md-sys-color-success, #2e7d32);
  }

  .status--error {
    color: var(--md-sys-color-error, #b3261e);
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--md-sys-color-outline-variant, #cac4d0);
    border-top-color: var(--md-sys-color-primary, #6750a4);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .hidden { display: none; }
`;

/**
 * <ge-televerse> web component.
 *
 * Attributes:
 *   api-base-url  - Backend API base URL (default: /api)
 *   user-id       - User identifier
 *   form-id       - Form identifier
 *   document-type - Document type (e.g. ID_CARD, PROOF_OF_ADDRESS)
 *
 * Events dispatched:
 *   televerse-ready       - Session created, QR code displayed. Detail: { token, uploadUrl }
 *   televerse-upload      - A file was uploaded. Detail: { documentId, fileName }
 *   televerse-complete    - User finalized uploads. Detail: { documentId, pageCount }
 *   televerse-error       - An error occurred. Detail: { message }
 *   televerse-expired     - Session expired.
 */
class GeTeleverse extends HTMLElement {

    static get observedAttributes() {
        return ['api-base-url', 'user-id', 'form-id', 'document-type'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._eventSource = null;
        this._token = null;
    }

    connectedCallback() {
        this._render();
        this._createSession();
    }

    disconnectedCallback() {
        this._closeSSE();
    }

    get apiBaseUrl() {
        return this.getAttribute('api-base-url') || '/api';
    }

    get userId() {
        return this.getAttribute('user-id') || '';
    }

    get formId() {
        return this.getAttribute('form-id') || '';
    }

    get documentType() {
        return this.getAttribute('document-type') || '';
    }

    _render() {
        this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="container">
        <div class="qr-wrapper">
          <canvas id="qr-canvas"></canvas>
        </div>
        <div class="label">
          Scannez ce QR code avec votre téléphone pour téléverser un document
        </div>
        <div id="status" class="status status--waiting">
          <div class="spinner"></div>
          <span>Création de la session…</span>
        </div>
      </div>
    `;
    }

    async _createSession() {
        try {
            const res = await fetch(`${this.apiBaseUrl}/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    formId: this.formId,
                    documentType: this.documentType,
                }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const { token, uploadUrl, expiresAt } = await res.json();
            this._token = token;

            await this._renderQR(uploadUrl);
            this._setStatus('waiting', 'En attente du téléversement…');
            this._subscribeSSE(token);

            // Auto-expire
            const remaining = expiresAt - Date.now();
            if (remaining > 0) {
                this._expiryTimeout = setTimeout(() => this._handleExpired(), remaining);
            }

            this.dispatchEvent(new CustomEvent('televerse-ready', {
                bubbles: true, composed: true,
                detail: { token, uploadUrl },
            }));

        } catch (err) {
            this._setStatus('error', 'Erreur de connexion');
            this.dispatchEvent(new CustomEvent('televerse-error', {
                bubbles: true, composed: true,
                detail: { message: err.message },
            }));
        }
    }

    async _renderQR(url) {
        const canvas = this.shadowRoot.getElementById('qr-canvas');
        if (!canvas) return;

        await QRCode.toCanvas(canvas, url, {
            width: 200,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' },
            errorCorrectionLevel: 'M',
        });
    }

    _subscribeSSE(token) {
        this._closeSSE();

        const url = `${this.apiBaseUrl}/sessions/${token}/events`;
        this._eventSource = new EventSource(url);

        this._eventSource.addEventListener('connected', () => {
            this._setStatus('waiting', 'En attente du téléversement…');
        });

        this._eventSource.addEventListener('upload-complete', (e) => {
            const data = JSON.parse(e.data);
            this._setStatus('uploading', `Page reçue : ${data.fileName || 'document'}`);
            this.dispatchEvent(new CustomEvent('televerse-upload', {
                bubbles: true, composed: true,
                detail: { documentId: data.documentId, fileName: data.fileName },
            }));
        });

        this._eventSource.addEventListener('session-complete', (e) => {
            const data = JSON.parse(e.data);
            this._setStatus('complete', 'Document prêt');
            this._closeSSE();
            this.dispatchEvent(new CustomEvent('televerse-complete', {
                bubbles: true, composed: true,
                detail: { documentId: data.documentId, pageCount: data.fileSize },
            }));
        });

        this._eventSource.onerror = () => {
            // SSE connection lost — don't treat as fatal, may reconnect automatically
        };
    }

    _closeSSE() {
        if (this._eventSource) {
            this._eventSource.close();
            this._eventSource = null;
        }
        if (this._expiryTimeout) {
            clearTimeout(this._expiryTimeout);
            this._expiryTimeout = null;
        }
    }

    _handleExpired() {
        this._closeSSE();
        this._setStatus('error', 'Session expirée');
        this.dispatchEvent(new CustomEvent('televerse-expired', {
            bubbles: true, composed: true,
        }));
    }

    _setStatus(type, text) {
        const el = this.shadowRoot.getElementById('status');
        if (!el) return;

        const icons = {
            waiting: '<div class="spinner"></div>',
            uploading: '<div class="spinner"></div>',
            complete: '✅',
            error: '❌',
        };

        el.className = `status status--${type}`;
        el.innerHTML = `${icons[type] || ''}<span>${text}</span>`;
    }
}

customElements.define('ge-televerse', GeTeleverse);

export default GeTeleverse;