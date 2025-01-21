import { SvgWrapper } from "../SvgWrapper.js";

/**
 * HeaderArmoiries - A web component for displaying the header armoiries.
 *
 * @class HeaderArmoiries
 * @extends SvgWrapper
 */
class HeaderArmoiries extends SvgWrapper {
    constructor() {
        const isLocalEnv = process.env.PARCEL_BUILD === undefined;
        super(isLocalEnv
            ? "http://localhost:1234/theme/icons/common/header/"
            : "https://static.app.ge.ch/theme/icons/common/header/");
    }

    getFileName(variant) {
        return variant === "dark" ? "header-armoiries-dark.svg" : "header-armoiries-light.svg";
    }
}

customElements.define("ge-header-armoiries", HeaderArmoiries);
