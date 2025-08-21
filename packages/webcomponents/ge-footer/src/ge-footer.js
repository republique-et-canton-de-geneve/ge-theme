import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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
    #ge-footer > nav > span { color: var(--md-sys-color-outline-variant); }
    #ge-footer > nav > a:hover { color: var(--md-sys-color-primary); }
    @media (max-width: 768px) {
      #ge-footer { display: block; padding: 12px 12px; height: auto; }
      #ge-footer > nav { flex-direction: column; align-items: flex-start; gap: 8px; }
      #ge-footer > nav > span { display: none; }
      #ge-footer-armoiries { margin-top: 10px; }
    }
  `;

  @property({ type: String }) theme = "light";
  @property({ type: String }) maxWidth = "unset";

  // Props fallback
  @property({ type: String }) contactLink = "https://www.ge.ch/c/footer-edm-aide";
  @property({ type: String }) accessibilityLink = "https://www.ge.ch/c/footer-edm-accessibilite";
  @property({ type: String }) privacyLink = "https://www.ge.ch/c/footer-edm-confidentialite";
  @property({ type: String }) termsLink = "https://www.ge.ch/c/footer-edm-cgu";

  // Nouveau tableau de liens
  @property({
    attribute: "links",
    converter: {
      fromAttribute: (value) => {
        if (!value) return undefined;
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      }
    }
  })
  links;

    willUpdate(changedProperties) {
      if (changedProperties.has('theme')) {
        if (this.theme === 'light' || this.theme === 'dark') {
        } else {
          this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
      }
    }

  setThemeBasedOnSystemPreference() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.theme = "dark";
    } else {
      this.theme = "light";
    }
  }

  get defaultLinks() {
    return [
      { title: "Contact", href: this.contactLink },
      { title: "Accessibilité", href: this.accessibilityLink },
      { title: "Politique de confidentialité", href: this.privacyLink },
      { title: "Conditions générales", href: this.termsLink }
    ];
  }

  render() {
    const links = (this.links && this.links.length) ? this.links : this.defaultLinks;

    return html`
      <footer>
        ${this.theme}
        <div id="ge-footer" style="max-width:${this.maxWidth}">
          <nav>
            ${links.map((l, i) => html`
              ${i > 0 ? html`<span aria-hidden="true"> | </span>` : null}
              <a href="${l.href}" target="gech" rel="noopener noreferrer">${l.title}</a>
            `)}
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
    this.dispatchEvent(new CustomEvent("ge-footer-image-click", {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}
