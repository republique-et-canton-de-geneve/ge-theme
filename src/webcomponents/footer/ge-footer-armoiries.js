import { SvgWrapper } from "../SvgWrapper.js";

class FooterArmoiries extends SvgWrapper {
    constructor() {
        super(location.hostname === "localhost"
            ? "http://localhost:1234/theme/icons/common/footer/"
            : "https://static.app.ge.ch/theme/icons/common/footer/");
    }

    getFileName(variant) {
        return variant === "dark" ? "footer-armoiries-dark.svg" : "footer-armoiries-light.svg";
    }
}

customElements.define("ge-footer-armoiries", FooterArmoiries);
