import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Custom converter for parsing JSON from the `userInfo` attribute.
 */
const userInfoConverter = {
    fromAttribute(value) {
        try {
            return JSON.parse(value);
        } catch (err) {
            console.warn('Invalid JSON for userInfo attribute:', value, err);
            return { nom: '', prenom: '', email: '', typeCompte: '' };
        }
    },
    toAttribute(value) {
        return JSON.stringify(value);
    },
};

@customElement('ge-header')
export class GeHeader extends LitElement {

    /**
     * The user information, declared as an attribute with a custom converter.
     * Usage from HTML:
     * <ge-header userInfo='{"nom": "Jacqueline", "prenom": "du Bout-du-Lac", "email": "jacqueline.duboutdulac@gmail.com", "typeCompte": "Compte administratif"}'></ge-header>
     */
    @property({
        attribute: 'userInfo',
        converter: userInfoConverter
    })
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
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .logo {
        width: 40px;
        height: 40px;
    }

    .title {
        font-size: 1.25rem;
        font-weight: 500;
        color: #333;
    }

    .profile-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #4a5568;
        transition: all 0.2s;
    }

    .profile-button:hover {
        background-color: #f7fafc;
    }

    .user-menu {
        position: absolute;
        right: 1rem;
        top: 4.5rem;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1rem;
        width: 288px;
        height: 288px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .user-menu.open {
        display: block;
    }

    .user-info {
        margin-bottom: 1rem;
    }

    .user-information{
        color: #4a5568;
        font-size: 0.9rem;
        margin-bottom: 1.5rem; 
        margin-top: 1.5rem;
    }    

    .user-name {
        color: #001B2B; 
        margin-bottom: 0.25rem;
    }

    .user-email {
        font-weight: 400;
        color: #555E66;
        font-size: 0.875rem;
    }

    .account-type {
        color: #555E66;
        border-radius: 5px; 
        background-color: #E5E7EB;
        padding: 0.5rem;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }

    .manage-account {
        color: #2b6cb0;
        font-weight: bold;
        text-decoration: none;
        font-size: 0.875rem;
        display: block;
        margin: 0.5rem 1rem 1rem;
    }

    .logout-button {
        width: 100%;
        padding: 0.8rem; 
        background-color: #00629D;
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 0.875rem;
        transition: background-color 0.2s;
    }

    .logout-button:hover {
        background-color: #2c5282;
    }
    `;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.requestUpdate('isMenuOpen');
    }

    render() {
        const styles = { display: this.isMenuOpen ? 'block !important' : 'none !important' };
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
                <div class="user-email">${this.userInfo.email}</div>
                <div class="account-type">${this.userInfo.typeCompte}</div>
            </div>
            <a href="#" class="manage-account">Gérer mon compte</a>
            <button class="logout-button">Me déconnecter</button>
          </div>
        </div>
      </div>
    `;
    }
}
