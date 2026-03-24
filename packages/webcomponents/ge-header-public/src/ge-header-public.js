import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "@m3e/icon-button";
import "./ge-header-public-menu.js";
import { DEFAULT_MENU_DATA } from "./default-menu-data.js";


export @customElement("ge-header-public")
class GeHeaderPublic extends LitElement {

    @property({ type: String }) maxWidth = "true";
    @property({ type: String }) fullWidth = "true";
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
        for (const prop of ['maxWidth', 'fullWidth', 'showMenu', 'showLogin', 'loginUrl', 'loginLabel', 'menuData', '_menuOpen']) {
            if (this.hasOwnProperty(prop)) {
                const val = this[prop];
                delete this[prop];
                this[prop] = val;
            }
        }
    }

    /**
     * Effective full-width state. The new `fullWidth` boolean takes precedence,
     * but legacy `maxWidth="false"|"1107px"` still works for backward compat.
     */
    get _isFullWidth() {
        if (this.maxWidth === "false" || this.maxWidth === "1107px") return false;
        return this.fullWidth === "true";
    }

    updated(changed) {
        super.updated(changed);
        if (changed.has('maxWidth') && this.maxWidth !== 'true') {
            console.warn(
                'ge-header-public: maxWidth attribute is deprecated. Use the fullWidth boolean property instead. ' +
                'Example: <ge-header-public .fullWidth=${false}>'
            );
        }
    }

    static styles = css`
        :host {
            display: block;
            position: relative;
            z-index: 0;
            font-family: var(--md-sys-typescale-body-medium-font);
            color: var(--md-sys-color-on-surface);
        }

        .scrim {
            position: fixed;
            inset: 0;
            background: var(--md-sys-color-scrim);
            opacity: 0;
            pointer-events: none;
            z-index: 99;
            transition: opacity 150ms cubic-bezier(0.2, 0.0, 0, 1.0);
        }

        .scrim--visible {
            opacity: 1;
            pointer-events: auto;
        }

        header {
            background: var(--md-sys-color-surface);
            box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5);
            height: 80px;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            position: relative;
            z-index: 100;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 var(--md-ref-spacings-4, 16px);
            margin: auto;
            position: relative;
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
            font-family: var(--md-sys-typescale-headline-small-font);
            font-size: var(--md-sys-typescale-headline-small-size);
            font-weight: var(--md-ref-typeface-weight-400);
            color: var(--md-sys-color-on-surface);
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
            cursor: pointer;
        }

        a.action-button-wrapper {
            text-decoration: none;
            color: inherit;
        }

        .action-button-wrapper:hover,
        .action-button-wrapper:active,
        .action-button-wrapper--active {
            color: var(--md-sys-color-primary);
        }

        .action-button-wrapper:hover .action-label,
        .action-button-wrapper:active .action-label,
        .action-button-wrapper--active .action-label {
            color: var(--md-sys-color-primary);
        }

        .action-button-wrapper:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: var(--md-ref-spacings-1, 4px);
            border-radius: var(--md-sys-shape-corner-medium, 12px);
        }

        .action-button-wrapper m3e-icon-button {
            --m3e-icon-button-small-icon-size: 37px;
            --m3e-icon-button-small-container-height: 37px;
        }

        .action-label {
            font-family: var(--md-sys-typescale-label-small-font);
            font-size: var(--md-sys-typescale-label-small-size);
            font-weight: var(--md-sys-typescale-label-small-weight);
            line-height: var(--md-sys-typescale-label-small-line-height);
            color: var(--md-sys-color-on-surface-variant);
            user-select: none;
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

        ge-header-public-menu {
            position: absolute;
            top: calc(100% - 11px);
            left: 0;
            right: 0;
        }

        .maxwidth-full > ge-header-public-menu {
            right: var(--md-ref-spacings-4, 16px);
        }

        .maxwidth-formulaire { max-width: 1107px; }
        .maxwidth-full { max-width: 100%; }

        @media (prefers-reduced-motion: reduce) {
            .scrim {
                transition: none;
            }
        }

        @media (max-width: 768px) {
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

    _handleMenuKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._toggleMenu();
        }
    }

    _handleOutsideClick(event) {
        if (!this.shadowRoot) return;
        const path = event.composedPath();
        const menuPanel = this.shadowRoot.querySelector('ge-header-public-menu');
        const menuToggle = this.shadowRoot.querySelector('#menu-toggle');
        if (menuPanel && path.includes(menuPanel)) return;
        if (menuToggle && path.includes(menuToggle)) return;
        this._closeMenu();
    }

    _handleKeydown(event) {
        if (event.key === "Escape" && this._menuOpen) {
            this._closeMenu();
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
            <a class="action-button-wrapper" href=${this.loginUrl} aria-label=${this.loginLabel}>
                <m3e-icon-button tabindex="-1" aria-hidden="true">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                    </svg>
                </m3e-icon-button>
                <span class="action-label">${this.loginLabel}</span>
            </a>
        `;
    }

    _renderMenuButton() {
        if (!this.showMenu) return nothing;
        return html`
            <div class="action-button-wrapper ${this._menuOpen ? 'action-button-wrapper--active' : ''}"
                id="menu-toggle"
                role="button"
                tabindex="0"
                aria-label=${this._menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded=${this._menuOpen}
                aria-haspopup="true"
                @click=${this._toggleMenu}
                @keydown=${this._handleMenuKeydown}
            >
                <m3e-icon-button tabindex="-1" aria-hidden="true">
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
            "maxwidth-full": this._isFullWidth,
            "maxwidth-formulaire": !this._isFullWidth,
        };

        const showActions = this.showLogin || this.showMenu;

        const scrimClasses = {
            'scrim': true,
            'scrim--visible': this._menuOpen,
        };

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
                    ${this.showMenu ? html`
                        <ge-header-public-menu
                            .menuData=${this.menuData}
                            .open=${this._menuOpen}
                            .constrained=${true}
                            .rightAligned=${this._isFullWidth}
                            @_request-close=${this._closeMenu}
                        ></ge-header-public-menu>
                    ` : nothing}
                </div>
            </header>
            <div class=${classMap(scrimClasses)} @click=${this._closeMenu} aria-hidden="true"></div>
        `;
    }
}
