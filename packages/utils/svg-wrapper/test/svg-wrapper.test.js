import { expect, fixture, html } from "@open-wc/testing";
import { adjustSvgSize, SvgWrapper } from "../src/svgUtils.js";

// ---------- adjustSvgSize() ----------

describe("adjustSvgSize", () => {
  /** @returns {SVGSVGElement} */
  function makeSvg(viewBox = "0 0 100 50") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    return svg;
  }

  it("does nothing when svgElement is null", () => {
    expect(() => adjustSvgSize(null, "100", "50")).not.to.throw();
  });

  it("uses viewBox to compute height when only width is given", () => {
    const svg = makeSvg("0 0 100 50");
    adjustSvgSize(svg, "200", undefined);
    expect(svg.getAttribute("width")).to.equal("200");
    expect(svg.getAttribute("height")).to.equal("100");
  });

  it("uses viewBox to compute width when only height is given", () => {
    const svg = makeSvg("0 0 100 50");
    adjustSvgSize(svg, undefined, "100");
    expect(svg.getAttribute("width")).to.equal("200");
    expect(svg.getAttribute("height")).to.equal("100");
  });

  it("uses both specified dimensions when both are provided", () => {
    const svg = makeSvg("0 0 100 50");
    adjustSvgSize(svg, "300", "150");
    expect(svg.getAttribute("width")).to.equal("300");
    expect(svg.getAttribute("height")).to.equal("150");
  });

  it("falls back to intrinsic dimensions when neither is specified", () => {
    const svg = makeSvg("0 0 100 50");
    adjustSvgSize(svg, undefined, undefined);
    expect(svg.getAttribute("width")).to.equal("100");
    expect(svg.getAttribute("height")).to.equal("50");
  });

  it("falls back to 1×1 when viewBox is missing", () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    adjustSvgSize(svg, undefined, undefined);
    expect(svg.getAttribute("width")).to.equal("1");
    expect(svg.getAttribute("height")).to.equal("1");
  });
});

// ---------- SvgWrapper base class ----------

describe("SvgWrapper", () => {
  const tagName = "test-svg-wrapper";

  // Create a concrete subclass for testing
  class TestSvgWrapper extends SvgWrapper {
    getSVGContent(variant) {
      return variant === "dark"
        ? '<svg viewBox="0 0 10 20"><rect fill="black"/></svg>'
        : '<svg viewBox="0 0 10 20"><rect fill="white"/></svg>';
    }
  }

  // Register only once
  if (!customElements.get(tagName)) {
    customElements.define(tagName, TestSvgWrapper);
  }

  it("creates a shadow root with an <svg> element", async () => {
    const el = await fixture(html`<test-svg-wrapper></test-svg-wrapper>`);
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot.querySelector("svg")).to.exist;
  });

  it("renders the light variant by default", async () => {
    const el = await fixture(html`<test-svg-wrapper></test-svg-wrapper>`);
    const inner = el.shadowRoot.querySelector("svg svg");
    expect(inner).to.exist;
    expect(inner.querySelector("rect").getAttribute("fill")).to.equal("white");
  });

  it("switches to dark variant via attribute", async () => {
    const el = await fixture(
      html`<test-svg-wrapper variant="dark"></test-svg-wrapper>`
    );
    const inner = el.shadowRoot.querySelector("svg svg");
    expect(inner).to.exist;
    expect(inner.querySelector("rect").getAttribute("fill")).to.equal("black");
  });

  it("adjusts size based on width attribute", async () => {
    const el = await fixture(
      html`<test-svg-wrapper width="20"></test-svg-wrapper>`
    );
    const inner = el.shadowRoot.querySelector("svg svg") || el.shadowRoot.querySelector("svg");
    expect(inner.getAttribute("width")).to.equal("20");
    // viewBox is 10x20 → height should be 40
    expect(inner.getAttribute("height")).to.equal("40");
  });

  it("fires onClick callback when clicked", async () => {
    let called = false;
    window.__testClickHandler = () => { called = true; };
    const el = await fixture(
      html`<test-svg-wrapper onClick="__testClickHandler"></test-svg-wrapper>`
    );
    el.click();
    expect(called).to.be.true;
    delete window.__testClickHandler;
  });

  it("removes click listener on disconnect", async () => {
    const el = await fixture(html`<test-svg-wrapper></test-svg-wrapper>`);
    el.remove();
    // Should not throw
    expect(() => el.click()).not.to.throw();
  });

  it("getSVGContent throws if not overridden", () => {
    // Use prototype directly since SvgWrapper can't be constructed
    // without being registered as a custom element
    expect(() => SvgWrapper.prototype.getSVGContent("light")).to.throw(
      "getSVGContent must be implemented by subclasses."
    );
  });
});
