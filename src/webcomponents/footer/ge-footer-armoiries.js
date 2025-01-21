import { SvgWrapper } from "../SvgWrapper.js";

/**
 * FooterArmoiries - A web component for displaying the footer armoiries.
 *
 * @class FooterArmoiries
 * @extends SvgWrapper
 */
class FooterArmoiries extends SvgWrapper {
    constructor() {
        const isLocalEnv = process.env.PARCEL_BUILD === undefined;
        super(isLocalEnv
            ? "http://localhost:1234/theme/icons/common/footer/"
            : "https://static.app.ge.ch/theme/icons/common/footer/");
    }

    getFileName(variant) {
        return variant === "dark" ? "footer-armoiries-dark.svg" : "footer-armoiries-light.svg";
    }
}

customElements.define("ge-footer-armoiries", FooterArmoiries);
