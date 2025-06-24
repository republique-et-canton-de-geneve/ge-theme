import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';


export @customElement("ge-autres-espaces")
class GeAutresEspaces extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Roboto', sans-serif;
    }

    .container {
      background-color: transparent;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 22px 16px;
    }


    @container (max-width: 200px) {
      .container {
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
      }

      .header {
        justify-content: center;
      }

      .title-section {
        gap: 0;
      }

      .title {
        opacity: 0;
        width: 0;
        overflow: hidden;
      }

      .apps-icon {
        width: 32px;
        height: 32px;
<<<<<<< HEAD
        color: var(--md-sys-color-on-surface);
=======
        fill: var(--md-sys-color-primary);
>>>>>>> 469b3f5f9d17abdc6ea79b0846d3a08897da9395
      }

      md-icon-button {
        opacity: 0;
        width: 0;
        pointer-events: none;
      }

      .content {
        display: none;
      }
    }

 
    @media (max-width: 200px) {
      .container {
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
      }

      .header {
        justify-content: center;
      }

      .title-section {
        gap: 0;
      }

      .title {
        opacity: 0;
        width: 0;
        margin: 0;
        overflow: hidden;
      }

      .apps-icon {
        width: 32px;
        height: 32px;
        fill: var(--md-sys-color-primary);
      }

      md-icon-button {
        opacity: 0;
        width: 0;
        pointer-events: none;
      }

      .content {
        display: none;
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s ease;
    }

    .title-section {
      display: flex;
      align-items: center;
<<<<<<< HEAD
      gap: 32px;
=======
      gap: 8px;
>>>>>>> 469b3f5f9d17abdc6ea79b0846d3a08897da9395
      transition: all 0.3s ease;
    }

    .title {
      margin: 0;
      color: var(--md-sys-color-on-surface);
      font-family: var(--md-ref-typeface-Brand);
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      line-height: var(--md-sys-typescale-Label-Large-Line-Height); 
      letter-spacing: var(--md-sys-typescale-Label-Large-Tracking);
      transition: opacity 0.3s ease, width 0.3s ease, margin 0.3s ease;
      white-space: nowrap;
    }

    .apps-icon {
      width: 24px;
      height: 24px;
      color: var(--md-sys-color-on-surface);
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    md-icon-button {
      --md-icon-button-size: 40px;
      cursor: pointer;
      transition: opacity 0.3s ease, width 0.3s ease;
      flex-shrink: 0;
    }

    .expand-icon {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.54);
    }

    .expand-icon.expanded {
      transform: rotate(0deg);
    }

    .expand-icon.collapsed {
      transform: rotate(180deg);
    }

    .content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease-out;
    }

    .content.expanded {
      grid-template-rows: 1fr;
      margin-top:25px;
    }

    .content > * {
      overflow: hidden;
    }

    md-list {
      --md-list-container-color: transparent;
      padding: 0;
    }

    md-list-item {
      --md-list-item-container-color: transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    md-list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 50px; 
    }

    md-list-item:active {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .item-content {
      display: flex;
      align-items: center;
      gap: 32px;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }
      
    .item-icon{
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    flex-shrink: 0;
    fill: currentcolor;
    font-size: 1.5rem;
    color: var(--md-palette-action-active);
    }

    .item-title {
      color: var(--md-sys-color-on-surface);
      font-family: var(--md-ref-typeface-Brand);
      font-size: var(--md-sys-typescale-Label-Medium-Size);
      font-style: normal;
      font-weight: 500;
      line-height: var(--md-sys-typescale-Label-Medium-Line-Height); 
      letter-spacing: var(--md-sys-typescale-Label-Medium-Tracking);
    }

  .apps-icon:focus,
  .item-content:focus {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 4px;
}
    :host {
      container-type: inline-size;
    }
  `;

  @property({ type: Boolean }) expanded = true;
  @property({ type: String }) title = 'Mes autres espaces';
  @property({ type: Array }) items = [];

  toggleExpanded(event) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
  handleIconKeyPress(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleIconClick(e);
    }
  }
  handleItemClick(item) {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  }

  render() {
    return html`
      <div class="container" role="navigation" aria-label="${this.title}">
        <div class="header">
          <div class="title-section">
            <svg 
              class="apps-icon" 
              tabindex="0"
              role="button" 
              aria-label="Déplier le menu"
              viewBox="0 0 24 24"
              @click=${this.handleIconClick}
              @keydown=${this.handleIconKeyPress}>
              <path d="M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"></path>
            </svg>
            <h5 class="title" role="heading" aria-level="2">${this.title}</h5>
          </div>
          <md-icon-button 
            aria-label="${this.expanded ? 'Masquer le sous-menu' : 'Afficher le sous-menu'}"
            aria-expanded="${this.expanded ? 'true' : 'false'}"
            aria-controls="submenu-content"
            @click=${this.toggleExpanded}>
            <svg class="expand-icon ${this.expanded ? 'expanded' : 'collapsed'}" viewBox="0 0 24 24">
              <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
            </svg>
          </md-icon-button>
        </div>
        
        <div  id="submenu-content" class="content ${this.expanded ? 'expanded' : ''}">
          <div>
            <md-list>
              ${this.items.map(item => html`
                <md-list-item @click=${() => this.handleItemClick(item)}>
                  <div class="item-content">
                   <svg
                      height="20"
                      data-testid="OpenInNewIcon"
                      class="item-icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24">
                      <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                   </svg>
                    <span class="item-title">${item.title}</span>
                  </div>
                </md-list-item>
              `)}
            </md-list>
          </div>
        </div>
      </div>
    `;
  }
}