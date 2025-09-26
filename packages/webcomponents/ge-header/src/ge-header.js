import { classMap } from "lit/directives/class-map.js";
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

  @property({ type: Boolean })
  isMenBurgerOpen = false;
  @property({ type: Boolean })
  userInfoLoaded = false;

  @property({ type: String }) maxWidth = "true";



  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    header {
      background: var(--md-sys-color-surface);
      box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5);
      min-height: 77px;
      border-bottom: 1px solid var(--md-sys-color-outline-variant, #d4d2cf);
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px 0 16px;
      transition: width 0.3s ease;
      margin:auto;
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
      gap: 16px;
      text-decoration: none;
    }

    .title {
      font-size: 28px;
      font-weight: 400;
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
      padding: 8px;
      transition: all 0.2s;
    }

    .maxwidth-formulaire { max-width: 1107px; }
    
    .maxwidth-full { max-width: 100%; }
    
    .user-menu {
      position: absolute;
      top: calc(100% + 8px);  
      right: 0;
      padding: 20px;
      background: var(--md-sys-color-surface);
      border-right: 1px solid var(--md-sys-color-surface-variant);
      border-bottom: 1px solid var(--md-sys-color-surface-variant);
      border-top: none;
      border-radius:16px;
      width: 288px;
      height: auto;
      list-style: none;
      margin: 0;
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12); 
      z-index:9999;
    }

    .user-menu li {
      display: flex;
      flex-direction: column;
    }

    .user-info {
      margin-bottom: 16px;
    }

    .user-information {
      color: var(--md-sys-color-on-background);
      font-size: 15px;
      opacity: 0.7;
      margin-bottom: 9px;
      font-weight: 700;
      margin-top: 9px;
    }

    .account-type-title {
      color: var(--md-sys-color-on-surface);
      margin-bottom: 8px;
      opacity: 100%;
    }

    .user-name {
      color: var(--md-sys-color-on-surface-variant);
      margin-bottom: 4px;
      font-size: 16px;
    }

    .user-email {
      font-weight: 400;
      color: var(--md-sys-color-on-surface);
      font-size: 14px;
      opacity: 0.7;
    }

    .account-type {
      border-radius: 5px;
      border: 1px solid var(--md-sys-color-on-warning-container);
      opacity: 0.5;
      width: fit-content;
      padding: 8px;
      font-size: 14px;
      margin-top: 8px;
      color: var(--md-sys-color-on-surface);
      font-weight: 700;
    }

    .manage-account {
      color: var(--md-sys-color-primary);
      font-weight: bold;
      text-decoration: none;
      font-size: 14px;
      display: block;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .logout-button {
      width: 80%;
      margin-top: 8px;
      margin-bottom: 32px;
      font-weight: 500;
    }

    .icon-container {
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
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

    .burger-menu {
      display: none;
      cursor: pointer;
    }

    .burger-menu svg {
      width: 30px;
      height: 29px;
      fill: #001d34;
      transition: transform 0.3s ease;
    }

    .menu {
      display: none;
      position: absolute;
      top: 77px;
      right: 0;
      width: 200px;
      background: var(--md-sys-color-surface-container-highest);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      border-radius: 8px;
    }

    .hidden {
      display: none;
    }

    .menu.open {
      display: block;
    }

    @media (max-width: 768px) {
      .header {
        padding: 0 16px;
      }
      .burger-menu {
        min-width: 48px;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .profile-button {
        display: none;
      }
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

  getAccountType(typeCompte) {
    switch (typeCompte) {
      case "PP":
        return "personnel";
      case "PM":
        return "professionnel";
      default:
        return "administratif";
    }
  }

  getBadgeType(typeCompte) {
    switch (typeCompte) {
      case "PM":
        return "PRO";
      case "PP":
        return undefined;
      default:
        return "ADM";
    }
  }

  handleBurgerClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.isMenBurgerOpen = !this.isMenBurgerOpen;

    const event = new CustomEvent("ge-toggle-app-menu", {
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
  }
  handleOutsideClick = (event) => {
    if (!this.shadowRoot) return;

    const path = event.composedPath();
    const clickedInside = path.includes(this.shadowRoot);

    if (!clickedInside && this.isMenuOpen) {
      this.isMenuOpen = false;
      this.requestUpdate("isMenuOpen");
    }
  };

  render() {

    
    const maxWidthClasses = {
      "header": true,
      "maxwidth-full": this.maxWidth === "true",
      "maxwidth-formulaire": this.maxWidth === "1107px" || this.maxWidth === "false"
    };


    return html`
      <header fix-top">
        <div class=${classMap(maxWidthClasses)} >
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
              ${this.isMenuOpen
        ? html`
            <ul class="user-menu" role="menu" aria-label="Menu utilisateur">
              <li role="menu">
                <span class="user-information">Informations de connexion</span>
                <span class="user-name"
                  >${this.userInfo.nom} ${this.userInfo.prenom}</span
                >
                <span class="user-email">${this.userInfo.email}</span>
              </li>
              <li role="menuitem">
                <span class="account-type">
                  Compte
                  ${html`${this.getAccountType(this.userInfo?.typeCompte)}`}
                </span>
              </li>
              <li role="menuitem">
                <a
                  class="manage-account"
                  href="https://ge.ch/ginapartners/profile/"
                  @click="${this.handleManageAccount}"
                >
                  Gérer mon compte
                </a>
              </li>

              <li role="menuitem">
                <md-filled-button @click=${this.handleLogout} data-test-id="logout-button">
                  Se déconnecter
                </md-filled-button>
              </li>
            </ul>
          `
        : ""}
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
                >${this.getBadgeType(this.userInfo?.typeCompte)}</span
              >
            </div>

            <button class="profile-button" @click="${this.toggleMenu}">
              Mon compte
            </button>
          </div>
        </div>  
      </header>
    `;
  }
}
