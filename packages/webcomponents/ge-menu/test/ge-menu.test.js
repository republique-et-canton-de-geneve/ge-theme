import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-menu.js";

describe("ge-menu", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-menu")).to.exist;
  });

  it("renders a sidebar", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const sidebar = el.shadowRoot.querySelector(".sidebar");
    expect(sidebar).to.exist;
  });

  it("starts in expanded state", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const sidebar = el.shadowRoot.querySelector(".sidebar");
    expect(sidebar.classList.contains("expanded")).to.be.true;
    expect(sidebar.classList.contains("collapsed")).to.be.false;
  });

  it("renders header title when expanded", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const title = el.shadowRoot.querySelector(".header-title");
    expect(title).to.exist;
    expect(title.textContent.trim()).to.equal("Mon espace Créancier");
  });

  it("renders toggle button", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const btn = el.shadowRoot.querySelector(".toggle-button");
    expect(btn).to.exist;
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

  it("toggles back to expanded on second click", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const btn = el.shadowRoot.querySelector(".toggle-button");

    btn.click();
    await el.updateComplete;
    btn.click();
    await el.updateComplete;

    const sidebar = el.shadowRoot.querySelector(".sidebar");
    expect(sidebar.classList.contains("expanded")).to.be.true;
  });

  it("renders menu items", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const items = el.shadowRoot.querySelectorAll(".menu-item");
    expect(items.length).to.be.greaterThan(0);
  });

  it("renders menu item text", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const texts = el.shadowRoot.querySelectorAll(".menu-item-text");
    const labels = [...texts].map((t) => t.textContent.trim());
    expect(labels).to.include("Je suis créancier");
    expect(labels).to.include("Factures et frais");
  });

  it("hides item text when collapsed (icons-only)", async () => {
    const el = await fixture(html`<ge-menu></ge-menu>`);
    const btn = el.shadowRoot.querySelector(".toggle-button");
    btn.click();
    await el.updateComplete;

    const content = el.shadowRoot.querySelector(".sidebar-content");
    expect(content.classList.contains("icons-only")).to.be.true;
  });
});
