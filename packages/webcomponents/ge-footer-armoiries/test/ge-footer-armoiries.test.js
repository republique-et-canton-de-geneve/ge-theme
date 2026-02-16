import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-footer-armoiries.js";

describe("ge-footer-armoiries", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-footer-armoiries")).to.exist;
  });

  it("switches between light and dark variants", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries variant="dark"></ge-footer-armoiries>`
    );
    const darkContent = el.getSVGContent("dark");
    const lightContent = el.getSVGContent("light");
    expect(darkContent).to.be.a("string").and.to.not.be.empty;
    expect(lightContent).to.be.a("string").and.to.not.be.empty;
    expect(darkContent).to.not.equal(lightContent);
  });
});
