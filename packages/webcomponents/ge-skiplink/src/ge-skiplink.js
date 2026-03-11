import {customElement, property} from 'lit/decorators.js'
import {css, html, LitElement} from 'lit'

const TRANSLATIONS = {
    fr: {
        content: 'Contenu',
        menu: 'Menu',
        search: 'Recherche',
        footer: 'Pied de page',
        ariaLabel: 'Accès rapide',
    },
    en: {
        content: 'Content',
        menu: 'Menu',
        search: 'Search',
        footer: 'Footer',
        ariaLabel: 'Quick access',
    },
    de: {
        content: 'Inhalt',
        menu: 'Menü',
        search: 'Suche',
        footer: 'Fusszeile',
        ariaLabel: 'Schnellzugriff',
    },
    it: {
        content: 'Contenuto',
        menu: 'Menu',
        search: 'Ricerca',
        footer: 'Piè di pagina',
        ariaLabel: 'Accesso rapido',
    },
}

@customElement('ge-skiplink')
class GeSkiplink extends LitElement {
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
    links

    @property({ type: String })
    lang

    constructor() {
        super()
        for (const prop of ['links', 'lang']) {
            if (this.hasOwnProperty(prop)) {
                const val = this[prop]
                delete this[prop]
                this[prop] = val
            }
        }
    }

    get #resolvedLang() {
        if (this.lang) return this.lang.substring(0, 2).toLowerCase()
        const docLang = document.documentElement.lang
        if (docLang) return docLang.substring(0, 2).toLowerCase()
        return 'fr'
    }

    get #t() {
        return TRANSLATIONS[this.#resolvedLang] || TRANSLATIONS.fr
    }

    get #resolvedLinks() {
        if (this.links?.length) {
            return this.links
        }
        const t = this.#t
        return [
            { href: '#content', title: t.content },
            { href: '#main-navigation', title: t.menu },
            { href: '#search', title: t.search },
            { href: '#footer', title: t.footer },
        ]
    }

    static styles = css`
        .skiplink:focus-within {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            overflow: visible;
            clip: auto;
            z-index: 10000;
            display: flex;
            justify-content: center;
            padding: var(--md-ref-spacings-4, 16px);
        }

        .skiplink {
            position: absolute !important;
            overflow: hidden;
            clip: rect(1px, 1px, 1px, 1px);
            padding: 0;
        }

        .skiplink nav {
            background-color: var(--md-sys-color-surface, #fff);
            border-radius: var(--md-sys-shape-corner-medium, 12px);
            padding: var(--md-ref-spacings-4, 16px);
            box-shadow:
                0px 1px 2px 0px var(--md-sys-shadow-elevation-1-color, rgba(24, 31, 37, 0.08)),
                0px 1px 3px 0px var(--md-sys-shadow-elevation-second-1-color, rgba(24, 31, 37, 0.15));
        }

        .skiplink ul {
            display: flex;
            align-items: center;
            list-style-type: none;
            margin: 0;
            padding: 0;
            gap: var(--md-ref-spacings-2, 8px);
        }

        .divider {
            display: block;
            width: 1px;
            align-self: stretch;
            background-color: var(--md-sys-color-outline-variant, #d4d2cf);
        }

        .skiplink ul > li a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            box-sizing: border-box;
            color: var(--md-sys-color-primary, #01629d);
            text-decoration: none;
            background-color: transparent;
            border: 2px solid transparent;
            border-radius: var(--md-sys-shape-corner-full, 128px);
            padding: 0 var(--md-ref-spacings-4, 16px);
            font-family: var(--md-sys-typescale-label-medium-font, 'Roboto', sans-serif);
            font-size: var(--md-sys-typescale-label-medium-size, 14px);
            font-weight: var(--md-sys-typescale-label-medium-weight, 500);
            line-height: var(--md-sys-typescale-label-medium-line-height, 20px);
            letter-spacing: var(--md-sys-typescale-label-medium-tracking, 0.1px);
            white-space: nowrap;
            cursor: pointer;
        }

        .skiplink ul > li a:hover {
            background-color: var(--md-sys-color-state-opacity-8, rgba(0, 0, 0, 0.08));
        }

        .skiplink ul > li a:focus {
            border-color: var(--md-sys-color-on-surface, #000);
            background-color: color-mix(in srgb, var(--md-sys-color-primary, #01629d) 12%, transparent);
            outline: none;
        }

        .skiplink ul > li a:active {
            background-color: var(--md-sys-color-state-opacity-16, rgba(0, 0, 0, 0.16));
        }
    `;

    render() {
        return html`
            <div class="skiplink">
                <nav role="navigation" aria-label="${this.#t.ariaLabel}">
                    <ul>
                        ${this.#resolvedLinks.map(
                            (link, index) => html`
                                <li>
                                    <a href="${link.href}">
                                        ${link.title}
                                    </a>
                                </li>
                                ${index < this.#resolvedLinks.length - 1
                                    ? html`<span class="divider" aria-hidden="true"></span>`
                                    : ''}
                            `
                        )}
                    </ul>
                </nav>
            </div>
        `
    }
}

export { GeSkiplink }
