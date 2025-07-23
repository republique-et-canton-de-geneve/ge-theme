import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@material/web/button/filled-button.js";

/**
 * Custom converter for parsing JSON from the userInfo attribute.
 */

export
@customElement("ge-header")
class GeHeader extends LitElement {
  @property({ type: Object })
  userInfo = { nom: "", prenom: "", email: "", typeCompte: "" };

  @property({ type: Boolean })
  isMenuOpen = false;

  @property({type: String})
  maxWidth = css`unset`;


  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .material-icons {
      font-family: "Material Icons";
      font-weight: normal;
      font-style: normal;
      font-size: 24px; /* Preferred icon size */
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
      font-feature-settings: "liga";
    }

    header {
        border-bottom: 1px solid var(--md-sys-color-outline-variant, #d4d2cf);
        background: var(--md-sys-color-surface-surface, #fff);
    }

    .header {
        display: flex;
        padding: 16px 32px;
        justify-content: space-between;
        align-items: center;
        flex: 1 0 0;
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
      opacity: 0.7;
      margin-bottom: 2rem;
      font-weight: 400;
      margin-top: 1.5rem;
    }
    .account-type-title {
      color: var(--md-sys-color-on-surface-variant);
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
      opacity: 0.5;
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
    this.requestUpdate("isMenuOpen");
  }

  handleManageAccount() {
    const event = new CustomEvent("ge-manage-account", {
      detail: { userInfo: this.userInfo },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleLogout() {
    const event = new CustomEvent("ge-logout", {
      detail: { userInfo: this.userInfo },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <header fix-top">
        <div class="header" style="max-width: ${this.maxWidth}">
          <a href="https://www.ge.ch/" class="logo-section" target="gech">
            <img
              src="https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg"
              alt="République et canton de Genève"
              width="27"
              height="45"
            />
            <span class="title">ge.ch</span>
          </a>
          <div class="account-item">
            <div class="icon-container" @click="${this.toggleMenu}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="var(--md-sys-color-on-surface-variant)"
              >
                <path
                  d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                />
              </svg>
              <span class="badge"
                >${this.userInfo.typeCompte
                  ? this.userInfo.typeCompte.substring(0, 3).toUpperCase()
                  : "Inconnu"}</span
              >
            </div>

            <button class="profile-button" @click="${this.toggleMenu}">
              Mon compte
            </button>
          </div>
        </div>  
      </header>

      ${this.isMenuOpen
        ? html`
            <ul class="user-menu" role="menu" aria-label="Menu utilisateur">
              <li role="menu">
                <span class="user-information">Information de connexion</span>
                <span class="user-name"
                  >${this.userInfo.nom ? this.userInfo.nom : "Inconnu"}
                  ${this.userInfo.prenom
                    ? this.userInfo.prenom
                    : "Inconnu"}</span
                >
                <span class="user-email"
                  >${this.userInfo.email
                    ? this.userInfo.email
                    : "Inconnu"}</span
                >
              </li>
              <li role="menuitem">
                <span class="account-type"
                  >Compte
                  ${this.userInfo.typeCompte
                    ? html`${this.userInfo.typeCompte}`
                    : "Inconnu"}</span
                >
              </li>
              <li role="menuitem">
                <a
                  class="manage-account"
                  href="#"
                  @click="${this.handleManageAccount}"
                >
                  Gérer mon compte
                </a>
              </li>
              <li role="menuitem">
                <md-filled-button
                  @click="${this.handleManageAccount}"
                  class="logout-button"
                  >Me Déconnecter</md-filled-button
                >
              </li>
            </ul>
          `
        : ""}
    `;
  }
}
