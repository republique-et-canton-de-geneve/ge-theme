import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-header-armoiries.js";

describe("ge-header-armoiries", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-header-armoiries")).to.exist;
  });

  it("switches between light and dark variants", async () => {
    const el = await fixture(
      html`<ge-header-armoiries variant="dark"></ge-header-armoiries>`
    );
    const darkContent = el.getSVGContent("dark");
    const lightContent = el.getSVGContent("light");
    expect(darkContent).to.be.a("string").and.to.not.be.empty;
    expect(lightContent).to.be.a("string").and.to.not.be.empty;
    expect(darkContent).to.not.equal(lightContent);
  });
});
