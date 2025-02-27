import { LitElement, html, css } from 'lit';
import {property, state} from 'lit/decorators.js';

export class GeMenu extends LitElement {
    @property({ type: Object })
    menuInfo = { name:  '', returnEvent: ()=> {} };

    @property({ type: String })
    menuName = ''

    static styles = css`
        :host {
            display: block;
            height: 100%;
            font-family: Arial, sans-serif;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            transition: width 0.3s ease;
        }

        .sidebar {
            height: 100%;
            background-color: #F3F6FC;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: width 0.3s ease;
            box-shadow: 1px 1px 1px var(--md-sys-color-surface-5);
        }

        .expanded {
            width: 280px;
        }

        .collapsed {
            width: 60px;
        }

        .header {
            display: flex;
            align-items: center;
            padding: 16px;
            background-color: #f5f7fa;
        }

        .header-title {
            font-weight: 600;
            font-size: 20px;
            flex: 1;
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
            background-color: #004A7814;
        }

        .sidebar-content {
            flex: 1;
            overflow-y: auto;
            padding: 16px 0;
        }

        .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            color: #555E66;
            font-weight: 600;
            text-decoration: none;
            margin: 0 8px 4px 8px;
            background: none;
            border: none;
            cursor: pointer;
            outline: inherit;
            font-size: 14px;
        }

        .menu-item:hover {
            background-color: #004A7814;
            color: #001B2B;
            font-weight: 600;
        }

        .menu-item svg,
        .menu-item-icon {
            margin-right: 12px;
            color: #555;
            min-width: 20px;
            width: 20px;
            height: 20px;
        }

        .menu-item-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .icons-only .menu-item-text {
            display: none;
        }

        .icons-only .menu-item {
            justify-content: center;
        }

        .icons-only .menu-item svg,
        .icons-only .menu-item-icon {
            margin-right: 0;
        }
    `;

    @state()
    expanded = true;

    toggleSidebar() {
        this.expanded = !this.expanded;
        this.requestUpdate('expanded')
    }

    render() {
        return html`
            <div class="sidebar ${this.expanded ? 'expanded' : 'collapsed'}">
                <div class="header">
                    ${this.expanded ? html`
            <div class="header-title">${this.menuName}</div>
          ` : html``}

                    <button class="toggle-button" @click=${this.toggleSidebar}>
                        ${this.expanded ? html`
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.9056 8.02223C0.3648 8.56303 0.3648 9.4413 0.9056 9.9821L7.82784 16.9043C8.36864 17.4451 9.2469 17.4451 9.7877 16.9043C10.3285 16.3635 10.3285 15.4853 9.7877 14.9445L3.84323 9L9.78338 3.05552C10.3242 2.51472 10.3242 1.63646 9.78338 1.09566C9.24258 0.554863 8.36432 0.554863 7.82352 1.09566L0.901274 8.01791L0.9056 8.02223ZM16.1345 1.09999L9.21229 8.02223C8.67149 8.56303 8.67149 9.4413 9.21229 9.9821L16.1345 16.9043C16.6753 17.4451 17.5536 17.4451 18.0944 16.9043C18.6352 16.3635 18.6352 15.4853 18.0944 14.9445L12.1499 9L18.0901 3.05552C18.6309 2.51472 18.6309 1.63646 18.0901 1.09566C17.5493 0.554863 16.671 0.554863 16.1302 1.09566L16.1345 1.09999Z" fill="#001B2B"/>
                            </svg>

                        ` : html`
                            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.0944 9.2877C18.6352 8.7469 18.6352 7.86864 18.0944 7.32784L11.1722 0.405596C10.6314 -0.135204 9.7531 -0.135204 9.2123 0.405596C8.6715 0.946396 8.6715 1.82466 9.2123 2.36546L15.1568 8.30993L9.21662 14.2544C8.67582 14.7952 8.67582 15.6735 9.21662 16.2143C9.75742 16.7551 10.6357 16.7551 11.1765 16.2143L18.0987 9.29203L18.0944 9.2877ZM2.86546 16.2099L9.78771 9.2877C10.3285 8.7469 10.3285 7.86864 9.78771 7.32784L2.86546 0.405596C2.32466 -0.135204 1.4464 -0.135204 0.905602 0.405596C0.364801 0.946396 0.364801 1.82466 0.905602 2.36546L6.85008 8.30993L0.909927 14.2544C0.369127 14.7952 0.369127 15.6735 0.909927 16.2143C1.45073 16.7551 2.32899 16.7551 2.86979 16.2143L2.86546 16.2099Z" fill="#001B2B"/>
                            </svg>

                        `}
                    </button>
                </div>

                <div class="sidebar-content ${this.expanded ? '' : 'icons-only'}">
                    <button @click="${this.menuInfo.returnEvent}" class="menu-item">
                        <div class="menu-item-icon">
                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.12496 13.4532L0.166626 10.4949L1.33329 9.32822L3.10413 11.0991L6.64579 7.55738L7.81246 8.74488L3.12496 13.4532ZM3.12496 6.78655L0.166626 3.82822L1.33329 2.66155L3.10413 4.43238L6.64579 0.890717L7.81246 2.07822L3.12496 6.78655ZM9.33329 11.7866V10.1199H16.8333V11.7866H9.33329ZM9.33329 5.11988V3.45322H16.8333V5.11988H9.33329Z" fill="#001D34"/>
                            </svg>

                        </div>
                        <span class="menu-item-text">${this.menuInfo.name}</span>
                    </button>

                    <button @click="${this.menuInfo.returnEvent}" class="menu-item">
                        <div class="menu-item-icon">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.32284 17.8437C4.64922 18.1701 5.04159 18.3333 5.49992 18.3333H15.4999C15.9583 18.3333 16.3506 18.1701 16.677 17.8437C17.0034 17.5174 17.1666 17.125 17.1666 16.6667V6.66666L12.1666 1.66666H5.49992C5.04159 1.66666 4.64922 1.82985 4.32284 2.15624C3.99645 2.48263 3.83325 2.87499 3.83325 3.33332V16.6667C3.83325 17.125 3.99645 17.5174 4.32284 17.8437ZM11.3333 3.33332V6.66666H15.4999V16.6667H5.49992V3.33332H11.3333ZM7.83325 11.3333V9.99999H13.1666V11.3333H7.83325ZM6.49992 9.33332C6.49992 8.96513 6.7984 8.66666 7.16659 8.66666H13.8333C14.2014 8.66666 14.4999 8.96513 14.4999 9.33332V12C14.4999 12.3682 14.2014 12.6667 13.8333 12.6667H7.16659C6.7984 12.6667 6.49992 12.3682 6.49992 12V9.33332ZM6.49992 5.33332C6.49992 4.96513 6.7984 4.66666 7.16659 4.66666H9.83325C10.2014 4.66666 10.4999 4.96513 10.4999 5.33332C10.4999 5.70151 10.2014 5.99999 9.83325 5.99999H7.16659C6.7984 5.99999 6.49992 5.70151 6.49992 5.33332ZM7.16659 14C6.7984 14 6.49992 14.2985 6.49992 14.6667C6.49992 15.0348 6.7984 15.3333 7.16659 15.3333H13.8333C14.2014 15.3333 14.4999 15.0348 14.4999 14.6667C14.4999 14.2985 14.2014 14 13.8333 14H7.16659Z" fill="#555E66"/>
                            </svg>

                        </div>
                        <span class="menu-item-text">${this.menuInfo.name}</span>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('ge-menu', GeMenu);