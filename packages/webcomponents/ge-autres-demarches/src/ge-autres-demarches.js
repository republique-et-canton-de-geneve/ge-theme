import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';


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
      gap: 8px;
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
      fill: rgba(0, 0, 0, 0.54);
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
      padding-top: 16px;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.3s ease;
    }

    .content.collapsed {
      max-height: 0;
      opacity: 0;
      margin-top: 0;
    }

    .content.expanded {
      max-height: 300px;
      opacity: 1;
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

    .item-icon {
        --md-icon-size: 20px;
      color: rgba(0, 0, 0, 0.54);
    }

    .item-content {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }

    .item-title {
      color: var(--md-sys-color-on-surface-variant);
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

  static properties = {
    expanded: { type: Boolean },
    title: { type: String },
    items: { type: Array }
  }

  constructor() {
    super();
    this.expanded = false;
    this.title = 'Mes autres espaces';
    this.items = [];
  }

  toggleExpanded(event) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

  handleIconClick(event) {
   
    this.dispatchEvent(new CustomEvent('compact-icon-click', {
      detail: { component: this },
      bubbles: true,
      composed: true
    }));
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
    
  
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { item },
      bubbles: true,
      composed: true
    }));
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
              @click=${this.handleIconClick}>
              @keydown=${this.handleIconKeyPress}
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
        
        <div  id="submenu-content" class="content ${this.expanded ? 'expanded' : 'collapsed'}">
          <md-list>
            ${this.items.map(item => html`
              <md-list-item @click=${() => this.handleItemClick(item)}>
                 <div class="item-content">
                  <md-icon class="item-icon">${item.icon}</md-icon>
                  <span class="item-title">${item.title}</span>
                </div>
              </md-list-item>
            `)}
          </md-list>
        </div>
      </div>
    `;
  }
}

