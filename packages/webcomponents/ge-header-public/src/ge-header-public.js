import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";


export @customElement("ge-header-public")
class GeHeaderPublic extends LitElement {

    @property({type: String})
    maxWidth = css`unset`;


    static styles = css`
        :host {
            display: block;
            font-family: Arial, sans-serif;
        }

        header {
            background: var(--md-sys-color-surface);
            box-shadow: 0 0.5px 0.5px var(--md-sys-color-surface-5);
            min-height: 77px;
            border-bottom: 1px solid var(--md-sys-color-outline-variant, #d4d2cf);
        }
        
        .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px 0 16px;
        transition: width 0.3s ease;
        margin:auto;
        }

        a.logo-section {
            text-decoration: none;
            color: inherit;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
        }

        .title {
            font-size: 28px;
            font-weight: 400;
            color: var(--md-sys-color-on-surface-variant, #333);
        }

        .account-actions {
            display: flex;
            align-items: center;
        }

        .manage-account {
            background: none;
            border: none;
            color: var(--md-sys-color-primary, #6200ee);
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
            text-decoration: underline;
            padding: 8px;
        }
    `;

    render() {
        return html`
            <header role="banner">
                <div class="header" style="max-width: ${this.maxWidth}">
                    <a
                            href="https://www.ge.ch/" class="logo-section" target="gech">
                        <img
                                src="https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg"
                                alt="République et canton de Genève"
                                width="27"
                                height="45"
                        />
                        <span class="title">ge.ch</span>
                    </a>
                </div>
            </header>
        `;
    }
}
