import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "@fontsource/roboto/400.css";

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

        .ge-footer-container {
            transition: max-width 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            padding: 0 32px;
            margin: auto;
        }

        .ge-footer-container > nav {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-right: 20px;
        }

        .ge-footer-container > nav > a {
            color: var(--md-sys-color-on-surface-variant);
            font-family: 'Roboto', var(--md-ref-typeface-brand), Arial, Helvetica, sans-serif;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            font-style: normal;
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25px);
            font-weight: 400;
            text-decoration: none;
        }

        .ge-footer-container > nav > span {
            color: var(--md-sys-color-outline-variant);
        }

        .ge-footer-container > nav > a:hover {
            color: var(--md-sys-color-primary);
        }

        .ge-footer-container > nav > a:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
            border-radius: 2px;
        }

        .ge-footer-armoiries {
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .ge-footer-container {
                display: block;
                padding: 12px;
                height: auto;
            }

            .ge-footer-container > nav {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                margin-right: 0;
            }

            .ge-footer-container > nav > span {
                display: none;
            }

            .ge-footer-armoiries {
                margin-top: 10px;
            }
        }

        .ge-footer-container.fullwidth-false {
            max-width: 1107px;
        }

        .ge-footer-container.fullwidth-true {
            max-width: 100%;
        }
    `;

    /** When true, footer spans full width. When false, constrained to 1107px. */
    @property({ type: Boolean, reflect: true, attribute: 'fullwidth' })
    get fullWidth() {
        return this.#fullWidthValue;
    }
    set fullWidth(value) {
        const oldValue = this.#fullWidthValue;
        this.#fullWidthValue = Boolean(value);
        this.requestUpdate('fullWidth', oldValue);
    }

    #fullWidthValue = true;

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
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#mediaQuery?.removeEventListener("change", this.#onSystemThemeChange);
    }

    get #resolvedLinks() {
        if (this.links?.length) {
            return this.links;
        }
        return [
            { title: "Contact", href: this.contactLink },
            { title: "Accessibilité", href: this.accessibilityLink },
            { title: "Politique de confidentialité", href: this.privacyLink },
            { title: "Conditions générales", href: this.termsLink }
        ];
    }

    render() {
        const containerClasses = {
            "ge-footer-container": true,
            "fullwidth-true": this.fullWidth,
            "fullwidth-false": !this.fullWidth
        };

        return html`
            <footer>
                <div class=${classMap(containerClasses)}>
                    <nav>
                        ${this.#resolvedLinks.map((link, index) => html`
                            ${index > 0 ? html`<span aria-hidden="true">|</span>` : null}
                            <a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.title}</a>
                        `)}
                    </nav>
                    <img
                            class="ge-footer-armoiries"
                            src="https://static.app.ge.ch/theme/icons/common/footer/footer-armoiries-${this.theme}.svg"
                            alt="Armoiries de la République et canton de Genève"
                            height="62"
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