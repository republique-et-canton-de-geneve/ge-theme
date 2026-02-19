import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const TRANSLATIONS = {
    fr: {
        defaultLabel: "J'accepte les",
        defaultLinkLabel: "conditions générales",
        defaultDialogTitle: "Conditions générales",
        close: "Fermer",
        download: "Télécharger le PDF",
        required: "Vous devez accepter les conditions pour continuer",
        loading: "Chargement…",
        error: "Impossible de charger le contenu",
    },
    en: {
        defaultLabel: "I accept the",
        defaultLinkLabel: "terms and conditions",
        defaultDialogTitle: "Terms and conditions",
        close: "Close",
        download: "Download PDF",
        required: "You must accept the conditions to continue",
        loading: "Loading…",
        error: "Unable to load content",
    },
    es: {
        defaultLabel: "Acepto las",
        defaultLinkLabel: "condiciones generales",
        defaultDialogTitle: "Condiciones generales",
        close: "Cerrar",
        download: "Descargar PDF",
        required: "Debe aceptar las condiciones para continuar",
        loading: "Cargando…",
        error: "No se pudo cargar el contenido",
    },
    pt: {
        defaultLabel: "Aceito as",
        defaultLinkLabel: "condições gerais",
        defaultDialogTitle: "Condições gerais",
        close: "Fechar",
        download: "Baixar PDF",
        required: "Você deve aceitar as condições para continuar",
        loading: "Carregando…",
        error: "Não foi possível carregar o conteúdo",
    },
};

@customElement("ge-condition")
class GeCondition extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Roboto', Arial, Helvetica, sans-serif;
        }

        /* --- Summary block (mode=summary) --- */
        .summary {
            background: var(--md-sys-color-surface-container-low);
            border: 1px solid var(--md-sys-color-outline-variant);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            color: var(--md-sys-color-on-surface);
        }

        /* --- Checkbox row --- */
        .checkbox-row {
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }

        .checkbox-row input[type="checkbox"] {
            margin-top: 2px;
            width: 18px;
            height: 18px;
            accent-color: var(--md-sys-color-primary);
            cursor: pointer;
            flex-shrink: 0;
        }

        .checkbox-row label {
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25px);
            color: var(--md-sys-color-on-surface);
            cursor: pointer;
            user-select: none;
        }

        .checkbox-row label a {
            color: var(--md-sys-color-primary);
            text-decoration: underline;
            cursor: pointer;
            font: inherit;
        }

        .checkbox-row label a:hover {
            color: var(--md-sys-color-on-surface);
        }

        .checkbox-row label a:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
            border-radius: 2px;
        }

        /* --- Validation error --- */
        .error-message {
            color: var(--md-sys-color-error);
            font-size: var(--md-sys-typescale-body-small-size, 12px);
            line-height: var(--md-sys-typescale-body-small-line-height, 16px);
            margin-top: 4px;
            margin-left: 26px;
        }

        /* --- Dialog --- */
        dialog:not([open]) {
            display: none;
        }

        dialog {
            border: none;
            border-radius: 16px;
            padding: 0;
            max-width: min(720px, calc(100vw - 48px));
            width: 100%;
            max-height: min(80vh, 800px);
            background: var(--md-sys-color-surface);
            color: var(--md-sys-color-on-surface);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
            overflow: hidden;
        }

        dialog[open] {
            display: flex;
            flex-direction: column;
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }

        /* --- Dialog header --- */
        .dialog-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 24px;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            position: sticky;
            top: 0;
            background: var(--md-sys-color-surface);
            z-index: 1;
            flex-shrink: 0;
        }

        .dialog-header h2 {
            margin: 0;
            font-size: var(--md-sys-typescale-title-large-size, 24px);
            line-height: var(--md-sys-typescale-title-large-line-height, 28px);
            font-weight: var(--md-sys-typescale-title-large-weight, 700);
            color: var(--md-sys-color-on-surface);
        }

        .dialog-header-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* --- Icon buttons --- */
        .icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            color: var(--md-sys-color-on-surface-variant);
            transition: background-color 0.15s;
        }

        .icon-btn:hover {
            background: var(--md-sys-color-surface-container-high);
        }

        .icon-btn:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
        }

        .icon-btn svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        /* --- Tabs --- */
        .tabs {
            display: flex;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            overflow-x: auto;
            flex-shrink: 0;
            background: var(--md-sys-color-surface);
        }

        .tab {
            padding: 12px 24px;
            border: none;
            background: none;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            font-weight: 500;
            color: var(--md-sys-color-on-surface-variant);
            cursor: pointer;
            white-space: nowrap;
            border-bottom: 2px solid transparent;
            transition: color 0.15s, border-color 0.15s;
            font-family: inherit;
        }

        .tab:hover {
            color: var(--md-sys-color-on-surface);
            background: var(--md-sys-color-surface-container-low);
        }

        .tab[aria-selected="true"] {
            color: var(--md-sys-color-primary);
            border-bottom-color: var(--md-sys-color-primary);
        }

        .tab:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: -2px;
        }

        /* --- Dialog content --- */
        .dialog-content {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
        }

        .dialog-content .loading,
        .dialog-content .error {
            text-align: center;
            padding: 32px;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            color: var(--md-sys-color-on-surface-variant);
        }

        .dialog-content .error {
            color: var(--md-sys-color-error);
        }

        /* --- Accordion (details/summary) --- */
        .dialog-content details + details {
            border-top: 1px solid var(--md-sys-color-outline-variant);
        }

        .dialog-content details summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 0;
            cursor: pointer;
            font-size: var(--md-sys-typescale-title-small-size, 16px);
            font-weight: var(--md-sys-typescale-title-small-weight, 500);
            line-height: var(--md-sys-typescale-title-small-line-height, 24px);
            color: var(--md-sys-color-on-surface);
            list-style: none;
            user-select: none;
        }

        .dialog-content details summary::-webkit-details-marker {
            display: none;
        }

        .dialog-content details summary::after {
            content: "";
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            margin-left: 8px;
            background: currentColor;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E") center / contain no-repeat;
            -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E") center / contain no-repeat;
            transition: transform 0.2s ease;
        }

        .dialog-content details[open] summary::after {
            transform: rotate(180deg);
        }

        .dialog-content details summary:hover {
            color: var(--md-sys-color-primary);
        }

        .dialog-content details summary:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
            border-radius: 2px;
        }

        .dialog-content details .section-content {
            padding: 0 0 16px 0;
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
            color: var(--md-sys-color-on-surface-variant);
        }

        /* --- Dialog footer --- */
        .dialog-footer {
            display: flex;
            justify-content: flex-end;
            padding: 12px 24px;
            border-top: 1px solid var(--md-sys-color-outline-variant);
            position: sticky;
            bottom: 0;
            background: var(--md-sys-color-surface);
            z-index: 1;
            flex-shrink: 0;
        }

        .close-btn {
            padding: 10px 24px;
            border: none;
            border-radius: 20px;
            background: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            font-size: var(--md-sys-typescale-body-medium-size, 14px);
            font-weight: 500;
            cursor: pointer;
            font-family: inherit;
            transition: opacity 0.15s;
        }

        .close-btn:hover {
            opacity: 0.88;
        }

        .close-btn:focus-visible {
            outline: 2px solid var(--md-sys-color-primary);
            outline-offset: 2px;
        }

        /* --- Responsive --- */
        @media (max-width: 768px) {
            dialog {
                max-width: 100%;
                max-height: 100%;
                height: 100%;
                border-radius: 0;
                margin: 0;
            }

            .dialog-header {
                padding: 12px 16px;
            }

            .dialog-content {
                padding: 16px;
            }

            .dialog-footer {
                padding: 12px 16px;
            }

            .tabs {
                padding: 0 8px;
            }
        }
    `;

    /** Display mode: "checkbox" (level 1), "checkbox-dialog" (level 2), "summary" (level 3) */
    @property({ type: String })
    mode = "checkbox-dialog";

    /** Checkbox label text */
    @property({ type: String })
    label;

    /** Link label text within the checkbox label */
    @property({ type: String, attribute: "link-label" })
    linkLabel;

    /** URL to fetch HTML content for the dialog */
    @property({ type: String, attribute: "content-url" })
    contentUrl;

    /** Multiple documents with tabs: [{ title, contentUrl, pdfUrl }] */
    @property({
        attribute: "documents",
        converter: {
            fromAttribute: (value) => {
                if (!value) return undefined;
                try {
                    return JSON.parse(value);
                } catch {
                    return undefined;
                }
            },
        },
    })
    documents;

    /** URL to download the PDF version */
    @property({ type: String, attribute: "pdf-url" })
    pdfUrl;

    /** Plain-text summary displayed above the checkbox (mode=summary) */
    @property({ type: String })
    summary;

    /** Checkbox checked state */
    @property({ type: Boolean, reflect: true })
    checked = false;

    /** Whether the checkbox is required */
    @property({ type: Boolean })
    required = false;

    /** Dialog title */
    @property({ type: String, attribute: "dialog-title" })
    dialogTitle;

    /** Locale override (fr/en/es/pt) */
    @property({ type: String, attribute: "locale" })
    get locale() {
        return this.#localeValue;
    }
    set locale(value) {
        const oldValue = this.#localeValue;
        this.#localeValue = value || undefined;
        this.requestUpdate("locale", oldValue);
    }

    /** Field name for form integration */
    @property({ type: String })
    name = "condition";

    #localeValue;
    #langObserver;

    _showError = false;
    _contentHtml = null;
    _contentState = "idle"; // "idle" | "loading" | "loaded" | "error"
    _activeTabIndex = 0;

    /** Cache for fetched HTML content, keyed by URL */
    #contentCache = new Map();

    /** Reference to the trigger element that opened the dialog (for focus return) */
    #triggerEl = null;

    get #resolvedLang() {
        if (this.locale) return this.locale;
        const lang = this.closest("[lang]")?.lang;
        return lang ? lang.split("-")[0] : "fr";
    }

    get #t() {
        return TRANSLATIONS[this.#resolvedLang] || TRANSLATIONS.fr;
    }

    get #resolvedLabel() {
        return this.label ?? this.#t.defaultLabel;
    }

    get #resolvedLinkLabel() {
        return this.linkLabel ?? this.#t.defaultLinkLabel;
    }

    get #resolvedDialogTitle() {
        return this.dialogTitle ?? this.#t.defaultDialogTitle;
    }

    get #hasDialog() {
        return this.mode !== "checkbox" && (this.contentUrl || this.documents?.length);
    }

    get #activePdfUrl() {
        if (this.documents?.length) {
            return this.documents[this._activeTabIndex]?.pdfUrl;
        }
        return this.pdfUrl;
    }

    get #activeContentUrl() {
        if (this.documents?.length) {
            return this.documents[this._activeTabIndex]?.contentUrl;
        }
        return this.contentUrl;
    }

    connectedCallback() {
        super.connectedCallback();
        this.#langObserver = new MutationObserver(() => {
            if (!this.locale) {
                this.requestUpdate();
            }
        });
        this.#langObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["lang"],
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#langObserver?.disconnect();
    }

    /** Validate the condition. Returns true if valid. */
    validate() {
        if (this.required && !this.checked) {
            this._showError = true;
            this.requestUpdate();
            return false;
        }
        this._showError = false;
        this.requestUpdate();
        return true;
    }

    /** Open the dialog programmatically */
    openDialog() {
        const dialog = this.shadowRoot.querySelector("dialog");
        if (!dialog || dialog.open) return;
        this.#loadContent(this.#activeContentUrl);
        dialog.showModal();
        this.dispatchEvent(
            new CustomEvent("ge-condition-dialog-open", {
                detail: { name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    /** Close the dialog programmatically */
    closeDialog() {
        const dialog = this.shadowRoot.querySelector("dialog");
        if (!dialog || !dialog.open) return;
        dialog.close();
    }

    render() {
        const t = this.#t;

        return html`
            ${this.mode === "summary" && this.summary
                ? html`<div class="summary">${this.summary}</div>`
                : nothing}

            <div class="checkbox-row">
                <input
                    type="checkbox"
                    id="condition-cb"
                    .checked=${this.checked}
                    ?required=${this.required}
                    aria-describedby=${this._showError ? "error-msg" : nothing}
                    @change=${this.#onCheckboxChange}
                />
                <label for="condition-cb">
                    ${this.#hasDialog
                        ? html`${this.#resolvedLabel}
                              <a
                                  href="javascript:void(0)"
                                  role="button"
                                  @click=${this.#onLinkClick}
                                  @keydown=${this.#onLinkKeydown}
                                  >${this.#resolvedLinkLabel}</a
                              >`
                        : html`${this.#resolvedLabel} ${this.#resolvedLinkLabel}`}
                </label>
            </div>

            ${this._showError
                ? html`<div class="error-message" id="error-msg" aria-live="polite">
                      ${t.required}
                  </div>`
                : nothing}

            ${this.#hasDialog ? this.#renderDialog() : nothing}
        `;
    }

    #renderDialog() {
        const t = this.#t;
        const hasTabs = this.documents?.length > 1;
        const activePdf = this.#activePdfUrl;

        return html`
            <dialog @close=${this.#onDialogClose} @click=${this.#onDialogBackdropClick}>
                <div class="dialog-header">
                    <h2>${this.#resolvedDialogTitle}</h2>
                    <div class="dialog-header-actions">
                        ${activePdf
                            ? html`<a
                                  class="icon-btn"
                                  href=${activePdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title=${t.download}
                                  aria-label=${t.download}
                              >
                                  <svg viewBox="0 0 24 24">
                                      <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.34v4h5.33V9h3.34L12 2z" transform="rotate(180 12 12)" />
                                  </svg>
                              </a>`
                            : nothing}
                        <button
                            class="icon-btn"
                            @click=${this.closeDialog}
                            title=${t.close}
                            aria-label=${t.close}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>
                </div>

                ${hasTabs
                    ? html`<div class="tabs" role="tablist">
                          ${this.documents.map(
                              (doc, i) => html`
                                  <button
                                      class="tab"
                                      role="tab"
                                      aria-selected=${i === this._activeTabIndex}
                                      @click=${() => this.#onTabClick(i)}
                                  >
                                      ${doc.title}
                                  </button>
                              `
                          )}
                      </div>`
                    : nothing}

                <div class="dialog-content" role="tabpanel">
                    ${this._contentState === "loading"
                        ? html`<div class="loading">${t.loading}</div>`
                        : this._contentState === "error"
                          ? html`<div class="error">${t.error}</div>`
                          : this._contentHtml
                            ? unsafeHTML(this._contentHtml)
                            : nothing}
                </div>

                <div class="dialog-footer">
                    <button class="close-btn" @click=${this.closeDialog}>
                        ${t.close}
                    </button>
                </div>
            </dialog>
        `;
    }

    #onCheckboxChange(e) {
        this.checked = e.target.checked;
        if (this.checked) {
            this._showError = false;
        }
        this.dispatchEvent(
            new CustomEvent("ge-condition-change", {
                detail: { checked: this.checked, name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    #onLinkClick(e) {
        e.preventDefault();
        this.#triggerEl = e.currentTarget;
        this.openDialog();
    }

    #onLinkKeydown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.#triggerEl = e.currentTarget;
            this.openDialog();
        }
    }

    #onDialogClose() {
        this.#triggerEl?.focus();
        this.#triggerEl = null;
        this.dispatchEvent(
            new CustomEvent("ge-condition-dialog-close", {
                detail: { name: this.name },
                bubbles: true,
                composed: true,
            })
        );
    }

    #onDialogBackdropClick(e) {
        // Close on backdrop click (the dialog element itself is the backdrop target)
        if (e.target === e.currentTarget) {
            this.closeDialog();
        }
    }

    #onTabClick(index) {
        if (index === this._activeTabIndex) return;
        this._activeTabIndex = index;
        this.requestUpdate();
        const url = this.documents[index]?.contentUrl;
        if (url) {
            this.#loadContent(url);
        }
    }

    async #loadContent(url) {
        if (!url) return;

        // Check cache
        if (this.#contentCache.has(url)) {
            this._contentState = "loaded";
            this._contentHtml = this.#contentCache.get(url);
            this.requestUpdate();
            return;
        }

        this._contentState = "loading";
        this._contentHtml = null;
        this.requestUpdate();

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const htmlText = await response.text();
            const accordion = this.#parseToAccordion(htmlText);
            this.#contentCache.set(url, accordion);
            this._contentState = "loaded";
            this._contentHtml = accordion;
            this.requestUpdate();
        } catch {
            this._contentState = "error";
            this._contentHtml = null;
            this.requestUpdate();
        }
    }

    /**
     * Parse HTML content and transform h2/h3 headings into details/summary accordion.
     * If the content already contains <details> elements, return it as-is.
     */
    #parseToAccordion(htmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // If the content already has <details>, use as-is
        if (doc.querySelectorAll("details").length > 0) {
            return doc.body.innerHTML;
        }

        // Find headings (h2 or h3)
        const headings = doc.body.querySelectorAll("h2, h3");
        if (headings.length === 0) {
            // No headings — wrap the whole content in a single section
            return doc.body.innerHTML;
        }

        let result = "";
        // Content before the first heading
        let preContent = "";
        let currentNode = doc.body.firstChild;
        while (currentNode && currentNode !== headings[0]) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                preContent += currentNode.outerHTML;
            } else if (currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent.trim()) {
                preContent += currentNode.textContent;
            }
            currentNode = currentNode.nextSibling;
        }
        if (preContent.trim()) {
            result += preContent;
        }

        // Build accordion sections
        headings.forEach((heading, index) => {
            const title = heading.textContent.trim();
            let content = "";
            let sibling = heading.nextSibling;
            const nextHeading = headings[index + 1];

            while (sibling && sibling !== nextHeading) {
                if (sibling.nodeType === Node.ELEMENT_NODE) {
                    content += sibling.outerHTML;
                } else if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim()) {
                    content += sibling.textContent;
                }
                sibling = sibling.nextSibling;
            }

            result += `<details${index === 0 ? " open" : ""}>
                <summary>${title}</summary>
                <div class="section-content">${content}</div>
            </details>`;
        });

        return result;
    }

}

export { GeCondition };
