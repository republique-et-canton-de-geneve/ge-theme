import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {styleMap} from "lit-html/directives/style-map.js";
import '@material/web/button/filled-button.js';

/**
 * Custom converter for parsing JSON from the userInfo attribute.
 */

export @customElement('ge-header')
class GeHeader extends LitElement {

    @property({type: Object})
    userInfo = { nom: '', prenom: '', email: '', typeCompte: '' };

    @property({ type: Boolean })
    isMenuOpen = false;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            font-family: Arial, sans-serif;
        }

        .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;  /* Preferred icon size */
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;

            /* Support for all WebKit browsers. */
            -webkit-font-smoothing: antialiased;
            /* Support for Safari and Chrome. */
            text-rendering: optimizeLegibility;

            /* Support for Firefox. */
            -moz-osx-font-smoothing: grayscale;

            /* Support for IE. */
            font-feature-settings: 'liga';
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--md-sys-color-surface-container-highest);
            box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5 );
        }

        .fixed-top {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1030;
        }
        .logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .title {
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--md-sys-color-on-surface-variant);
        }
        .account-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }


        .profile-button {
            background: none;
            color: var(--md-sys-color-on-surface-variant);
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            transition: all 0.2s;
        }


        .user-menu {
            position: absolute;
            right: 0.4rem;
            top: 7rem;
            background: var(--md-sys-color-on-primary);
            border-right: 1px solid var(--md-sys-color-surface-variant);
            border-bottom: 1px solid var(--md-sys-color-surface-variant);
            border-top: none;
            border-radius: 0px 0px 16px 16px;
            padding: 1rem 0 0 2rem;
            width: 288px;
            height: auto;
            list-style: none;
            margin: 0;
            box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5);
        }
        .user-menu li {

            display: flex;
            flex-direction: column;
        }
        .user-info {
            margin-bottom: 1rem;
        }

        .user-information {
            color: var(--md-sys-color-on-surface);
            font-size: 0.9rem;
            opacity: .7;
            margin-bottom: 2rem;
            font-weight: 400;
            margin-top: 1.5rem;
        }
        .account-type-title{
            color:var(--md-sys-color-on-surface-variant);
            margin-bottom: 0.5rem;
            opacity: 100%;
        }

        .user-name {
            color: var(--md-sys-color-on-surface);
            margin-bottom: 0.25rem;
            font-size: 1rem;

        }

        .user-email {
            font-weight: 400;
            color: var(--md-sys-color-on-surface);
            font-size: 0.875rem;
            opacity: 0.7;
        }


        .account-type {
            border-radius: 5px;
            border: 1px solid var(--md-sys-color-on-surface-variant);
            background-color: var(--md-sys-color-surface-3);
            opacity: .5;
            width: fit-content;
            padding: 0.5rem;
            font-size: 0.875rem;
            margin-top: 0.5rem;

        }


        .manage-account {
            color: var(--md-sys-color-primary);
            font-weight: bold;
            text-decoration: none;
            font-size: 0.875rem;
            display: block;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .logout-button {
            width: 80%;
            margin-top: 0.5rem;
            margin-bottom: 2rem;
            font-weight: 500;
        }

        .icon-container {
            position: relative;
            display: inline-block;
            cursor: pointer;
        }

        .badge {
            position: absolute;
            top: 0;
            left: 25px;
            background-color: var(--md-sys-color-primary);
            border-radius: 50px;
            color: var(--md-sys-color-on-primary);
            font-weight: 800;
            padding: 2px 6px;
            font-size: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
    `;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.requestUpdate('isMenuOpen');
    }

    handleManageAccount() {
        const event = new CustomEvent('ge-manage-account', {
            detail: { userInfo: this.userInfo },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    handleLogout() {
        const event = new CustomEvent('ge-logout', {
            detail: { userInfo: this.userInfo },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
        <header class="header fix-top">
            <div class="logo-section">
                <svg width="27" height="45" viewBox="0 0 27 45" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect y="0.110794" width="26.625" height="44.7784" fill="url(#pattern0_5673_696)"/>
                    <defs>
                        <pattern id="pattern0_5673_696" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_5673_696" transform="matrix(0.0101928 0 0 0.00606061 -0.00454544 0)"/>
                        </pattern>
                        <image id="image0_5673_696" width="99" height="165" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
                <span class="title">ge.ch</span>
            </div>
            <div class="account-item">
                <div class="icon-container" @click="${this.toggleMenu}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="var(--md-sys-color-on-surface-variant)">
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                    </svg>
                    <span class="badge">${this.userInfo.typeCompte ? this.userInfo.typeCompte.substring(0, 3).toUpperCase() : 'Inconnu'}</span>
                </div>

                <button class="profile-button" @click="${this.toggleMenu}">
                    Mon compte
                </button>    
            </div>
        </header>

        ${this.isMenuOpen ? html`
            <ul class="user-menu" role="menu" aria-label="Menu utilisateur">
                <li role="menu">
                    <span class="user-information">Informations de connexion</span>
                    <span class="user-name">${this.userInfo.nom ? this.userInfo.nom : 'Inconnu'} ${this.userInfo.prenom ? this.userInfo.prenom : 'Inconnu'}</span>
                    <span class="user-email">${this.userInfo.email ? this.userInfo.email : 'Inconnu'}</span>
                </li>
                <li role="menuitem">
                    <span class="account-type">Compte ${this.userInfo.typeCompte ? html`${this.userInfo.typeCompte}` : 'Inconnu'}</span>

                </li>
                <li role="menuitem">
                    <a class="manage-account" href="#" @click="${this.handleManageAccount}">
                        Gérer mon compte
                    </a>
                </li>
                <li role="menuitem">
                    <md-filled-button @click="${this.handleManageAccount}" class="logout-button">Me Déconnecter</md-filled-button>
                </li>
            </ul>
        ` : ''}
        `;
    }


}
