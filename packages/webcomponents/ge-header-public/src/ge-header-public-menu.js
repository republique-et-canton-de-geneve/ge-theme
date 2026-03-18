import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "@m3e/button";
import "@m3e/core/a11y";
import "@m3e/divider";

export
@customElement("ge-header-public-menu")
class GeHeaderPublicMenu extends LitElement {

  @property({ type: Object }) menuData = { quickAccess: [], sections: [] };

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: Boolean }) constrained = false;

  constructor() {
    super();
    // SWC transpiles class fields into instance properties that shadow
    // Lit's reactive prototype accessors. Delete them so Lit's setters work.
    for (const prop of ['menuData', 'open', 'constrained']) {
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
    }

    .scrim {
      position: fixed;
      inset: 0;
      background: var(--md-sys-color-scrim, #000);
      opacity: 0.32;
      z-index: 99;
    }

    .panel {
      position: relative;
      z-index: 100;
      overflow: hidden;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: var(--md-sys-elevation-2,
        0 1px 2px 0 rgba(0,0,0,0.3),
        0 2px 6px 2px rgba(0,0,0,0.15));
    }

    .panel--constrained {
      /* 1107px content + 16px padding each side = same as .header box */
      max-width: calc(1107px + 2 * var(--md-ref-spacings-4, 16px));
      margin: 0 auto;
      border-radius: var(--md-sys-shape-corner-medium, 12px);
    }

    /* Quick access — lighter background */
    .quick-access {
      background: var(--md-sys-color-surface-container-lowest);
      padding: var(--md-ref-spacings-4, 16px) var(--md-ref-spacings-8, 32px);
    }

    .quick-access-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--md-ref-spacings-4, 16px);
    }

    .quick-access-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--md-ref-spacings-4, 16px);
      align-items: center;
    }

    .section-title {
      font-family: var(--md-sys-typescale-title-small-font);
      font-size: var(--md-sys-typescale-title-small-size);
      font-weight: var(--md-sys-typescale-title-small-weight);
      line-height: var(--md-sys-typescale-title-small-line-height);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    .section-title--medium {
      font-family: var(--md-sys-typescale-title-medium-font);
      font-size: var(--md-sys-typescale-title-medium-size);
      font-weight: var(--md-sys-typescale-title-medium-weight);
      line-height: var(--md-sys-typescale-title-medium-line-height);
    }

    /* Thématiques section — regular surface background */
    .thematiques {
      background: var(--md-sys-color-surface);
      padding: var(--md-ref-spacings-8, 32px);
    }

    .thematiques-header {
      margin: 0 0 var(--md-ref-spacings-4, 16px) 0;
    }

    .thematiques-grid {
      display: flex;
      gap: var(--md-ref-spacings-8, 32px);
      justify-content: space-between;
    }

    .thematique-column {
      flex: 0 0 auto;
      min-width: 170px;
      max-width: 520px;
    }

    /* Démarches section gets double width for 2 sub-columns */
    .thematique-column--wide {
      flex: 0 0 auto;
    }

    .thematique-column--wide .thematique-links-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 var(--md-ref-spacings-8, 32px);
    }

    .thematique-title {
      font-family: var(--md-sys-typescale-label-medium-font);
      font-size: var(--md-sys-typescale-label-medium-size);
      font-weight: var(--md-sys-typescale-label-medium-weight);
      line-height: var(--md-sys-typescale-label-medium-line-height);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    m3e-divider {
      margin: var(--md-ref-spacings-4, 16px) 0;
    }

    .thematique-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--md-ref-spacings-4, 16px);
    }

    .thematique-links a {
      color: var(--md-sys-color-primary);
      text-decoration: none;
      font-family: var(--md-sys-typescale-label-medium-font);
      font-size: var(--md-sys-typescale-label-medium-size);
      font-weight: var(--md-sys-typescale-label-medium-weight);
      line-height: var(--md-sys-typescale-label-medium-line-height);
      display: block;
      padding: var(--md-ref-spacings-1, 4px) 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .thematique-links a:hover {
      text-decoration: underline;
    }

    .thematique-links a:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
      border-radius: var(--md-sys-shape-corner-extra-small);
    }

    @media (max-width: 1024px) and (min-width: 769px) {
      .thematiques-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-flow: dense;
        gap: var(--md-ref-spacings-6, 24px);
      }

      .thematique-column--wide .thematique-links-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .panel {
        max-height: 100vh;
      }

      .quick-access {
        padding: var(--md-ref-spacings-4, 16px);
      }

      .quick-access-content {
        flex-direction: column;
        align-items: stretch;
      }

      .quick-access-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .thematiques {
        padding: var(--md-ref-spacings-4, 16px);
      }

      .thematiques-grid {
        flex-direction: column;
        gap: var(--md-ref-spacings-6, 24px);
      }

      .thematique-column--wide .thematique-links-grid {
        grid-template-columns: 1fr;
      }  
    }
  `;

  render() {
    if (!this.open) return nothing;

    const { quickAccess = [], sections = [] } = this.menuData || {};
    const panelClasses = {
      'panel': true,
      'panel--constrained': this.constrained,
    };

    return html`
      <div class="scrim" @click=${this._close} aria-hidden="true"></div>
      <m3e-focus-trap ?disabled=${!this.open}>
      <nav class=${classMap(panelClasses)} aria-label="Menu principal">
        ${quickAccess.length > 0 ? html`
          <div class="quick-access">
            <div class="quick-access-content">
              <h2 class="section-title section-title--medium">Accès rapide</h2>
              <div class="quick-access-buttons">
                ${quickAccess.map(item => html`
                  <m3e-button
                    variant=${item.variant === 'filled' ? 'filled' : 'outlined'}
                    href=${item.url}
                  >${item.label}</m3e-button>
                `)}
              </div>
            </div>
          </div>
        ` : nothing}

        ${sections.length > 0 ? html`
          <div class="thematiques">
            <h2 class="section-title section-title--medium thematiques-header">Thématiques</h2>
            <div class="thematiques-grid">
              ${sections.map(section => {
                const isWide = section.links && section.links.length > 7;
                const colClasses = {
                  'thematique-column': true,
                  'thematique-column--wide': isWide,
                };
                if (isWide) {
                  const mid = Math.ceil(section.links.length / 2);
                  const col1 = section.links.slice(0, mid);
                  const col2 = section.links.slice(mid);
                  return html`
                    <div class=${classMap(colClasses)}>
                      <h3 class="thematique-title">${section.title}</h3>
                      <m3e-divider></m3e-divider>
                      <div class="thematique-links-grid">
                        <ul class="thematique-links">
                          ${col1.map(link => html`
                            <li><a href=${link.url}>${link.label}</a></li>
                          `)}
                        </ul>
                        <ul class="thematique-links">
                          ${col2.map(link => html`
                            <li><a href=${link.url}>${link.label}</a></li>
                          `)}
                        </ul>
                      </div>
                    </div>
                  `;
                }
                return html`
                  <div class=${classMap(colClasses)}>
                    <h3 class="thematique-title">${section.title}</h3>
                    <m3e-divider></m3e-divider>
                    <ul class="thematique-links">
                      ${section.links.map(link => html`
                        <li><a href=${link.url}>${link.label}</a></li>
                      `)}
                    </ul>
                  </div>
                `;
              })}
            </div>
          </div>
        ` : nothing}
      </nav>
      </m3e-focus-trap>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent("_request-close"));
  }

  /**
   * Returns all focusable elements inside the menu panel.
   */
  getFocusableElements() {
    const panel = this.shadowRoot?.querySelector('.panel');
    if (!panel) return [];
    const focusable = [];
    // m3e-button is a custom element; get its focusable parts
    panel.querySelectorAll('a[href], button, m3e-button').forEach(el => {
      focusable.push(el);
    });
    return focusable;
  }
}
