import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import '@m3e/dialog';
import '@m3e/button';

const TRANSLATIONS = {
    fr: {
        defaultLabel: "J'accepte les",
        defaultLinkLabel: "conditions générales",
        defaultDialogTitle: "Conditions générales",
        close: "Fermer",
        download: "Télécharger le PDF",
        required: "Vous devez accepter les conditions pour continuer",
        loading: "Chargement…",
        error: "Impossible de charger le contenu",
    },
    en: {
        defaultLabel: "I accept the",
        defaultLinkLabel: "terms and conditions",
        defaultDialogTitle: "Terms and conditions",
        close: "Close",
        download: "Download PDF",
        required: "You must accept the conditions to continue",
        loading: "Loading…",
        error: "Unable to load content",
    },
    es: {
        defaultLabel: "Acepto las",
        defaultLinkLabel: "condiciones generales",
        defaultDialogTitle: "Condiciones generales",
        close: "Cerrar",
        download: "Descargar PDF",
        required: "Debe aceptar las condiciones para continuar",
        loading: "Cargando…",
        error: "No se pudo cargar el contenido",
    },
    pt: {
        defaultLabel: "Aceito as",
        defaultLinkLabel: "condições gerais",
        defaultDialogTitle: "Condições gerais",
        close: "Fechar",
        download: "Baixar PDF",
        required: "Você deve aceitar as condições para continuar",
        loading: "Carregando…",
        error: "Não foi possível carregar o conteúdo",
    },
};

@customElement("ge-condition")
class GeCondition extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Roboto', Arial, Helvetica, sans-serif;
        }

        /* --- Summary block (mode=summary) --- */
        .summary {
            background: var(--md-sys-color-surface-container-low);
            border: 1px solid var(--md-sys-color-outline-variant);
            border-radius: var(--md-sys-shape-corner-small);
            padding: var(--md-ref-spacings-4);
            margin-bottom: var(--md-ref-spacings-3);
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            color: var(--md-sys-color-on-surface);
        }

        /* --- Checkbox row --- */
        .checkbox-row {
            display: flex;
            align-items: flex-start;
            gap: var(--md-ref-spacings-2);
        }

        .checkbox-row input[type="checkbox"] {
            margin-top: var(--md-ref-spacings-0-5);
            width: 18px;
            height: 18px;
            accent-color: var(--md-sys-color-primary);
            cursor: pointer;
            flex-shrink: 0;
        }

        .checkbox-row label {
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25px);
            color: var(--md-sys-color-on-surface);
            cursor: pointer;
            user-select: none;
        }

        .checkbox-row label a {
            color: var(--md-sys-color-primary);
            text-decoration: underline;
            cursor: pointer;
            font: inherit;
        }

        .checkbox-row label a:hover {
            color: var(--md-sys-color-on-surface);
        }

        .checkbox-row label a:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: var(--md-ref-spacings-0-5);
            border-radius: var(--md-sys-shape-corner-extra-small);
        }

        /* --- Validation error --- */
        .error-message {
            color: var(--md-sys-color-error);
            font-size: var(--md-sys-typescale-body-small-size, 12px);
            line-height: var(--md-sys-typescale-body-small-line-height, 16px);
            margin-top: var(--md-ref-spacings-1);
            margin-left: 26px;
        }

        /* --- Dialog (m3e-dialog) --- */
        m3e-dialog {
            --m3e-dialog-min-width: min(var(--md-ref-spacings-180), calc(100vw - var(--md-ref-spacings-12)));
            --m3e-dialog-max-width: min(var(--md-ref-spacings-180), calc(100vw - var(--md-ref-spacings-12)));
        }

        .dialog-body {
            height: min(60vh, 600px);
            overflow-y: auto;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            color: var(--md-sys-color-on-surface);
        }

        .dialog-body .loading,
        .dialog-body .error {
            text-align: center;
            padding: var(--md-ref-spacings-8);
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            color: var(--md-sys-color-on-surface-variant);
        }

        .dialog-body .error {
            color: var(--md-sys-color-error);
        }

        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--md-ref-spacings-2);
        }

        /* --- Tabs --- */
        .tabs {
            display: flex;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            overflow-x: auto;
            flex-shrink: 0;
            background: var(--md-sys-color-surface);
        }

        .tab {
            padding: var(--md-ref-spacings-3) var(--md-ref-spacings-6);
            border: none;
            background: none;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            font-weight: var(--md-sys-typescale-title-small-weight, 500);
            color: var(--md-sys-color-on-surface-variant);
            cursor: pointer;
            white-space: nowrap;
            border-bottom: 2px solid transparent;
            transition: color 0.15s, border-color 0.15s;
            font-family: inherit;
        }

        .tab:hover {
            color: var(--md-sys-color-on-surface);
            background: var(--md-sys-color-surface-container-low);
        }

        .tab[aria-selected="true"] {
            color: var(--md-sys-color-primary);
            border-bottom-color: var(--md-sys-color-primary);
        }

        .tab:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: -2px;
        }

        /* --- Accordion (details/summary) --- */
        .dialog-body details + details {
            border-top: 1px solid var(--md-sys-color-outline-variant);
        }

        .dialog-body details summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--md-ref-spacings-4) 0;
            cursor: pointer;
            font-size: var(--md-sys-typescale-title-small-size, 16px);
            font-weight: var(--md-sys-typescale-title-small-weight, 500);
            line-height: var(--md-sys-typescale-title-small-line-height, 24px);
            color: var(--md-sys-color-on-surface);
            list-style: none;
            user-select: none;
        }

        .dialog-body details summary::-webkit-details-marker {
            display: none;
        }

        .dialog-body details summary::after {
            content: "";
            width: var(--md-ref-spacings-6);
            height: var(--md-ref-spacings-6);
            flex-shrink: 0;
            margin-left: var(--md-ref-spacings-2);
            background: currentColor;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E") center / contain no-repeat;
            -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E") center / contain no-repeat;
            transition: transform 0.2s ease;
        }

        .dialog-body details[open] summary::after {
            transform: rotate(180deg);
        }

        .dialog-body details summary:hover {
            color: var(--md-sys-color-primary);
        }

        .dialog-body details summary:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: var(--md-ref-spacings-0-5);
            border-radius: var(--md-sys-shape-corner-extra-small);
        }

        .dialog-body details .section-content {
            padding: 0 0 var(--md-ref-spacings-4) 0;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            color: var(--md-sys-color-on-surface-variant);
        }
    `;

    /** Display mode: "checkbox" (level 1), "checkbox-dialog" (level 2), "summary" (level 3) */
    @property({ type: String })
    mode = "checkbox-dialog";

    /** Checkbox label text */
    @property({ type: String })
    label;

    /** Link label text within the checkbox label */
    @property({ type: String, attribute: "link-label" })
    linkLabel;

    /** URL to fetch HTML content for the dialog */
    @property({ type: String, attribute: "content-url" })
    contentUrl;

    /** Multiple documents with tabs: [{ title, contentUrl, pdfUrl }] */
    @property({
        attribute: "documents",
        converter: {
            fromAttribute: (value) => {
                if (!value) return undefined;
                try {
                    return JSON.parse(value);
                } catch {
                    return undefined;
                }
            },
        },
    })
    documents;

    /** URL to download the PDF version */
    @property({ type: String, attribute: "pdf-url" })
    pdfUrl;

    /** Plain-text summary displayed above the checkbox (mode=summary) */
    @property({ type: String })
    summary;

    /** Checkbox checked state */
    @property({ type: Boolean, reflect: true })
    checked = false;

    /** Whether the checkbox is required */
    @property({ type: Boolean })
    required = false;

    /** Dialog title */
    @property({ type: String, attribute: "dialog-title" })
    dialogTitle;

    /** Locale override (fr/en/es/pt) */
    @property({ type: String, attribute: "locale" })
    get locale() {
        return this.#localeValue;
    }
    set locale(value) {
        const oldValue = this.#localeValue;
        this.#localeValue = value || undefined;
        this.requestUpdate("locale", oldValue);
    }

    /** Field name for form integration */
    @property({ type: String })
    name = "condition";

    #localeValue;
    #langObserver;

    _showError = false;
    _contentHtml = null;
    _contentState = "idle"; // "idle" | "loading" | "loaded" | "error"
    _activeTabIndex = 0;

    /** Cache for fetched HTML content, keyed by URL */
    #contentCache = new Map();

    /** Reference to the trigger element that opened the dialog (for focus return) */
    #triggerEl = null;

    get #resolvedLang() {
        if (this.locale) return this.locale;
        const lang = this.closest("[lang]")?.lang;
        return lang ? lang.split("-")[0] : "fr";
    }

    get #t() {
        return TRANSLATIONS[this.#resolvedLang] || TRANSLATIONS.fr;
    }

    get #resolvedLabel() {
        return this.label ?? this.#t.defaultLabel;
    }

    get #resolvedLinkLabel() {
        return this.linkLabel ?? this.#t.defaultLinkLabel;
    }

    get #resolvedDialogTitle() {
        return this.dialogTitle ?? this.#t.defaultDialogTitle;
    }

    get #hasDialog() {
        return this.mode !== "checkbox" && (this.contentUrl || this.documents?.length);
    }

    get #activePdfUrl() {
        if (this.documents?.length) {
            return this.documents[this._activeTabIndex]?.pdfUrl;
        }
        return this.pdfUrl;
    }

    get #activeContentUrl() {
        if (this.documents?.length) {
            return this.documents[this._activeTabIndex]?.contentUrl;
        }
        return this.contentUrl;
    }

    get #dialog() {
        return this.shadowRoot.querySelector('m3e-dialog');
    }

    connectedCallback() {
        super.connectedCallback();
        this.#langObserver = new MutationObserver(() => {
            if (!this.locale) {
                this.requestUpdate();
            }
        });
        this.#langObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["lang"],
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#langObserver?.disconnect();
    }

    /** Validate the condition. Returns true if valid. */
    validate() {
        if (this.required && !this.checked) {
            this._showError = true;
            this.requestUpdate();
            return false;
        }
        this._showError = false;
        this.requestUpdate();
        return true;
    }

    /** Open the dialog programmatically */
    openDialog() {
        if (!this.#dialog || this.#dialog.open) return;
        this.#loadContent(this.#activeContentUrl);
        this.#dialog.open = true;
        this.dispatchEvent(
            new CustomEvent("ge-condition-dialog-open", {
                detail: { name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    /** Close the dialog programmatically */
    closeDialog() {
        if (!this.#dialog || !this.#dialog.open) return;
        this.#dialog.open = false;
    }

    render() {
        const t = this.#t;

        return html`
            ${this.mode === "summary" && this.summary
                ? html`<div class="summary">${this.summary}</div>`
                : nothing}

            <div class="checkbox-row">
                <input
                    type="checkbox"
                    id="condition-cb"
                    .checked=${this.checked}
                    ?required=${this.required}
                    aria-describedby=${this._showError ? "error-msg" : nothing}
                    @change=${this.#onCheckboxChange}
                />
                <label for="condition-cb">
                    ${this.#hasDialog
                        ? html`${this.#resolvedLabel}
                              <a
                                  href="javascript:void(0)"
                                  role="button"
                                  @click=${this.#onLinkClick}
                                  @keydown=${this.#onLinkKeydown}
                                  >${this.#resolvedLinkLabel}</a
                              >`
                        : html`${this.#resolvedLabel} ${this.#resolvedLinkLabel}`}
                </label>
            </div>

            ${this._showError
                ? html`<div class="error-message" id="error-msg" aria-live="polite">
                      ${t.required}
                  </div>`
                : nothing}

            ${this.#hasDialog ? this.#renderDialog() : nothing}
        `;
    }

    #renderDialog() {
        const t = this.#t;
        const hasTabs = this.documents?.length > 1;
        const activePdf = this.#activePdfUrl;

        return html`
            <m3e-dialog
                dismissible
                close-label=${t.close}
                @closed=${this.#onDialogClose}
            >
                <span slot="header">${this.#resolvedDialogTitle}</span>

                ${hasTabs
                    ? html`<div class="tabs" role="tablist">
                          ${this.documents.map(
                              (doc, i) => html`
                                  <button
                                      class="tab"
                                      role="tab"
                                      aria-selected=${i === this._activeTabIndex}
                                      @click=${() => this.#onTabClick(i)}
                                  >
                                      ${doc.title}
                                  </button>
                              `
                          )}
                      </div>`
                    : nothing}

                <div class="dialog-body" role="tabpanel">
                    ${this._contentState === "loading"
                        ? html`<div class="loading">${t.loading}</div>`
                        : this._contentState === "error"
                          ? html`<div class="error">${t.error}</div>`
                          : this._contentHtml
                            ? unsafeHTML(this._contentHtml)
                            : nothing}
                </div>

                <div slot="actions" class="dialog-actions">
                    ${activePdf
                        ? html`
                            <m3e-button
                                variant="text"
                                href=${activePdf}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${t.download}
                            </m3e-button>
                        `
                        : nothing}
                    <m3e-button variant="text" @click=${this.closeDialog}>
                        ${t.close}
                    </m3e-button>
                </div>
            </m3e-dialog>
        `;
    }

    #onCheckboxChange(e) {
        this.checked = e.target.checked;
        if (this.checked) {
            this._showError = false;
        }
        this.dispatchEvent(
            new CustomEvent("ge-condition-change", {
                detail: { checked: this.checked, name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    #onLinkClick(e) {
        e.preventDefault();
        this.#triggerEl = e.currentTarget;
        this.openDialog();
    }

    #onLinkKeydown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.#triggerEl = e.currentTarget;
            this.openDialog();
        }
    }

    #onDialogClose() {
        this.#triggerEl?.focus();
        this.#triggerEl = null;
        this.dispatchEvent(
            new CustomEvent("ge-condition-dialog-close", {
                detail: { name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    #onTabClick(index) {
        if (index === this._activeTabIndex) return;
        this._activeTabIndex = index;
        this.requestUpdate();
        const url = this.documents[index]?.contentUrl;
        if (url) {
            this.#loadContent(url);
        }
    }

    async #loadContent(url) {
        if (!url) return;

        // Check cache
        if (this.#contentCache.has(url)) {
            this._contentState = "loaded";
            this._contentHtml = this.#contentCache.get(url);
            this.requestUpdate();
            return;
        }

        this._contentState = "loading";
        this._contentHtml = null;
        this.requestUpdate();

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const htmlText = await response.text();
            const accordion = this.#parseToAccordion(htmlText);
            this.#contentCache.set(url, accordion);
            this._contentState = "loaded";
            this._contentHtml = accordion;
            this.requestUpdate();
        } catch {
            this._contentState = "error";
            this._contentHtml = null;
            this.requestUpdate();
        }
    }

    /**
     * Parse HTML content and transform h2/h3 headings into details/summary accordion.
     * If the content already contains <details> elements, return it as-is.
     */
    #parseToAccordion(htmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // If the content already has <details>, use as-is
        if (doc.querySelectorAll("details").length > 0) {
            return doc.body.innerHTML;
        }

        // Find headings (h2 or h3)
        const headings = doc.body.querySelectorAll("h2, h3");
        if (headings.length === 0) {
            // No headings — wrap the whole content in a single section
            return doc.body.innerHTML;
        }

        let result = "";
        // Content before the first heading
        let preContent = "";
        let currentNode = doc.body.firstChild;
        while (currentNode && currentNode !== headings[0]) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                preContent += currentNode.outerHTML;
            } else if (currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent.trim()) {
                preContent += currentNode.textContent;
            }
            currentNode = currentNode.nextSibling;
        }
        if (preContent.trim()) {
            result += preContent;
        }

        // Build accordion sections
        headings.forEach((heading, index) => {
            const title = heading.textContent.trim();
            let content = "";
            let sibling = heading.nextSibling;
            const nextHeading = headings[index + 1];

            while (sibling && sibling !== nextHeading) {
                if (sibling.nodeType === Node.ELEMENT_NODE) {
                    content += sibling.outerHTML;
                } else if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim()) {
                    content += sibling.textContent;
                }
                sibling = sibling.nextSibling;
            }

            result += `<details${index === 0 ? " open" : ""}>
                <summary>${title}</summary>
                <div class="section-content">${content}</div>
            </details>`;
        });

        return result;
    }

}

export { GeCondition };
