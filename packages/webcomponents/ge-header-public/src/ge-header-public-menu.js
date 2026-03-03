import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

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
      background: var(--md-sys-color-scrim);
      opacity: 0.32;
      z-index: 99;
    }

    .panel {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 100;
      overflow: hidden;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 var(--md-ref-spacings-1, 4px) var(--md-ref-spacings-2, 8px) var(--md-ref-shadow-light-opacity-12, rgba(0,0,0,0.12));
    }

    .panel--constrained {
      /* 1107px content + 16px padding each side = same as .header box */
      max-width: calc(1107px + 2 * var(--md-ref-spacings-4, 16px));
      margin: 0 auto;
      border-radius: 0 0 var(--md-sys-shape-corner-medium, 12px) var(--md-sys-shape-corner-medium, 12px);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-top: none;
    }

    /* Quick access — lighter background */
    .quick-access {
      background: var(--md-sys-color-surface-container-lowest);
      padding: var(--md-ref-spacings-4, 16px) var(--md-ref-spacings-6, 24px);
    }

    .quick-access-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--md-ref-spacings-3, 12px);
      align-items: center;
    }

    .section-title {
      font-family: var(--md-sys-typescale-title-small-font);
      font-size: var(--md-sys-typescale-title-small-size);
      font-weight: var(--md-sys-typescale-title-small-weight);
      line-height: var(--md-sys-typescale-title-small-line-height);
      color: var(--md-sys-color-on-surface);
    }

    .section-title--large {
      font-family: var(--md-sys-typescale-title-large-font);
      font-size: var(--md-sys-typescale-title-large-size);
      font-weight: var(--md-sys-typescale-title-large-weight);
      line-height: var(--md-sys-typescale-title-large-line-height);
    }

    .pill {
      display: inline-block;
      padding: var(--md-ref-spacings-2, 8px) var(--md-ref-spacings-5, 20px);
      border-radius: var(--md-sys-shape-corner-full, 128px);
      font-family: var(--md-sys-typescale-label-large-font);
      font-size: var(--md-sys-typescale-label-large-size);
      font-weight: var(--md-sys-typescale-label-large-weight);
      line-height: var(--md-sys-typescale-label-large-line-height);
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 0.2s, color 0.2s;
    }

    .pill--outlined {
      background: transparent;
      border: 1px solid var(--md-sys-color-outline-variant);
      color: var(--md-sys-color-on-surface);
    }

    .pill--outlined:hover {
      background: var(--md-sys-color-surface-container);
    }

    .pill--filled {
      background: var(--md-sys-color-primary);
      border: 1px solid var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .pill--filled:hover {
      opacity: 0.9;
    }

    .pill:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* Thématiques section — regular surface background */
    .thematiques {
      background: var(--md-sys-color-surface);
      padding: var(--md-ref-spacings-6, 24px) var(--md-ref-spacings-6, 24px) var(--md-ref-spacings-8, 32px);
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
      flex: 1;
      min-width: 0;
    }

    /* Démarches section gets double width for 2 sub-columns */
    .thematique-column--wide {
      flex: 2;
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
      margin: 0 0 var(--md-ref-spacings-3, 12px) 0;
      padding-bottom: var(--md-ref-spacings-2, 8px);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    .thematique-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .thematique-links li {
      margin-bottom: var(--md-ref-spacings-1, 4px);
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

    @media (max-width: 768px) {
      .panel {
        max-height: 100vh;
      }

      .quick-access {
        padding: var(--md-ref-spacings-4, 16px);
      }

      .quick-access-list {
        flex-direction: column;
        align-items: stretch;
      }

      .pill {
        text-align: center;
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
      <div class="scrim" @click=${this._close}></div>
      <nav class=${classMap(panelClasses)} role="navigation" aria-label="Menu principal">
        ${quickAccess.length > 0 ? html`
          <div class="quick-access">
            <div class="quick-access-list">
              <span class="section-title section-title--large">Accès rapide</span>
              ${quickAccess.map(item => html`
                <a
                  class="pill ${item.variant === 'filled' ? 'pill--filled' : 'pill--outlined'}"
                  href=${item.url}
                >${item.label}</a>
              `)}
            </div>
          </div>
        ` : nothing}

        ${sections.length > 0 ? html`
          <div class="thematiques">
            <p class="section-title section-title--large thematiques-header">Thématiques</p>
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
    `;
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("ge-menu-close", {
      bubbles: true,
      composed: true,
    }));
  }
}
