import { LitElement } from "lit";

export interface FooterLink {
    title: string;
    href: string;
}

export declare class GeFooter extends LitElement {
    /** When true, footer spans full width. When false, constrained to 1107px. */
    maxWidth: boolean;

    /** URL for the Contact link */
    contactLink: string;

    /** URL for the Accessibility link */
    accessibilityLink: string;

    /** URL for the Privacy Policy link */
    privacyLink: string;

    /** URL for the Terms link */
    termsLink: string;

    /** Custom links array. Overrides default links when provided. */
    links?: FooterLink[];

    /** Theme: 'light' or 'dark'. Defaults to system preference, attribute overrides. */
    theme: "light" | "dark";
}

declare global {
    interface HTMLElementTagNameMap {
        "ge-footer": GeFooter;
    }

    interface HTMLElementEventMap {
        "ge-footer-image-click": CustomEvent<{ originalEvent: MouseEvent }>;
    }
}