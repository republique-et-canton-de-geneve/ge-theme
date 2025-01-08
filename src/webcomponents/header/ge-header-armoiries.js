import { SvgWrapper } from "../SvgWrapper.js";

class HeaderArmoiries extends SvgWrapper {
    constructor() {
        super(location.hostname === "localhost"
            ? "http://localhost:1234/theme/icons/common/header/"
            : "https://static.app.ge.ch/theme/icons/common/header/");
    }

    getFileName(variant) {
        return variant === "dark" ? "header-armoiries-dark.svg" : "header-armoiries-light.svg";
    }
}

customElements.define("ge-header-armoiries", HeaderArmoiries);
