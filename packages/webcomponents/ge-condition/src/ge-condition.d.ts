import { LitElement } from "lit";

export interface ConditionDocument {
    title: string;
    contentUrl: string;
    pdfUrl?: string;
}

export interface GeConditionChangeDetail {
    checked: boolean;
    name: string;
}

export interface GeConditionDialogDetail {
    name: string;
}

export declare class GeCondition extends LitElement {
    /** Display mode: "checkbox", "checkbox-dialog", or "summary" */
    mode: "checkbox" | "checkbox-dialog" | "summary";

    /** Checkbox label text */
    label: string | undefined;

    /** Link label text within the checkbox label */
    linkLabel: string | undefined;

    /** URL to fetch HTML content for the dialog */
    contentUrl: string | undefined;

    /** Multiple documents with tabs */
    documents: ConditionDocument[] | undefined;

    /** URL to download the PDF version */
    pdfUrl: string | undefined;

    /** Plain-text summary displayed above the checkbox (mode=summary) */
    summary: string | undefined;

    /** Checkbox checked state */
    checked: boolean;

    /** Whether the checkbox is required */
    required: boolean;

    /** Dialog title */
    dialogTitle: string | undefined;

    /** Locale override (fr/en/es/pt) */
    locale: string | undefined;

    /** Field name for form integration */
    name: string;

    /**
     * Validate the condition.
     * Shows an error message if required and not checked.
     * @returns true if valid
     */
    validate(): boolean;

    /** Open the dialog programmatically */
    openDialog(): void;

    /** Close the dialog programmatically */
    closeDialog(): void;
}

declare global {
    interface HTMLElementTagNameMap {
        "ge-condition": GeCondition;
    }

    interface HTMLElementEventMap {
        "ge-condition-change": CustomEvent<GeConditionChangeDetail>;
        "ge-condition-dialog-open": CustomEvent<GeConditionDialogDetail>;
        "ge-condition-dialog-close": CustomEvent<GeConditionDialogDetail>;
    }
}
