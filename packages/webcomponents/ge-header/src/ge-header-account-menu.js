import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@m3e/button";
import "@m3e/core/a11y";
import "@m3e/divider";

export
@customElement("ge-header-account-menu")
class GeHeaderAccountMenu extends LitElement {

  @property({ type: Object }) userInfo = { nom: "", prenom: "", email: "", typeCompte: "" };

  @property({ type: Boolean, reflect: true }) open = false;

  constructor() {
    super();
    for (const prop of ['userInfo', 'open']) {
      if (this.hasOwnProperty(prop)) {
        const val = this[prop];
        delete this[prop];
        this[prop] = val;
      }
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--md-sys-typescale-body-medium-font);
      color: var(--md-sys-color-on-surface);
      pointer-events: none;
    }

    .panel {
      position: relative;
      z-index: 100;
      width: 320px;
      background: var(--md-sys-color-surface-container-lowest);
      border-radius: var(--md-sys-shape-corner-medium, 12px);
      box-shadow: var(--md-sys-elevation-2,
        0 1px 2px 0 rgba(0,0,0,0.3),
        0 2px 6px 2px rgba(0,0,0,0.15));
      transform-origin: top right;
      transform: scale(0.8);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 100ms cubic-bezier(0.2, 0.0, 0, 1.0),
        transform 100ms cubic-bezier(0.2, 0.0, 0, 1.0),
        visibility 100ms cubic-bezier(0.2, 0.0, 0, 1.0);
    }

    :host([open]) .panel {
      transform: scale(1);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition:
        opacity 100ms cubic-bezier(0.2, 0.0, 0, 1.0),
        transform 100ms cubic-bezier(0.2, 0.0, 0, 1.0),
        visibility 100ms cubic-bezier(0.2, 0.0, 0, 1.0);
    }

    .panel-content {
      padding: var(--md-ref-spacings-6, 24px);
    }

    .user-info-section {
      display: flex;
      flex-direction: column;
      gap: var(--md-ref-spacings-1, 4px);
    }

    .section-label {
      font-family: var(--md-sys-typescale-label-small-font);
      font-size: var(--md-sys-typescale-label-small-size);
      font-weight: var(--md-sys-typescale-label-small-weight);
      line-height: var(--md-sys-typescale-label-small-line-height);
      color: var(--md-sys-color-on-surface-variant);
      margin-bottom: var(--md-ref-spacings-2, 8px);
    }

    .user-name {
      font-family: var(--md-sys-typescale-body-large-font);
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: var(--md-sys-typescale-body-large-weight);
      line-height: var(--md-sys-typescale-body-large-line-height);
      color: var(--md-sys-color-on-surface);
    }

    .user-email {
      font-family: var(--md-sys-typescale-body-medium-font);
      font-size: var(--md-sys-typescale-body-medium-size);
      font-weight: var(--md-sys-typescale-body-medium-weight);
      line-height: var(--md-sys-typescale-body-medium-line-height);
      color: var(--md-sys-color-on-surface-variant);
    }

    .account-badge {
      display: inline-flex;
      align-items: center;
      margin-top: var(--md-ref-spacings-2, 8px);
      padding: var(--md-ref-spacings-1, 4px) var(--md-ref-spacings-3, 12px);
      border: 1px solid var(--md-sys-color-outline);
      border-radius: var(--md-sys-shape-corner-small, 8px);
      font-family: var(--md-sys-typescale-label-medium-font);
      font-size: var(--md-sys-typescale-label-medium-size);
      font-weight: var(--md-sys-typescale-label-medium-weight);
      line-height: var(--md-sys-typescale-label-medium-line-height);
      color: var(--md-sys-color-on-surface-variant);
      width: fit-content;
    }

    m3e-divider {
      margin: var(--md-ref-spacings-4, 16px) 0;
    }

    .manage-account {
      display: block;
      color: var(--md-sys-color-primary);
      text-decoration: none;
      font-family: var(--md-sys-typescale-label-large-font);
      font-size: var(--md-sys-typescale-label-large-size);
      font-weight: var(--md-sys-typescale-label-large-weight);
      line-height: var(--md-sys-typescale-label-large-line-height);
      padding: var(--md-ref-spacings-2, 8px) 0;
    }

    .manage-account:hover {
      text-decoration: underline;
    }

    .manage-account:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
      border-radius: var(--md-sys-shape-corner-extra-small);
    }

    .logout-section {
      margin-top: var(--md-ref-spacings-4, 16px);
    }

    @media (max-width: 768px) {
      .panel {
        width: 280px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .panel,
      :host([open]) .panel {
        transition: none;
      }
    }
  `;

  _getAccountType() {
    switch (this.userInfo?.typeCompte) {
      case "PP":
        return "personnel";
      case "PM":
        return "professionnel";
      default:
        return "administratif";
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

  _handleManageAccount(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("ge-manage-account", {
      detail: { userInfo: this.userInfo },
      bubbles: true,
      composed: true,
    }));
  }

  _handleLogout() {
    this.dispatchEvent(new CustomEvent("ge-logout", {
      detail: { userInfo: this.userInfo },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const badgeLabel = this._getBadgeLabel();

    return html`
      <m3e-focus-trap ?disabled=${!this.open}>
      <div class="panel" role="menu" aria-label="Menu du compte">
        <div class="panel-content">
          <div class="user-info-section">
            <span class="section-label">Informations de connexion</span>
            <span class="user-name">${this.userInfo?.nom} ${this.userInfo?.prenom}</span>
            <span class="user-email">${this.userInfo?.email}</span>
            <span class="account-badge">Compte ${this._getAccountType()}</span>
          </div>

          <m3e-divider></m3e-divider>

          <a class="manage-account"
             href="https://ge.ch/ginapartners/profile/"
             @click=${this._handleManageAccount}
          >Gerer mon compte</a>

          <m3e-divider></m3e-divider>

          <div class="logout-section">
            <m3e-button
              variant="filled"
              @click=${this._handleLogout}
              data-test-id="logout-button"
            >Se deconnecter</m3e-button>
          </div>
        </div>
      </div>
      </m3e-focus-trap>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent("_request-close"));
  }

  /**
   * Returns all focusable elements inside the account menu panel.
   */
  getFocusableElements() {
    const panel = this.shadowRoot?.querySelector('.panel');
    if (!panel) return [];
    const focusable = [];
    panel.querySelectorAll('a[href], button, m3e-button').forEach(el => {
      focusable.push(el);
    });
    return focusable;
  }
}
