// ge-footer-armoiries.js
// Web‑component that renders the Geneva state coat‑of‑arms for the site footer.
// Uses the generic <svg-wrapper> base so we inherit size + theme‑switching
// behaviour shared by all icons in the design‑system.

import { SvgWrapper } from "@ael/svg-wrapper-utils";

// Parcel v2 inlines the file contents at build‑time (no network request)
import armoiriesDark  from '@ael/icons/common/footer/footer-armoiries-dark.svg';
import armoiriesLight  from '@ael/icons/common/footer/footer-armoiries-light.svg';

/**
 * <ge-footer-armoiries>
 * ---------------------------------------------------------------------------
 * Displays the official coat‑of‑arms used in the footer.
 *
 *   <ge-footer-armoiries></ge-footer-armoiries>
 *   <ge-footer-armoiries variant="dark"></ge-footer-armoiries>
 */
class FooterArmoiries extends SvgWrapper {
    static tagName = "ge-footer-armoiries";

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

customElements.define(FooterArmoiries.tagName, FooterArmoiries);
export { FooterArmoiries };
