import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-header-public.js";

describe("ge-header-public", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-header-public")).to.exist;
  });

  it("renders a header element", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const header = el.shadowRoot.querySelector("header");
    expect(header).to.exist;
    expect(header.getAttribute("role")).to.equal("banner");
  });

  it("renders the ge.ch logo link", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const link = el.shadowRoot.querySelector("a.logo-section");
    expect(link).to.exist;
    expect(link.getAttribute("href")).to.equal("https://www.ge.ch/");
  });

  it("renders the ge.ch title", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const title = el.shadowRoot.querySelector(".title");
    expect(title).to.exist;
    expect(title.textContent).to.equal("ge.ch");
  });

  it("applies maxwidth-full class by default (maxWidth='true')", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-full")).to.be.true;
    expect(div.classList.contains("maxwidth-formulaire")).to.be.false;
  });

  it("applies maxwidth-formulaire class when maxWidth='false'", async () => {
    const el = await fixture(
      html`<ge-header-public maxWidth="false"></ge-header-public>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
    expect(div.classList.contains("maxwidth-full")).to.be.false;
  });

  it("applies maxwidth-formulaire class when maxWidth='1107px'", async () => {
    const el = await fixture(
      html`<ge-header-public maxWidth="1107px"></ge-header-public>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
  });
});
