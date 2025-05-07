import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/outlined-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
/** @typedef {import('@material/web/menu/menu.js').MdMenu} MdMenu */
/** @typedef {import('@material/web/button/outlined-button.js').MdOutlinedButton} MdOutlinedButton */

/**
 * @typedef {object} LinkItem An object representing a navigation link.
 * @property {string} href The URL for the link.
 * @property {string} label The text label for the link.
 */

/**
 * @typedef {LinkItem | string} MenuEntry Represents either a link or a separator string.
 */

/**
 * Custom converter for parsing JSON from the `links` attribute.
 */
/** @type {import('lit').PropertyDeclaration['converter']} */
const linksConverter = {
    fromAttribute(value) {
        try {
            const parsed = JSON.parse(value);
            // @returns {Array<MenuEntry>}
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.warn('Invalid JSON for links attribute:', value, err);
            return [];
        }
    },
    toAttribute(value) {
        // @param {Array<MenuEntry>} value
        // @returns {string}
        return JSON.stringify(value);
    },
};

/**
 * A Lit element that displays a button opening a menu of links.
 * Links are provided via a JSON string attribute.
 *
 * @element select-mes-espaces
 * @fires close-menu - Dispatched by the underlying md-menu component.
 */
export @customElement('select-mes-espaces')
class SelectMesEspaces extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    span {
        position: relative;
        width: 100%;
    }
    hr {
        border-color: var(--md-sys-color-outline-variant);
        border-width: 0 0 thin;
        border-style: solid;
    }
    #selecteur-demarches-icon {
        width: 1em; 
        height: 1em; 
        font-size: 1.5rem;
    }
  `;

    /**
     * The array of menu links, declared as an attribute with a custom converter.
     *
     * Usage from HTML:
     * <select-mes-espaces
     *   links='[{"href":"/apple","label":"Apple"},{"href":"/banana","label":"Banana"}]'
     * ></select-mes-espaces>
     */
    @property({
        attribute: 'links',
        converter: linksConverter
    })
    links = [];

    render() {
        // @returns {import('lit').TemplateResult}
        return html`
            <span>
        <md-outlined-button
                id="select-mes-espaces-button"
                has-icon
                type="button"
                @click=${this.toggleMenu}
        >
          Mes autres démarches
          <svg slot="icon" viewBox="0 0 125.92 88.51" id="selecteur-demarches-icon"">
                <path d="M68.36 7.12v.02a44.25 44.25 0 100 74.22l57.56-37.38z" fill="var(--md-sys-color-primary)"/>
                <path
                d="M32.36 31.86c4.58-4.58 12.2-6.52 19.41-1.39L30.5 51.76c-5.4-8.88-1.53-16.5 1.87-19.9m28.61 16.86a14.88 14.88 0 01-4.27 7.48c-6.59 6.59-15.6 4.78-18.52 2.7l29.89-29.88a30.17 30.17 0 00-4.09-5.2c-9.7-9.71-27.95-12.55-40.14-.35-11.86 11.86-10.27 30.23.62 41.11a28.6 28.6 0 0040.7.07 27.56 27.56 0 007.75-15.93z"
                fill="var(--md-sys-color-on-primary)"/>
          </svg>
        </md-outlined-button>

        <md-menu
                positioning="popover"
                id="select-mes-espaces-menu"
                anchor="select-mes-espaces-button"
                @close-menu=${this.onCloseMenu}
        >
                    ${this.links.map(
                            (link) => 
                                    typeof link === 'string' ? html`<hr/>`
                                    : html`
                                <md-menu-item data-href=${link.href}>
                                    <div slot="headline">${link.label}</div>
                                </md-menu-item>`
                    )}
        </md-menu>
      </span>
        `;
    }

    /**
     * Toggles the visibility of the associated md-menu.
     * @returns {void}
     */
    toggleMenu() {
        const menuEl = /** @type {MdMenu | null} */ (
            this.shadowRoot?.getElementById('select-mes-espaces-menu')
        );
        const anchorEl = /** @type {MdOutlinedButton | null} */ (
            this.shadowRoot?.getElementById('select-mes-espaces-button')
        );

        if (!menuEl || !anchorEl) {
            console.error('Menu or anchor button not found in shadow DOM.');
            return;
        }

        menuEl.anchorElement = anchorEl;

        if (!menuEl.open) {
            menuEl.style.minWidth = `${anchorEl.offsetWidth}px`;
            menuEl.show();
        } else {
            menuEl.close();
        }
    }

    /**
     * Handles the close-menu event from the md-menu.
     * Navigates if an item with a data-href was selected.
     * @param {CustomEvent<{initiator?: HTMLElement}>} event - initiator might be MdMenuItem
     * @returns {void}
     */
    onCloseMenu(event) {
        const item = event.detail?.initiator;
        if (!item) {
            // Menu closed without selecting an item (e.g. user clicked outside).
            return;
        }
        // Retrieve the link from data-href
        const href = item.dataset.href;
        if (href) {
            window.location.href = href;
        }
    }
}
