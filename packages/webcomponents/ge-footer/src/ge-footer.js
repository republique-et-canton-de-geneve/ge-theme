import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

export @customElement("ge-footer")
class GeFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      font-family: var(--md-ref-typeface-plain, Arial, sans-serif);
      transition: width 0.3s ease;
      background: var(--md-sys-color-surface-surface);
    }

    #ge-footer {
      display: flex;
      grid-area: footer;
      justify-content: space-between;
      align-items: center;
      padding: 0 36px;
    }

    .footer-menu-item:not(:last-child) {
      border-right: 1px solid var(--md-sys-color-outline-variant);
      padding-right: 16px;
      height: 20px;
    }

    .footer-links {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .footer-link {
      color: var(--md-sys-color-on-surface-variant);
      font-family: var(--md-ref-typeface-Brand);
      font-size: var(--md-sys-typescale-Body-Medium-Size);
      font-style: normal;
      line-height: var(--md-sys-typescale-Body-Medium-Line-Height);
      letter-spacing: var(--md-sys-typescale-Body-Medium-Tracking);
      font-weight: 400;
      text-decoration: none;
    }

    .footer-link:hover {
      color: var(--md-sys-color-primary);
    }

    .logo {
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      #ge-footer {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer-menu-item:not(:last-child) {
        border-right: none;
      }

      .footer-links {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 16px;
      }

      .logo {
        width: 100%;
        justify-content: flex-start;
        margin-top: 20px;
      }
    }
  `;

  render() {
    return html`
      <footer id="ge-footer">
        <div class="footer-links">
          <span class="footer-menu-item">
            <a
              href="https://www.ge.ch/c/footer-edm-aide"
              data-url="https://www.ge.ch/c/footer-edm-aide"
              class="footer-link"
              >Contact</a
            >
          </span>
          <span class="footer-menu-item">
            <a
              href="https://www.ge.ch/c/footer-edm-accessibilite"
              data-url="https://www.ge.ch/c/footer-edm-accessibilite"
              class="footer-link"
              >Accessibilité</a
            >
          </span>
          <span class="footer-menu-item">
            <a
              href="https://www.ge.ch/c/footer-edm-confidentialite"
              data-url="https://www.ge.ch/c/footer-edm-confidentialite"
              class="footer-link"
              >Politique de confidentialité</a
            >
          </span>
          <span class="footer-menu-item">
            <a
              href="https://www.ge.ch/c/footer-edm-cgu"
              data-url="https://www.ge.ch/c/footer-edm-cgu"
              class="footer-link"
              >Conditions générales</a
            >
          </span>
        </div>

        <div class="logo">
          <img
            src="https://static.app.ge.ch/theme/icons/common/footer/footer-armoiries-light.svg"
            alt="Armoiries de la République et canton de Genève"
            width="72"
            height="54"
            role="img"
            aria-hidden="false"
          />
        </div>
      </footer>
    `;
  }
}
