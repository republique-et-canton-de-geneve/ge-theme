import { expect, fixture, html } from "@open-wc/testing";
import "../src/select-mes-espaces.js";

describe("select-mes-espaces", () => {
  const mockLinks = [
    { href: "/apple", label: "Apple" },
    "---",
    { href: "/banana", label: "Banana" },
  ];

  it("is defined as a custom element", () => {
    expect(customElements.get("select-mes-espaces")).to.exist;
  });

  it("parses JSON links from attribute", async () => {
    const json = JSON.stringify(mockLinks);
    const el = await fixture(
      html`<select-mes-espaces links=${json}></select-mes-espaces>`
    );
    expect(el.links).to.deep.equal(mockLinks);
  });

  it("returns empty array for invalid JSON", async () => {
    const el = await fixture(
      html`<select-mes-espaces links="not valid json"></select-mes-espaces>`
    );
    expect(el.links).to.deep.equal([]);
  });

  it("renders separators for string entries", async () => {
    const el = await fixture(
      html`<select-mes-espaces .links=${mockLinks}></select-mes-espaces>`
    );
    const separators = el.shadowRoot.querySelectorAll("hr");
    expect(separators.length).to.equal(1);
  });

  it("toggleMenu opens and closes the menu", async () => {
    const el = await fixture(
      html`<select-mes-espaces .links=${mockLinks}></select-mes-espaces>`
    );
    await el.updateComplete;

    const menu = el.shadowRoot.querySelector("#select-mes-espaces-menu");
    expect(menu.open).to.not.be.true;

    el.toggleMenu();
    expect(menu.open).to.be.true;

    el.toggleMenu();
    expect(menu.open).to.be.false;
  });

  it("does nothing when menu closes without selection", async () => {
    const el = await fixture(
      html`<select-mes-espaces></select-mes-espaces>`
    );
    expect(() =>
      el.onCloseMenu(new CustomEvent("close-menu", { detail: {} }))
    ).not.to.throw();
  });
});
