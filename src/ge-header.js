import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {styleMap} from "lit-html/directives/style-map.js";
import '@material/web/button/filled-button.js';

/**
 * Custom converter for parsing JSON from the userInfo attribute.
 */

@customElement('ge-header')
export class GeHeader extends LitElement {

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

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--md-sys-color-surface-container-highest);
            box-shadow: 0 2px 4px var(--md-sys-color-surface-5 );
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .title {
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--md-sys-color-on-background);
        }

        .profile-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            transition: all 0.2s;
        }

   
            .user-menu {
                position: absolute;
                right: 0.4rem;
                top: 4.4rem;
                background: var(--md-sys-color-on-primary);
                border-left: 1px solid var(--md-sys-color-surface-variant);
                border-right: 1px solid var(--md-sys-color-surface-variant);
                border-bottom: 1px solid var(--md-sys-color-surface-variant);
                border-top: none;
                border-radius: 0px 0px 16px 16px;
                padding: 1rem 0 0 2rem;
                width: 288px;
                height: 288px;
                box-shadow: 0 4px 6px var(--md-sys-color-surface-5);
            }
        
        .user-info {
            margin-bottom: 1rem;
        }

        .user-information {
            color: var(--md-sys-color-on-surface);
            font-size: 0.9rem;
            opacity: .7;
            margin-bottom: 1.5rem;
            font-weight: 400;
            margin-top: 1.5rem;
        }
        .account-type-title{

            color:var(--md-sys-color-on-surface-variant);
            opacity: 100%;

        }

        .user-name {
            color: var(--md-sys-color-on-surface);
            margin-bottom: 0.25rem;
            
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
            margin: 0 0 1rem ;
        }

        .logout-button {
            width: 80%;
            padding: 0.8rem;
            font-weight: 500;
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
        const styles = { display: this.isMenuOpen ? 'block' : 'none' };
        return html`
            <div class="header">
                <div class="logo-section">
                    <span class="title">ge.ch</span>
                </div>
                <div>
                    <button @click=${this.toggleMenu} class="profile-button">
                        Mon compte
                    </button>

                    <div style="${styleMap(styles)}" class="user-menu">
                        <div class="user-info">
                            <p class="user-information">Information de connexion</p>
                            <div class="user-name">${this.userInfo.nom} ${this.userInfo.prenom}</div>
                            <div class="user-email">${this.userInfo.email} </div>
                            <div class="account-type"> <span class="span-test">${this.userInfo.typeCompte}</span></div>
                        </div>
                        <a href="#" @click=${this.handleManageAccount} class="manage-account">Gérer mon compte</a>
                        <md-filled-button @click="${this.handleManageAccount}" class="logout-button">Me Déconnecter</md-filled-button>
                    </div>
                </div>
            </div>
        `;
    }
}
