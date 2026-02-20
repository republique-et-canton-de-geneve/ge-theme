import { LitElement, html, css } from 'lit';
import '@m3e/dialog';
import '@m3e/button';

class GeConsent extends LitElement {
    static styles = css`
        .base {
            background-color: red !important;
        }
    a {
      color: var(--md-sys-color-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration-color: var(--md-sys-color-primary);
    }        .base {
                 background-color: red;
             }


        a:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
      border-radius: 2px;
    }
    #ge-consent-actions {
        display: flex;
        justify-content: end;
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        if (!this.#hasConsented()) {
            this.updateComplete.then(() => this.show());
        }
    }

    get #dialog() {
        return this.shadowRoot.querySelector('m3e-dialog');
    }

    #hasConsented() {
        return document.cookie.includes('mtm_consent') || document.cookie.includes('mtm_consent_removed');
    }

    #respond(granted) {
        window._mtm?.push([granted ? 'setConsentGiven' : 'setConsentRevoked']);
        this.#dialog.open = false;
        this.dispatchEvent(new CustomEvent('consent', { detail: { granted }, bubbles: true, composed: true }));
    }

    /** Opens the consent dialog programmatically. */
    show() {
        this.#dialog.open = true;
    }

    /** Resets consent by clearing cookies and reopening the dialog. */
    reset() {
        document.cookie = 'mtm_consent=; Max-Age=0; path=/';
        document.cookie = 'mtm_consent_removed=; Max-Age=0; path=/';
        window._mtm?.push(['forgetConsentGiven']);
        this.show();
    }

    render() {
        return html`
            <m3e-dialog disable-close>
                Ce site utilise des cookies statistiques indispensables pour améliorer votre expérience de navigation.
                Vous pourrez modifier votre choix à tout moment dans les <a href="https://www.ge.ch/conditions-generales#cookies" target="_blank">Conditions générales</a> de ge.ch, sous Analyse statistique de fréquentation.
                <div slot="actions" id="ge-consent-actions">
                    <m3e-button variant="text" @click=${() => this.#respond(false)}>Refuser</m3e-button>
                    <m3e-button variant="text" @click=${() => this.#respond(true)}>Accepter</m3e-button>
                </div>
            </m3e-dialog>
        `;
    }
}

customElements.define('ge-consent', GeConsent);

export { GeConsent };