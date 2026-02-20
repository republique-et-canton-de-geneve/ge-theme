import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "../src/ge-footer.js";

describe("ge-footer", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-footer")).to.exist;
  });

  it("renders custom links when provided", async () => {
    const customLinks = JSON.stringify([
      { title: "Link A", href: "/a" },
      { title: "Link B", href: "/b" },
    ]);
    const el = await fixture(
      html`<ge-footer links=${customLinks}></ge-footer>`
    );
    const links = el.shadowRoot.querySelectorAll("nav a");
    expect(links.length).to.equal(2);
    expect(links[0].textContent.trim()).to.equal("Link A");
    expect(links[1].getAttribute("href")).to.equal("/b");
  });

  it("uses custom contactLink property", async () => {
    const el = await fixture(
      html`<ge-footer contactLink="https://custom.ch/contact"></ge-footer>`
    );
    const links = el.shadowRoot.querySelectorAll("nav a");
    expect(links[0].getAttribute("href")).to.equal(
      "https://custom.ch/contact"
    );
  });

  it("renders armoiries image matching the theme", async () => {
    const el = await fixture(
      html`<ge-footer theme="dark"></ge-footer>`
    );
    const img = el.shadowRoot.querySelector("img.ge-footer-armoiries");
    expect(img).to.exist;
    expect(img.getAttribute("src")).to.include("footer-armoiries-dark.svg");
  });

  it("dispatches ge-footer-image-click on armoiries click", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const img = el.shadowRoot.querySelector("img.ge-footer-armoiries");

    setTimeout(() => img.click());
    const event = await oneEvent(el, "ge-footer-image-click");

    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });
});
