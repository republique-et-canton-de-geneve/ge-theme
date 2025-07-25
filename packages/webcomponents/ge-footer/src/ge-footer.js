import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("ge-footer")
class GeFooter extends LitElement {
  static styles = css`
    footer {
      background: var(--md-sys-color-surface);
      border-top: 1px solid var(--md-sys-color-outline-variant);
    }
    #ge-footer {
      transition: width 0.3s ease;
      display: flex;
      grid-area: footer;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 32px;
      margin: auto;
    }
    
    #ge-footer > nav {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-right: 20px;
    }

    #ge-footer > nav > a {
      color: var(--md-sys-color-on-surface-variant);
      font-family: var(--md-ref-typeface-brand), Arial, Helvetica, sans-serif;
      font-size: var(--md-sys-typescale-body-medium-size);
      font-style: normal;
      line-height: var(--md-sys-typescale-body-medium-line-height);
      letter-spacing: var(--md-sys-typescale-body-medium-tracking);
      font-weight: 400;
      text-decoration: none;
    }

    #ge-footer > nav > span {
      color: var(--md-sys-color-outline-variant);
    }

    #ge-footer > nav > a:hover {
        color: var(--md-sys-color-primary);
    }
    
    @media (max-width: 768px) {
      #ge-footer {
        display: block;
        padding: 12px 12px;
        height: auto;
      }
      
      #ge-footer > nav > span {
        display: none;
      }

      #ge-footer > nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      #ge-footer-armoiries {
        margin-top: 10px;
      }
    }
  `;

  @property({ type: String }) theme = 'light';
  @property({ type: String }) maxWidth = css`unset`;
  @property({ type: String }) contactLink = 'https://www.ge.ch/c/footer-edm-aide';
  @property({ type: String }) accessibilityLink = 'https://www.ge.ch/c/footer-edm-accessibilite';
  @property({ type: String }) privacyLink = 'https://www.ge.ch/c/footer-edm-confidentialite';
  @property({ type: String }) termsLink = 'https://www.ge.ch/c/footer-edm-cgu';


  constructor() {
    super();
    this.setThemeBasedOnSystemPreference();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.theme = e.matches ? 'dark' : 'light';
    });
  }

  setThemeBasedOnSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
  }

  render() {
    return html`
      <footer>
      <div id="ge-footer" style="max-width: ${this.maxWidth}">
          <nav>
            <a href="${this.contactLink}" target="gech">
              Contact
            </a>
            <span aria-hidden="true"> | </span>
            <a href="${this.accessibilityLink}" target="gech">Accessibilité
            </a>
            <span aria-hidden="true"> | </span>
            <a href="${this.privacyLink}" target="gech">Politique&nbsp;de&nbsp;confidentialité
            </a>
            <span aria-hidden="true"> | </span>
            <a href="${this.termsLink}" target="gech">
              Conditions&nbsp;générales
            </a>
          </nav>
          <img
              id="ge-footer-armoiries"
              src="https://static.app.ge.ch/theme/icons/common/footer/footer-armoiries-${this.theme}.svg"
              alt="Armoiries de la République et canton de Genève"
              height="62"
              aria-hidden="false"
              @click="${this.onImageClick}"
          />
      </div>    
      </footer>
    `;
  }
  
  onImageClick(e) {
    this.dispatchEvent(new CustomEvent('ge-footer-image-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}