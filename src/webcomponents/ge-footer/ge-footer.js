import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('ge-footer')
export class GeFooter extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;

            border-top: 1px solid var(--md-sys-color-outline-variant);
            font-family: var(--md-ref-typeface-plain, Arial, sans-serif);
            transition: width 0.3s ease;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            padding: 12px 16px;
        }

        .footer-menu-item:not(:last-child) {
            border-right: 1px solid var(--md-sys-color-outline-variant);
            padding-right: 8px;
            margin-right: 8px;
        }

        .footer-links {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .footer-menu-item:not(:last-child) {
            border-right: 1px solid #E5E7EB;
            padding-right: 20px;
        }

        .footer-link {
            color: var(--md-sys-color-on-surface);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }

        .footer-link:hover {
            color: var(--md-sys-color-primary);
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            height: 40px;
        }

        @media (max-width: 768px) {
            .footer {
                flex-direction: column;
            }

            .footer-menu-item {
                border-right: none;
            }

            .footer-menu-item:not(:last-child) {
                border-right: none;
            }


            .footer-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
                padding: 16px;
            }

            .footer-links {
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                gap: 10px;
            }

            .footer-link {
                width: 100%;
                padding: 8px 0;
            }

            .logo {
                width: 100%;
                justify-content: flex-start;
                margin-top: 12px;
            }

            .footer-menu-item a {
                text-decoration: none;
                color: #001d34;
                text-align: center;
                padding: 10px;
                list-style: none;
            }
        }
    `;

    render() {
        return html`
            <footer class="footer">
                <div class="footer-links">
                    <span class="footer-menu-item">
                        <a href="https://www.ge.ch/c/footer-edm-aide" data-url="https://www.ge.ch/c/footer-edm-aide"
                           class="footer-link">Contact</a>
                    </span>
                    <span class="footer-menu-item">
                        <a href="https://www.ge.ch/c/footer-edm-accessibilite"
                           data-url="https://www.ge.ch/c/footer-edm-accessibilite" class="footer-link"> Accessibilité
                        </a>
                    </span>
                    <span class="footer-menu-item">
                        <a href="https://www.ge.ch/c/footer-edm-confidentialite"
                           data-url="https://www.ge.ch/c/footer-edm-confidentialite" class="footer-link">   Politique de confidentialité
                        </a>
                    </span>
                    <span class="footer-menu-item">
                        <a href="https://www.ge.ch/c/footer-edm-cgu" data-url="https://www.ge.ch/c/footer-edm-cgu"
                           class="footer-link">Conditions générales</a>
                    </span>
                </div>

                <div class="logo">

                    <img
                            src="https://static.app.ge.ch/theme/icons/common/footer/footer-armoiries-light.svg"
                            alt="Armoiries de la République et canton de Genève"
                            width="80"
                            height="80"
                            role="img"
                            aria-hidden="false"
                    />
                </div>
            </footer>
        `;
    }
}

