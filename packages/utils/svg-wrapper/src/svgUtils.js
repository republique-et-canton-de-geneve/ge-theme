/**
 * Adjusts the size of an SVG element based on specified width/height attributes,
 * maintaining aspect ratio based on viewBox if one dimension is missing.
 * @param {SVGElement} svgElement - The SVG element to resize.
 * @param {string | null | undefined} specifiedWidth - The desired width attribute value.
 * @param {string | null | undefined} specifiedHeight - The desired height attribute value.
 */
export function adjustSvgSize(svgElement, specifiedWidth, specifiedHeight) {
    if (!svgElement) return;

    const viewBox = svgElement.getAttribute("viewBox") || "0 0 1 1";
    const parts = viewBox.split(" ").map(Number);
    // Ensure we have valid numbers for intrinsic dimensions
    const intrinsicWidth = parts.length === 4 && !isNaN(parts[2]) && parts[2] > 0 ? parts[2] : 1;
    const intrinsicHeight = parts.length === 4 && !isNaN(parts[3]) && parts[3] > 0 ? parts[3] : 1;

    let finalWidth = specifiedWidth;
    let finalHeight = specifiedHeight;

    if (specifiedWidth && !specifiedHeight) {
        const w = parseFloat(specifiedWidth);
        if (!isNaN(w)) {
            finalHeight = ((w / intrinsicWidth) * intrinsicHeight) + "";
        } else {
            finalHeight = intrinsicHeight + ""; // Fallback if specifiedWidth is invalid
        }
    } else if (specifiedHeight && !specifiedWidth) {
        const h = parseFloat(specifiedHeight);
        if (!isNaN(h)) {
            finalWidth = ((h / intrinsicHeight) * intrinsicWidth) + "";
        } else {
            finalWidth = intrinsicWidth + ""; // Fallback
        }
    } else if (!specifiedWidth && !specifiedHeight) {
        finalWidth = intrinsicWidth + "";
        finalHeight = intrinsicHeight + "";
    }
    // If both are specified, use them directly (or fallbacks if only one was calculated)

    svgElement.setAttribute("width", finalWidth || intrinsicWidth + "");
    svgElement.setAttribute("height", finalHeight || intrinsicHeight + "");
}

/**
 * SvgWrapper - Base class for clickable SVG-based web components.
 * Provides structure and logic to dynamically load and display SVG files.
 * The onClick attributes allows for a callback handler to be passed.
 *
 * @class SvgWrapper
 * @extends HTMLElement
 */
export class SvgWrapper extends HTMLElement {
    constructor() {
        super();

        // Define the template for the shadow DOM
        const template = document.createElement("template");
        template.innerHTML = `
          <style>
            :host {
              display: inline-block;
            }
            svg {
              display: block;
            }
          </style>
          <svg></svg>
        `;

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Bind the click handler
        this.handleClick = this.handleClick.bind(this);
    }

    static get observedAttributes() {
        return ["width", "height", "variant", "onClick"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.#updateComponent();
        }
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback() {
        this.#updateComponent();
        this.addEventListener("click", this.handleClick);
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
    }

    /**
     * Handles click events and invokes the callback if defined.
     * @param {Event} event - Click event.
     */
    handleClick(event) {
        const onClickAttr = this.getAttribute("onClick");
        if (onClickAttr && typeof window[onClickAttr] === "function") {
            window[onClickAttr](event);
        }
    }

    /**
     * Children must override this method to return the entire inline SVG string.
     * @param {string} variant - Light/dark or other variant.
     * @returns {string} The raw SVG markup as a string.
     */
    getSVGContent(variant) {
        throw new Error("getSVGContent must be implemented by subclasses.");
    }

    /**
     * Updates the component by loading the appropriate SVG file.
     * @private
     */
    #updateComponent() {
        const svgElement = this.shadowRoot.querySelector("svg");
        const variant = this.getAttribute("variant") || "light";
        // Inject SVG markup and then size it
        svgElement.innerHTML = this.getSVGContent(variant) || "<svg><!-- No content --></svg>";
        this.#adjustSize(svgElement.querySelector("svg") || svgElement);
    }

    /**
     * Adjusts the size of the SVG element based on the width and height attributes.
     * @private
     * @param {SVGElement} svgElement - The SVG element.
     */
    #adjustSize(svgElement) {
        const specifiedWidth = this.getAttribute("width");
        const specifiedHeight = this.getAttribute("height");
        const viewBox = svgElement.getAttribute("viewBox") || "0 0 1 1";
        const [, , intrinsicWidth, intrinsicHeight] = viewBox.split(" ").map(Number);

        if (specifiedWidth && !specifiedHeight) {
            const calculatedHeight = (specifiedWidth / intrinsicWidth) * intrinsicHeight;
            svgElement.setAttribute("width", specifiedWidth);
            svgElement.setAttribute("height", calculatedHeight + "");
        } else if (specifiedHeight && !specifiedWidth) {
            const calculatedWidth = (specifiedHeight / intrinsicHeight) * intrinsicWidth;
            svgElement.setAttribute("height", specifiedHeight);
            svgElement.setAttribute("width", calculatedWidth + "");
        } else {
            svgElement.setAttribute("width", specifiedWidth || intrinsicWidth);
            svgElement.setAttribute("height", specifiedHeight || intrinsicHeight);
        }
    }
}
