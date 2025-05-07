// ge-header-armoiries.js
// Web‑component that renders the Geneva state coat‑of‑arms for the site header.
// Uses the generic <svg-wrapper> base so we inherit size + theme‑switching
// behaviour shared by all icons in the design‑system.

import { SvgWrapper } from "@ael/svg-wrapper-utils";

// Parcel v2 inlines the file contents at build‑time (no network request)
import armoiriesDark  from '@ael/icons/common/header/header-armoiries-dark.svg';
import armoiriesLight  from '@ael/icons/common/header/header-armoiries-light.svg';

/**
 * <ge-header-armoiries>
 * ---------------------------------------------------------------------------
 * Displays the official coat‑of‑arms used in the header.
 *
 *   <ge-header-armoiries></ge-header-armoiries>
 *   <ge-header-armoiries variant="dark"></ge-header-armoiries>
 */
class HeaderArmoiries extends SvgWrapper {
    static tagName = "ge-header-armoiries";

    /**
     * Returns the raw SVG string for the requested variant.
     * @param {"light"|"dark"} variant – supplied by <svg-wrapper> via the
     *                                  `variant` attribute (default: "light")
     * @returns {string}
     */
    getSVGContent(variant) {
        return variant === "dark" ? armoiriesDark : armoiriesLight;
    }
}

customElements.define(HeaderArmoiries.tagName, HeaderArmoiries);
export { HeaderArmoiries };
