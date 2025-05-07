/**
 * Adjusts the size of an SVG element based on specified width/height attributes,
 * maintaining aspect ratio based on viewBox if one dimension is missing.
 * @param svgElement - The SVG element to resize.
 * @param specifiedWidth - The desired width attribute value.
 * @param specifiedHeight - The desired height attribute value.
 */
export declare function adjustSvgSize(
    svgElement: SVGElement | null | undefined,
    specifiedWidth: string | null | undefined,
    specifiedHeight: string | null | undefined
): void;

/**
 * SvgWrapper – base class for clickable SVG‑based web components.
 * Sub‑classes must implement {@link getSVGContent} to return the inline SVG
 * markup for the requested variant.
 */
export class SvgWrapper extends HTMLElement {
    constructor();

    /** Attributes that the element reacts to (`attributeChangedCallback`). */
    static get observedAttributes(): string[];

    /** Called automatically when the element is inserted in the DOM. */
    connectedCallback(): void;

    /** Called automatically when the element is removed from the DOM. */
    disconnectedCallback(): void;

    /**
     * Handles click events and invokes the callback defined in the `onClick`
     * attribute (if any).
     */
    handleClick(event: Event): void;

    /**
     * MUST be overridden by sub‑classes to supply raw SVG markup.
     *
     * @param variant Variant name, e.g. `"light"` or `"dark"`.
     * @returns The raw `<svg …>…</svg>` string to render.
     */
    getSVGContent(variant: string): string;
}
