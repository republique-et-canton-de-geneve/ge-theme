import { expect, fixture, html } from "@open-wc/testing";
import "../src/ge-footer-armoiries.js";

describe("ge-footer-armoiries", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-footer-armoiries")).to.exist;
  });

  it("creates an element with a shadow root", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries></ge-footer-armoiries>`
    );
    expect(el.shadowRoot).to.exist;
  });

  it("renders an SVG in its shadow root", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries></ge-footer-armoiries>`
    );
    const svg = el.shadowRoot.querySelector("svg");
    expect(svg).to.exist;
  });

  it("renders light variant by default", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries></ge-footer-armoiries>`
    );
    expect(el.getSVGContent("light")).to.be.a("string");
    expect(el.getSVGContent("light")).to.not.be.empty;
  });

  it("switches to dark variant", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries variant="dark"></ge-footer-armoiries>`
    );
    const darkContent = el.getSVGContent("dark");
    const lightContent = el.getSVGContent("light");
    expect(darkContent).to.be.a("string");
    expect(darkContent).to.not.equal(lightContent);
  });

  it("respects width attribute for sizing", async () => {
    const el = await fixture(
      html`<ge-footer-armoiries width="80"></ge-footer-armoiries>`
    );
    const svg = el.shadowRoot.querySelector("svg svg") || el.shadowRoot.querySelector("svg");
    expect(svg.getAttribute("width")).to.equal("80");
  });
});
