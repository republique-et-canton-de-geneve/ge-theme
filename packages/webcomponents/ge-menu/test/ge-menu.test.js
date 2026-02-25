import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-menu.js";

describe("ge-menu", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-menu")).to.exist;
  });

  it("toggles to collapsed on button click", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const btn = el.shadowRoot.querySelector(".toggle-button");

    btn.click();
    await el.updateComplete;

    const sidebar = el.shadowRoot.querySelector(".sidebar");
    expect(sidebar.classList.contains("collapsed")).to.be.true;
    expect(sidebar.classList.contains("expanded")).to.be.false;
  });

  it("switches to icons-only mode when collapsed", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const btn = el.shadowRoot.querySelector(".toggle-button");
    btn.click();
    await el.updateComplete;

    const content = el.shadowRoot.querySelector(".sidebar-content");
    expect(content.classList.contains("icons-only")).to.be.true;
  });
});
