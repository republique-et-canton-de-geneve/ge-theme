import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-header-public.js";

describe("ge-header-public", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-header-public")).to.exist;
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
