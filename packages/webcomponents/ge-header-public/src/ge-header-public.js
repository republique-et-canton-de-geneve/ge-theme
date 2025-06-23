import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


export @customElement("ge-header-public")
class GeHeaderPublic extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .header {
      display: flex;
      padding: 16px 32px;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      flex: 1 0 0;
      border-bottom: 1px solid var(--md-sys-color-outline-variant, #d4d2cf);
      background: var(--md-sys-color-surface-surface, #fff);
    }

    a.logo-section {
      text-decoration: none;
      color: inherit;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
    }

    .title {
      font-size: 2rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant, #333);
    }

    .account-actions {
      display: flex;
      align-items: center;
    }

    .manage-account {
      background: none;
      border: none;
      color: var(--md-sys-color-primary, #6200ee);
      font-weight: bold;
      cursor: pointer;
      font-size: 14px;
      text-decoration: underline;
      padding: 8px;
    }
  `;

  render() {
    return html`
      <header class="header" role="banner">
        <a
         href="https://www.ge.ch/" class="logo-section" target="gech">
          <img
            src="https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg"
            alt="République et canton de Genève"
            width="27"
            height="45"
          />
          <span class="title">ge.ch</span>
        </a>
      </header>
    `;
  }
}
