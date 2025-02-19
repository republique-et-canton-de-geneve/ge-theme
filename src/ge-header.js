import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';

@customElement('ge-header')
export class GeHeader extends LitElement {


    @property({type: Boolean})
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

    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      object-fit: cover;
    }

    .user-menu {
      position: absolute;
      right: 1rem;
      top: 4.5rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      width: 300px;
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
      color: #4a5568;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .manage-account {
      color: #2b6cb0;
      text-decoration: none;
      font-size: 0.875rem;
      display: block;
      margin: 0.5rem 0;
    }

    .logout-button {
      width: 100%;
      padding: 0.5rem;
      background-color: #2b6cb0;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }

    .logout-button:hover {
      background-color: #2c5282;
    }

    .divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 0.75rem 0;
    }
  `;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        console.log(this.isMenuOpen)
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

          <div  style="${styleMap(styles)}" class="user-menu">

            <div class="user-info">
                <p class="user-information">Information de connexion</p>
              <div class="user-name">Jacqueline du Bout-du-Lac</div>
              <div class="user-email">jacqueline.duboutdulac@gmail.com</div>
              <div class="account-type">Compte administratif</div>
            </div>
            <div class="divider"></div>
            <a href="#" class="manage-account">Gérer mon compte</a>
            <button class="logout-button">Me déconnecter</button>
          </div>
        </div>
      </div>
      
      <code> ${this.isMenuOpen}</code>
    `;
    }
}
