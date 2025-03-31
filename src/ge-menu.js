import {LitElement, html, css} from 'lit';
import {property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export class GeMenu extends LitElement {

    @property({type: Object})
    menuConfig = {
        title: 'Mon espace poursuite',
        icon: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h18v-2H3v2zm0-7v2h18V6H3zm0 12h18v-2H3v2z" fill="#555E66"/>
            </svg>
        `
    };

    @state()
    _items = [];

    @property({type: Array})
    set items(value) {
        console.log('Setter items called with:', value);
        this._items = value || [];
    }

    get items() {
        return this._items;
    }

    @property({type: Boolean})
    isExpanded = true;

    @property({type: String})
    activeItemId = '';

    static styles = css`
        :host {
            display: block;
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            bottom: 0;
            background-color: var(--md-sys-color-surface);
            box-shadow: 1px 0 3px rgba(var(--md-sys-color-shadow-rgb, 0, 0, 0), 0.1);
            transition: width 0.3s ease;
            height: 100%;
            --md-sys-color-on-surface-rgb: 24, 28, 32;
        }

        :host {
            width: 280px;
        }

        :host(.collapsed) {
            width: 60px;
        }

        .sidebar {
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 1px 0 3px rgba(var(--md-sys-color-shadow-rgb, 0, 0, 0), 0.1);
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;


        }

        .header-title {
            font-weight: 600;
            font-size: 16px;
            color: #001B2B;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

        }

        .toggle-button {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50px;
        }

        .toggle-button:hover {
            background-color: rgba(var(--md-sys-color-on-surface-rgb), 0.05);
        }

        .item-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 16px;
            gap: 12px;
            overflow-y: auto;
            min-height: 0;
        }

        .menu-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            color: var(--md-sys-color-on-surface-variant);
            background: none;
            border: none;
            font-weight: 600;
            cursor: pointer;
            border-radius: 8px;
            outline: inherit;
            width: 100%;
            text-align: left;
        }

        .menu-item:hover {
            background-color: rgba(0, 74, 120, 0.08);
            border-radius: 50px;
            color: #004A78;
        }

        .menu-item.active {
            background-color: rgba(0, 74, 120, 0.08);
            color: var(--md-sys-color-on-primary-container);
            font-weight: 600;
            border-radius: 50px;
        }


        .menu-item svg,
        .menu-item-icon {
            min-width: 24px;
            width: 24px;
            height: 24px;
            margin-right: 12px;
        }

        .menu-item.active .menu-item-icon svg path {
            fill: var(--md-sys-color-primary);
        }

        .menu-item-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
        }


        :host(.collapsed) .header-title {
            display: none;
        }

        :host(.collapsed) .item-container {
            align-items: center;
            padding: 16px 0;
        }

        :host(.collapsed) .menu-item {
            width: 40px;
            height: 40px;
            justify-content: center;
            padding: 8px;
            border-radius: 50%;
        }

        :host(.collapsed) .menu-item-icon {
            margin-right: 0;
        }

        :host(.collapsed) .menu-item-text {
            display: none;
        }

    `;

    constructor() {
        super();
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.adjustMenuPosition = this.adjustMenuPosition.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('toggle-menu', this.handleToggleMenu);
        window.addEventListener('resize', this.adjustMenuPosition);
        window.addEventListener('DOMContentLoaded', this.adjustMenuPosition);
        window.addEventListener('load', this.adjustMenuPosition);

        // Observer pour détecter les changements dans le DOM qui pourraient affecter le header ou footer
        this.mutationObserver = new MutationObserver(this.adjustMenuPosition);
        this.mutationObserver.observe(document.body, {childList: true, subtree: true});

        setTimeout(() => this.adjustMenuPosition(), 100);
    }

    disconnectedCallback() {
        window.removeEventListener('toggle-menu', this.handleToggleMenu);
        window.removeEventListener('resize', this.adjustMenuPosition);
        window.removeEventListener('DOMContentLoaded', this.adjustMenuPosition);
        window.removeEventListener('load', this.adjustMenuPosition);

        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }

        super.disconnectedCallback();
    }

    adjustMenuPosition() {
        const headerElement = document.querySelector('header, ge-header, .header, [role="banner"]');
        const footerElement = document.querySelector('footer, ge-footer, .footer, [role="contentinfo"]');
        this.style.height = '';

        if (headerElement) {
            const headerRect = headerElement.getBoundingClientRect();
            this.style.top = `${headerRect.bottom}px`;
        } else {
            this.style.top = '0';
        }

        if (footerElement) {
            const footerRect = footerElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (footerRect.top < viewportHeight) {
                this.style.height = `${footerRect.top - parseFloat(this.style.top || 0)}px`;
                this.style.bottom = '';
            } else {
                this.style.height = `calc(100vh - ${parseFloat(this.style.top || 0)}px)`;
                this.style.bottom = '';
            }
        } else {

            this.style.height = `calc(100vh - ${parseFloat(this.style.top || 0)}px)`;
            this.style.bottom = '';
        }
    }

    handleToggleMenu() {
        this.toggleMenu();
    }

    toggleMenu() {
        this.isExpanded = !this.isExpanded;

        if (this.isExpanded) {
            this.classList.remove('collapsed');
        } else {
            this.classList.add('collapsed');
        }

        this.dispatchEvent(new CustomEvent('menu-state-changed', {
            bubbles: true,
            composed: true,
            detail: {isExpanded: this.isExpanded}
        }));
    }

    handleMenuItemClick(item) {
        this.activeItemId = item.id;

        this.dispatchEvent(new CustomEvent('menu-item-clicked', {
            bubbles: true,
            composed: true,
            detail: item
        }));

        if (item.url && item.navigate !== false) {
            if (item.url.startsWith('#')) {
                window.location.hash = item.url.substring(1);
            } else if (item.target === '_blank') {
                window.open(item.url, '_blank');
            } else {
                window.location.href = item.url;
            }
        }

        if (typeof item.onClick === 'function') {
            item.onClick(item);
        }
    }

    renderIcon(item) {
        if (item.icon) {
            return html`
                <div class="menu-item-icon">${unsafeHTML(item.icon)}</div>`;
        }

        return html`
            <div class="menu-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13h18v-2H3v2zm0-7v2h18V6H3zm0 12h18v-2H3v2z" fill="#555E66"/>
                </svg>
            </div>
        `;
    }

    render() {
        console.log('Rendering menu with items:', this._items);

        return html`
            <div class="sidebar">
                <div class="header-container">
                    <div class="header-title">${this.menuConfig.title}</div>
                    <button class="toggle-button" @click=${this.toggleMenu}>
                        ${this.isExpanded
                                ? html`
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.9056 8.02223C0.3648 8.56303 0.3648 9.4413 0.9056 9.9821L7.82784 16.9043C8.36864 17.4451 9.2469 17.4451 9.7877 16.9043C10.3285 16.3635 10.3285 15.4853 9.7877 14.9445L3.84323 9L9.78338 3.05552C10.3242 2.51472 10.3242 1.63646 9.78338 1.09566C9.24258 0.554863 8.36432 0.554863 7.82352 1.09566L0.901274 8.01791L0.9056 8.02223ZM16.1345 1.09999L9.21229 8.02223C8.67149 8.56303 8.67149 9.4413 9.21229 9.9821L16.1345 16.9043C16.6753 17.4451 17.5536 17.4451 18.0944 16.9043C18.6352 16.3635 18.6352 15.4853 18.0944 14.9445L12.1499 9L18.0901 3.05552C18.6309 2.51472 18.6309 1.63646 18.0901 1.09566C17.5493 0.554863 16.671 0.554863 16.1302 1.09566L16.1345 1.09999Z"
                                              fill="#001B2B"/>
                                    </svg>

                                `
                                : html`
                                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.0944 9.2877C18.6352 8.7469 18.6352 7.86864 18.0944 7.32784L11.1722 0.405596C10.6314 -0.135204 9.7531 -0.135204 9.2123 0.405596C8.6715 0.946396 8.6715 1.82466 9.2123 2.36546L15.1568 8.30993L9.21662 14.2544C8.67582 14.7952 8.67582 15.6735 9.21662 16.2143C9.75742 16.7551 10.6357 16.7551 11.1765 16.2143L18.0987 9.29203L18.0944 9.2877ZM2.86546 16.2099L9.78771 9.2877C10.3285 8.7469 10.3285 7.86864 9.78771 7.32784L2.86546 0.405596C2.32466 -0.135204 1.4464 -0.135204 0.905602 0.405596C0.364801 0.946396 0.364801 1.82466 0.905602 2.36546L6.85008 8.30993L0.909927 14.2544C0.369127 14.7952 0.369127 15.6735 0.909927 16.2143C1.45073 16.7551 2.32899 16.7551 2.86979 16.2143L2.86546 16.2099Z"
                                              fill="#001B2B"/>
                                    </svg>

                                `}
                    </button>
                </div>

                <div class="item-container">
                    ${this._items.length > 0
                            ? this._items.map(item => html`
                                <button
                                        class="menu-item ${item.id === this.activeItemId || item.active ? 'active' : ''}"
                                        @click=${() => this.handleMenuItemClick(item)}
                                >
                                    ${this.renderIcon(item)}
                                    <span class="menu-item-text">${item.title}</span>
                                </button>
                            `)
                            : html`
                                <button class="menu-item active">
                                    ${this.renderDefaultIcon()}
                                    <span class="menu-item-text">${this.menuConfig.title}</span>
                                </button>
                            `
                    }
                </div>
            </div>
        `;
    }
    renderDefaultIcon() {
        return html`
            <div class="menu-item-icon">
                ${unsafeHTML(this.menuConfig.icon)}
            </div>
        `;
    }
}

customElements.define('ge-menu', GeMenu);