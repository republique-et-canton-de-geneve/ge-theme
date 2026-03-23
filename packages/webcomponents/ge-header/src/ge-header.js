import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "@m3e/icon-button";
import "./ge-header-nav-menu.js";
import "./ge-header-account-menu.js";
import { DEFAULT_MENU_DATA } from "./default-menu-data.js";


export @customElement("ge-header")
class GeHeader extends LitElement {

    @property({ type: String }) maxWidth = "true";
    @property({ type: Boolean, reflect: true }) fullWidth = true;
    @property({ type: Boolean }) showMenu = false;
    @property({ type: Object }) menuData = DEFAULT_MENU_DATA;
    @property({ type: Object }) userInfo = { nom: "", prenom: "", email: "", typeCompte: "" };

    @state() _menuOpen = false;
    @state() _accountOpen = false;

    constructor() {
        super();
        // SWC transpiles class fields into instance properties that shadow
        // Lit's reactive prototype accessors. Delete them so Lit's setters work.
        for (const prop of ['maxWidth', 'fullWidth', 'showMenu', 'menuData', 'userInfo', '_menuOpen', '_accountOpen']) {
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
        return this.fullWidth;
    }

    updated(changed) {
        super.updated(changed);
        if (changed.has('maxWidth') && this.maxWidth !== 'true') {
            console.warn(
                'ge-header: maxWidth attribute is deprecated. Use the fullWidth boolean property instead. ' +
                'Example: <ge-header .fullWidth=${false}>'
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

        /* Action buttons (account, menu) */
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

        /* Account button badge overlay */
        .account-button-wrapper {
            position: relative;
        }

        .account-badge {
            position: absolute;
            top: 0;
            right: -4px;
            background-color: var(--md-sys-color-primary);
            border-radius: 50px;
            color: var(--md-sys-color-on-primary);
            font-weight: 800;
            padding: 2px 6px;
            font-size: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }

        /* Nav menu positioning */
        ge-header-nav-menu {
            position: absolute;
            top: calc(100% - 11px);
            left: 0;
            right: 0;
        }

        .maxwidth-full > ge-header-nav-menu {
            right: var(--md-ref-spacings-4, 16px);
        }

        /* Account menu positioning */
        ge-header-account-menu {
            position: absolute;
            top: calc(100% + 4px);
            right: 0;
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

    _handleOutsideClick(event) {
        if (!this.shadowRoot) return;
        const path = event.composedPath();

        // Check if click is inside nav menu or its toggle
        if (this._menuOpen) {
            const menuPanel = this.shadowRoot.querySelector('ge-header-nav-menu');
            const menuToggle = this.shadowRoot.querySelector('#menu-toggle');
            if (menuPanel && path.includes(menuPanel)) return;
            if (menuToggle && path.includes(menuToggle)) return;
        }

        // Check if click is inside account menu or its toggle
        if (this._accountOpen) {
            const accountPanel = this.shadowRoot.querySelector('ge-header-account-menu');
            const accountToggle = this.shadowRoot.querySelector('#account-toggle');
            if (accountPanel && path.includes(accountPanel)) return;
            if (accountToggle && path.includes(accountToggle)) return;
        }

        this._closeAll();
    }

    _handleKeydown(event) {
        if (event.key === "Escape") {
            this._closeAll();
        }
    }

    _handleMenuKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._toggleMenu();
        }
    }

    _handleAccountKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._toggleAccount();
        }
    }

    _toggleMenu() {
        const wasOpen = this._menuOpen;
        // Close account if open (mutual exclusion)
        if (this._accountOpen) {
            this._accountOpen = false;
            this.dispatchEvent(new CustomEvent("ge-account-toggle", {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
        }

        this._menuOpen = !wasOpen;

        if (this._menuOpen) {
            this._addGlobalListeners();
        } else if (!this._accountOpen) {
            this._removeGlobalListeners();
        }

        this.dispatchEvent(new CustomEvent("ge-menu-toggle", {
            detail: { open: this._menuOpen },
            bubbles: true,
            composed: true,
        }));

        if (this._menuOpen) {
            this.updateComplete.then(() => {
                const menuEl = this.shadowRoot?.querySelector('ge-header-nav-menu');
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

    _toggleAccount() {
        const wasOpen = this._accountOpen;
        // Close menu if open (mutual exclusion)
        if (this._menuOpen) {
            this._menuOpen = false;
            this.dispatchEvent(new CustomEvent("ge-menu-toggle", {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
        }

        this._accountOpen = !wasOpen;

        if (this._accountOpen) {
            this._addGlobalListeners();
        } else if (!this._menuOpen) {
            this._removeGlobalListeners();
        }

        this.dispatchEvent(new CustomEvent("ge-account-toggle", {
            detail: { open: this._accountOpen },
            bubbles: true,
            composed: true,
        }));

        if (this._accountOpen) {
            this.updateComplete.then(() => {
                const accountEl = this.shadowRoot?.querySelector('ge-header-account-menu');
                if (accountEl) {
                    accountEl.updateComplete.then(() => {
                        const focusable = accountEl.getFocusableElements();
                        if (focusable.length > 0) {
                            focusable[0].focus();
                        }
                    });
                }
            });
        }
    }

    _closeAll() {
        const wasMenuOpen = this._menuOpen;
        const wasAccountOpen = this._accountOpen;

        if (!wasMenuOpen && !wasAccountOpen) return;

        this._menuOpen = false;
        this._accountOpen = false;
        this._removeGlobalListeners();

        if (wasMenuOpen) {
            this.dispatchEvent(new CustomEvent("ge-menu-toggle", {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
            this.updateComplete.then(() => {
                const menuButton = this.shadowRoot?.querySelector('#menu-toggle');
                if (menuButton) menuButton.focus();
            });
        }

        if (wasAccountOpen) {
            this.dispatchEvent(new CustomEvent("ge-account-toggle", {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
            this.updateComplete.then(() => {
                const accountButton = this.shadowRoot?.querySelector('#account-toggle');
                if (accountButton) accountButton.focus();
            });
        }
    }

    _getBadgeLabel() {
        switch (this.userInfo?.typeCompte) {
            case "PM":
                return "PRO";
            case "PP":
                return undefined;
            default:
                return "ADM";
        }
    }

    _renderAccountButton() {
        const badgeLabel = this._getBadgeLabel();
        return html`
            <div class="action-button-wrapper ${this._accountOpen ? 'action-button-wrapper--active' : ''}"
                id="account-toggle"
                role="button"
                tabindex="0"
                aria-label=${this._accountOpen ? "Fermer le menu du compte" : "Ouvrir le menu du compte"}
                aria-expanded=${this._accountOpen}
                aria-haspopup="true"
                @click=${this._toggleAccount}
                @keydown=${this._handleAccountKeydown}
            >
                <div class="account-button-wrapper">
                    <m3e-icon-button tabindex="-1" aria-hidden="true">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </m3e-icon-button>
                    ${badgeLabel ? html`<span class="account-badge">${badgeLabel}</span>` : nothing}
                </div>
                <span class="action-label">Mon compte</span>
            </div>
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
                    <div class="header-actions">
                        ${this._renderAccountButton()}
                        ${this._renderMenuButton()}
                    </div>
                    ${this.showMenu ? html`
                        <ge-header-nav-menu
                            .menuData=${this.menuData}
                            .open=${this._menuOpen}
                            .constrained=${true}
                            .rightAligned=${this._isFullWidth}
                            @_request-close=${this._closeAll}
                        ></ge-header-nav-menu>
                    ` : nothing}
                    <ge-header-account-menu
                        .userInfo=${this.userInfo}
                        .open=${this._accountOpen}
                        @_request-close=${this._closeAll}
                    ></ge-header-account-menu>
                </div>
            </header>
            <div class=${classMap(scrimClasses)} @click=${this._closeAll} aria-hidden="true"></div>
        `;
    }
}
