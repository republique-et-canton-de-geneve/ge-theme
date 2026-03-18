import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "@m3e/icon-button";
import "./ge-header-public-menu.js";
import { DEFAULT_MENU_DATA } from "./default-menu-data.js";


export @customElement("ge-header-public")
class GeHeaderPublic extends LitElement {

    @property({ type: String }) maxWidth = "true";
    @property({ type: Boolean }) showMenu = false;
    @property({ type: Boolean }) showLogin = false;
    @property({ type: String }) loginUrl = "https://www.ge.ch/connexion";
    @property({ type: String }) loginLabel = "Connexion";
    @property({ type: Object }) menuData = DEFAULT_MENU_DATA;

    @state() _menuOpen = false;

    constructor() {
        super();
        // SWC transpiles class fields into instance properties that shadow
        // Lit's reactive prototype accessors. Delete them so Lit's setters work.
        for (const prop of ['maxWidth', 'showMenu', 'showLogin', 'loginUrl', 'loginLabel', 'menuData', '_menuOpen']) {
            if (this.hasOwnProperty(prop)) {
                const val = this[prop];
                delete this[prop];
                this[prop] = val;
            }
        }
    }

    static styles = css`
        :host {
            display: block;
            font-family: var(--md-sys-typescale-body-medium-font);
            color: var(--md-sys-color-on-surface);
        }

        header {
            background: var(--md-sys-color-surface);
            box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5);
            min-height: 81px;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            position: relative;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--md-ref-spacings-2, 8px) var(--md-ref-spacings-4, 16px) 0 var(--md-ref-spacings-4, 16px);
            transition: width 0.3s ease;
            margin: auto;
        }

        a.logo-section {
            text-decoration: none;
            color: inherit;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: var(--md-ref-spacings-4, 16px);
            cursor: pointer;
        }

        .title {
            font-family: var(--md-sys-typescale-headline-medium-font);
            font-size: var(--md-sys-typescale-headline-medium-size);
            font-weight: var(--md-ref-typeface-weight-400);
            color: var(--md-sys-color-on-surface-variant);
        }

        /* Action buttons (login, menu) */
        .header-actions {
            display: flex;
            align-items: center;
            gap: var(--md-ref-spacings-4, 16px);
        }

        .action-button-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--md-ref-spacings-1, 4px);
        }

        .action-label {
            font-family: var(--md-sys-typescale-label-small-font);
            font-size: var(--md-sys-typescale-label-small-size);
            font-weight: var(--md-sys-typescale-label-small-weight);
            line-height: var(--md-sys-typescale-label-small-line-height);
            color: var(--md-sys-color-on-surface-variant);
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .maxwidth-formulaire { max-width: 1107px; }
        .maxwidth-full { max-width: 100%; }

        @media (prefers-reduced-motion: reduce) {
            .header {
                transition: none;
            }
        }

        @media (max-width: 768px) {
            header {
                min-height: 75px;
            }

            .action-label {
                display: none;
            }

            .header-actions {
                gap: var(--md-ref-spacings-2, 8px);
            }
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._removeGlobalListeners();
    }

    _addGlobalListeners() {
        document.addEventListener("click", this._handleOutsideClick);
        document.addEventListener("keydown", this._handleKeydown);
    }

    _removeGlobalListeners() {
        document.removeEventListener("click", this._handleOutsideClick);
        document.removeEventListener("keydown", this._handleKeydown);
    }

    _handleOutsideClick(event) {
        if (!this.shadowRoot) return;
        const path = event.composedPath();
        if (!path.includes(this.shadowRoot)) {
            this._closeMenu();
        }
    }

    _handleKeydown(event) {
        if (event.key === "Escape" && this._menuOpen) {
            this._closeMenu();
            return;
        }

        // Focus trap when menu is open
        if (event.key === "Tab" && this._menuOpen) {
            const menuEl = this.shadowRoot?.querySelector('ge-header-public-menu');
            const menuButton = this.shadowRoot?.querySelector('#menu-toggle');
            if (!menuEl) return;

            const focusable = menuEl.getFocusableElements();
            if (focusable.length === 0) return;

            const allFocusable = menuButton ? [menuButton, ...focusable] : focusable;
            const first = allFocusable[0];
            const last = allFocusable[allFocusable.length - 1];

            // Determine currently focused element (may be in shadow DOM)
            const active = this.shadowRoot.activeElement ||
                           menuEl.shadowRoot?.activeElement;

            if (event.shiftKey) {
                if (active === first || !allFocusable.includes(active)) {
                    event.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last || !allFocusable.includes(active)) {
                    event.preventDefault();
                    first.focus();
                }
            }
        }
    }

    _toggleMenu() {
        this._menuOpen = !this._menuOpen;
        if (this._menuOpen) {
            this._addGlobalListeners();
        } else {
            this._removeGlobalListeners();
        }
        this.dispatchEvent(new CustomEvent("ge-menu-toggle", {
            detail: { open: this._menuOpen },
            bubbles: true,
            composed: true,
        }));

        if (this._menuOpen) {
            // Focus first focusable element in the menu after render
            this.updateComplete.then(() => {
                const menuEl = this.shadowRoot?.querySelector('ge-header-public-menu');
                if (menuEl) {
                    menuEl.updateComplete.then(() => {
                        const focusable = menuEl.getFocusableElements();
                        if (focusable.length > 0) {
                            focusable[0].focus();
                        }
                    });
                }
            });
        }
    }

    _closeMenu() {
        if (!this._menuOpen) return;
        this._menuOpen = false;
        this._removeGlobalListeners();
        this.dispatchEvent(new CustomEvent("ge-menu-toggle", {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));

        // Return focus to menu button
        this.updateComplete.then(() => {
            const menuButton = this.shadowRoot?.querySelector('#menu-toggle');
            if (menuButton) {
                menuButton.focus();
            }
        });
    }

    _renderLoginButton() {
        if (!this.showLogin) return nothing;
        return html`
            <div class="action-button-wrapper">
                <m3e-icon-button
                    href=${this.loginUrl}
                    aria-label=${this.loginLabel}
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                    </svg>
                </m3e-icon-button>
                <span class="action-label">${this.loginLabel}</span>
            </div>
        `;
    }

    _renderMenuButton() {
        if (!this.showMenu) return nothing;
        return html`
            <div class="action-button-wrapper">
                <m3e-icon-button
                    id="menu-toggle"
                    aria-label=${this._menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded=${this._menuOpen}
                    aria-haspopup="true"
                    @click=${this._toggleMenu}
                >
                    ${this._menuOpen
                        ? html`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>`
                        : html`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>`
                    }
                </m3e-icon-button>
                <span class="action-label">Menu</span>
            </div>
        `;
    }

    render() {
        const maxWidthClasses = {
            "header": true,
            "maxwidth-full": this.maxWidth === "true",
            "maxwidth-formulaire": this.maxWidth === "1107px" || this.maxWidth === "false"
        };

        const showActions = this.showLogin || this.showMenu;

        return html`
            <header role="banner">
                <div class=${classMap(maxWidthClasses)}>
                    <a href="https://www.ge.ch/" class="logo-section" target="gech">
                        <img
                            src="https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg"
                            alt="République et canton de Genève"
                            width="27"
                            height="45"
                        />
                        <span class="title">ge.ch</span>
                        <span class="visually-hidden">(s'ouvre dans une nouvelle fenêtre)</span>
                    </a>
                    ${showActions ? html`
                        <div class="header-actions">
                            ${this._renderLoginButton()}
                            ${this._renderMenuButton()}
                        </div>
                    ` : nothing}
                </div>
                ${this.showMenu ? html`
                    <ge-header-public-menu
                        .menuData=${this.menuData}
                        .open=${this._menuOpen}
                        .constrained=${this.maxWidth !== "true"}
                        @_request-close=${this._closeMenu}
                    ></ge-header-public-menu>
                ` : nothing}
            </header>
        `;
    }
}
