import { LitElement } from 'lit';

export interface GeConsentEventDetail {
    granted: boolean;
}

export declare class GeConsent extends LitElement {
    /**
     * Opens the consent dialog programmatically.
     */
    show(): void;

    /**
     * Resets consent state by clearing cookies and reopening the dialog.
     */
    reset(): void;
}

declare global {
    interface HTMLElementTagNameMap {
        'ge-consent': GeConsent;
    }

    interface HTMLElementEventMap {
        'consent': CustomEvent<GeConsentEventDetail>;
    }
}