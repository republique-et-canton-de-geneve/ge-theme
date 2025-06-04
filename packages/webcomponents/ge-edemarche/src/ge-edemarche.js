import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ge-edemarche')
 class GeEdemarche extends LitElement {
  static styles = css`
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-button {
      padding: 0.5rem 1rem;
      background: #333;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 1000;
      display: none;
      min-width: 150px;
    }

    .dropdown-content.show {
      display: block;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background-color: #f0f0f0;
    }
  `;

  @property({ type: Array }) items = [];
  @state() open = false;

  toggleDropdown() {
    this.open = !this.open;
  }

  handleItemClick(item) {
    this.dispatchEvent(new CustomEvent('item-selected', {
      detail: item,
      bubbles: true,
      composed: true,
    }));
    this.open = false;
  }

  render() {
    return html`
      <div class="dropdown">
        <button class="dropdown-button" @click=${this.toggleDropdown}>Menu</button>
        <div class="dropdown-content ${this.open ? 'show' : ''}">
          ${this.items.map(item => html`
            <div class="dropdown-item" @click=${() => this.handleItemClick(item)}>
              ${item.label}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
export {GeEdemarche}; 