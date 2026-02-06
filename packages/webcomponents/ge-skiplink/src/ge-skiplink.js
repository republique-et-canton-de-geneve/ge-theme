import {customElement, property} from 'lit/decorators.js'
import {css, html, LitElement} from 'lit'

@customElement('ge-skiplink')
class GeSkiplink extends LitElement {
    @property({ type: Array })
    links = [{ href: '#content', title: 'Contenu' }]

    static styles = css`
        .skiplink:focus-within {
            position: static;
            overflow: visible;
            clip: auto;
        }

        .skiplink {
            position: absolute !important;
            overflow: hidden;
            clip: rect(1px, 1px, 1px, 1px);
            padding: .75rem 0;
        }

        .skiplink ul {
            display: flex;
            list-style-type: none;
            margin: 0 .5rem;
        }

        .skiplink ul > li {
            margin: 0 .5rem 1rem;
        }

        .skiplink ul > li a {
            color: var(--md-sys-color-primary, #0C6BA8);
            text-decoration: none;
            background-color: transparent;
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
                                    <a href="${link.href}" aria-label="${link.title}">
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