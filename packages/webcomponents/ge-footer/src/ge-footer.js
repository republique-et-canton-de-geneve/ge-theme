import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

const TRANSLATIONS = {
    fr: {
        contact: "Contact",
        accessibility: "Accessibilité",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
    },
    en: {
        contact: "Contact",
        accessibility: "Accessibility",
        privacy: "Privacy Policy",
        terms: "Terms and Conditions",
    },
    es: {
        contact: "Contacto",
        accessibility: "Accesibilidad",
        privacy: "Política de privacidad",
        terms: "Condiciones generales",
    },
    pt: {
        contact: "Contacto",
        accessibility: "Acessibilidade",
        privacy: "Política de privacidade",
        terms: "Termos e condições",
    },
};

@customElement("ge-footer")
class GeFooter extends LitElement {
    static styles = css`
        :host {
            display: block;
            grid-area: footer;
            font-family: 'Roboto', Arial, Helvetica, sans-serif;
        }

        footer {
            background: var(--md-sys-color-surface);
            border-top: 1px solid var(--md-sys-color-outline-variant);
        }

        #ge-footer {
            transition: max-width 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 74px;
            padding: 0 32px;
            margin: auto;
        }

        #ge-footer hr {
            border-color: var(--md-sys-color-outline-variant);
            border-style: solid;
            border-bottom: none;
            border-width: 1px;
            width: calc(100% - 16px);
            margin: 4px 0 8px 0;
            display: none;
        }

        #ge-footer > nav {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-right: 20px;
        }

        #ge-footer > nav > a {
            color: var(--md-sys-color-on-surface-variant);
            font-family: 'Roboto', var(--md-ref-typeface-brand), Arial, Helvetica, sans-serif;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            font-style: normal;
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25px);
            font-weight: 400;
            text-decoration: none;
        }

        #ge-footer > nav > span {
            color: var(--md-sys-color-outline-variant);
        }

        #ge-footer > nav > a:hover {
            color: var(--md-sys-color-primary);
        }

        #ge-footer > nav > a:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
            border-radius: 2px;
        }

        #ge-footer-armoiries {
            cursor: pointer;
        }

        @media (max-width: 768px) {
            #ge-footer {
                display: block;
                height: 278px;
            }

            #ge-footer > nav {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                margin-right: 0;
            }

            #ge-footer > nav > span {
                display: none;
            }

            #ge-footer-armoiries {
                margin-top: 32px;
            }

            #ge-footer hr {
                display: block;
            }
        }

        #ge-footer.maxwidth-false {
            max-width: 1107px;
        }

        #ge-footer.maxwidth-true {
            max-width: 100%;
        }
    `;

    /** When true, footer spans full width. When false, constrained to 1107px. */
    @property({ type: Boolean, reflect: true, attribute: 'maxwidth' })
    get maxWidth() {
        return this.#maxWidthValue;
    }
    set maxWidth(value) {
        const oldValue = this.#maxWidthValue;
        this.#maxWidthValue = Boolean(value);
        this.requestUpdate('maxWidth', oldValue);
    }

    #maxWidthValue = true;

    /** URL for the Contact link */
    @property({ type: String }) contactLink = "https://www.ge.ch/c/footer-edm-aide";

    /** URL for the Accessibility link */
    @property({ type: String }) accessibilityLink = "https://www.ge.ch/c/footer-edm-accessibilite";

    /** URL for the Privacy Policy link */
    @property({ type: String }) privacyLink = "https://www.ge.ch/c/footer-edm-confidentialite";

    /** URL for the Terms link */
    @property({ type: String }) termsLink = "https://www.ge.ch/c/footer-edm-cgu";

    /** Custom links array. Overrides default links when provided. */
    @property({
        attribute: "links",
        converter: {
            fromAttribute: (value) => {
                if (!value) return undefined;
                try {
                    return JSON.parse(value);
                } catch {
                    return undefined;
                }
            }
        }
    })
    links;

    /** Override language for footer labels. If not set, inherits from nearest ancestor [lang] attribute, defaults to 'fr'. */
    @property({ type: String, attribute: 'locale' })
    get locale() {
        return this.#localeValue;
    }
    set locale(value) {
        const oldValue = this.#localeValue;
        this.#localeValue = value || undefined;
        this.requestUpdate('locale', oldValue);
    }

    #localeValue;

    #langObserver;

    get #resolvedLang() {
        if (this.locale) return this.locale;
        const lang = this.closest('[lang]')?.lang;
        return lang ? lang.split('-')[0] : 'fr';
    }

    /** Theme: 'light' or 'dark'. Defaults to system preference, attribute overrides. */
    @property({ type: String, reflect: true, attribute: 'theme' })
    get theme() {
        return this.#resolvedTheme;
    }
    set theme(value) {
        const oldValue = this.#resolvedTheme;
        if (value) {
            this.#resolvedTheme = value;
            this.#userSetTheme = true;
        } else {
            this.#userSetTheme = false;
            this.#resolvedTheme = this.#systemTheme;
        }
        this.requestUpdate('theme', oldValue);
    }

    #resolvedTheme = 'light';
    #systemTheme = 'light';
    #mediaQuery;
    #userSetTheme = false;

    #onSystemThemeChange = () => {
        this.#systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (!this.#userSetTheme) {
            const oldValue = this.#resolvedTheme;
            this.#resolvedTheme = this.#systemTheme;
            this.requestUpdate('theme', oldValue);
        }
    };

    connectedCallback() {
        super.connectedCallback();

        this.#systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        if (!this.hasAttribute("theme")) {
            this.#resolvedTheme = this.#systemTheme;
            this.#userSetTheme = false;
        } else {
            this.#userSetTheme = true;
        }

        this.#mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.#mediaQuery.addEventListener("change", this.#onSystemThemeChange);

        this.#langObserver = new MutationObserver(() => {
            if (!this.locale) {
                this.requestUpdate();
            }
        });
        this.#langObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang'],
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#mediaQuery?.removeEventListener("change", this.#onSystemThemeChange);
        this.#langObserver?.disconnect();
    }

    get #resolvedLinks() {
        if (this.links?.length) {
            return this.links;
        }
        const t = TRANSLATIONS[this.#resolvedLang] || TRANSLATIONS.fr;
        return [
            { title: t.contact, href: this.contactLink },
            { title: t.accessibility, href: this.accessibilityLink },
            { title: t.privacy, href: this.privacyLink },
            { title: t.terms, href: this.termsLink },
        ];
    }

    render() {
        const containerClasses = {
            "maxwidth-true": this.maxWidth,
            "maxwidth-false": !this.maxWidth
        };

        return html`
            <footer>
                <div id="ge-footer" class=${classMap(containerClasses)}>
                    <nav>
                        ${this.#resolvedLinks.map((link, index) => html`
                            ${index > 0 ? html`<span aria-hidden="true">|</span>` : null}
                            <a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.title}</a>
                        `)}
                    </nav>
                    <img
                            id="ge-footer-armoiries"
                            src="https://static.app.ge.ch/theme/icons/common/footer/footer-armoiries-${this.theme}.svg"
                            alt="Armoiries de la République et canton de Genève"
                            height="54"
                            @click="${this.#onImageClick}"
                    />
                </div>
            </footer>
        `;
    }

    #onImageClick(e) {
        this.dispatchEvent(new CustomEvent("ge-footer-image-click", {
            detail: { originalEvent: e },
            bubbles: true,
            composed: true
        }));
    }
}

export { GeFooter };