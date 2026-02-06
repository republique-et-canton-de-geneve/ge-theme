import {customElement, property} from 'lit/decorators.js'
import {css, html, LitElement} from 'lit'

@customElement('ge-skiplink')
class GeSkiplink extends LitElement {
    @property({ type: Array })
    links = [
        { href: '#home', title: 'Accueil' },
        { href: '#content', title: 'Contenu' },
        { href: '#main-navigation', title: 'Menu' },
        { href: '#search', title: 'Recherche' },
        { href: '#footer', title: 'Pied de page' },
    ]

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
            background-color: var(--md-sys-color-surface-container, #f0f0f0);
            border-radius: var(--md-sys-shape-corner-large, 16px);
            padding: var(--md-ref-spacings-3, 12px) var(--md-ref-spacings-4, 16px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid var(--md-sys-color-outline-variant, #c4c4c4);
        }

        .skiplink ul {
            display: flex;
            list-style-type: none;
            margin: 0;
            padding: 0;
            gap: var(--md-ref-spacings-2, 8px);
        }

        .skiplink ul > li a {
            display: inline-block;
            color: var(--md-sys-color-primary, #0162a0);
            text-decoration: none;
            background-color: transparent;
            border: none;
            border-radius: var(--md-sys-shape-corner-full, 50px);
            padding: var(--md-ref-spacings-2, 8px) var(--md-ref-spacings-4, 16px);
            font-family: var(--md-sys-typescale-label-large-font, Roboto, Arial, sans-serif);
            font-size: var(--md-sys-typescale-label-large-size, 16px);
            font-weight: var(--md-sys-typescale-label-large-weight, 700);
            line-height: var(--md-sys-typescale-label-large-line-height, 22px);
            transition: background-color 0.2s ease;
            cursor: pointer;
        }

        .skiplink ul > li a:hover {
            background-color: var(--md-sys-color-state-opacity-8, rgba(0, 0, 0, 0.08));
        }

        .skiplink ul > li a:focus {
            outline: 2px solid var(--md-sys-color-primary, #0162a0);
            outline-offset: 2px;
            background-color: var(--md-sys-color-state-opacity-8, rgba(0, 0, 0, 0.08));
        }

        .skiplink ul > li a:active {
            background-color: var(--md-sys-color-state-opacity-16, rgba(0, 0, 0, 0.16));
        }
    `;

    constructor() {
        super()
    }

    render() {
        return html`
            <div class="skiplink">
                <nav role="navigation" aria-label="Accès rapide">
                    <ul>
                        ${this.links.map(
                            (link) => html`
                                <li>
                                    <a href="${link.href}">
                                        ${link.title}
                                    </a>
                                </li>
                            `
                        )}
                    </ul>
                </nav>
            </div>
        `
    }
}