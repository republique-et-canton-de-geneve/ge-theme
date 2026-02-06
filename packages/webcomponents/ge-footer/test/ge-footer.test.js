import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "../src/ge-footer.js";

describe("ge-footer", () => {
  it("is defined as a custom element", () => {
    expect(customElements.get("ge-footer")).to.exist;
  });

  it("renders a footer element", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const footer = el.shadowRoot.querySelector("footer");
    expect(footer).to.exist;
  });

  // ---------- Default links ----------

  it("renders 4 default links", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const links = el.shadowRoot.querySelectorAll("nav a");
    expect(links.length).to.equal(4);
  });

  it("renders default link titles", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const links = el.shadowRoot.querySelectorAll("nav a");
    const titles = [...links].map((a) => a.textContent.trim());
    expect(titles).to.deep.equal([
      "Contact",
      "Accessibilité",
      "Politique de confidentialité",
      "Conditions générales",
    ]);
  });

  it("renders default link hrefs", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const links = el.shadowRoot.querySelectorAll("nav a");
    expect(links[0].getAttribute("href")).to.equal(
      "https://www.ge.ch/c/footer-edm-aide"
    );
    expect(links[3].getAttribute("href")).to.equal(
      "https://www.ge.ch/c/footer-edm-cgu"
    );
  });

  it("renders separators between links", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const separators = el.shadowRoot.querySelectorAll("nav span");
    expect(separators.length).to.equal(3); // 4 links → 3 separators
  });

  // ---------- Custom links ----------

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

  // ---------- Custom link properties ----------

  it("uses custom contactLink property", async () => {
    const el = await fixture(
      html`<ge-footer contactLink="https://custom.ch/contact"></ge-footer>`
    );
    const links = el.shadowRoot.querySelectorAll("nav a");
    expect(links[0].getAttribute("href")).to.equal(
      "https://custom.ch/contact"
    );
  });

  // ---------- Theme ----------

  it("defaults to light theme based on system preference", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    // theme defaults to system preference (light in headless chrome)
    expect(el.theme).to.equal("light");
  });

  it("reflects theme attribute when set explicitly", async () => {
    const el = await fixture(
      html`<ge-footer theme="dark"></ge-footer>`
    );
    expect(el.theme).to.equal("dark");
  });

  it("renders armoiries image with correct theme in src", async () => {
    const el = await fixture(
      html`<ge-footer theme="dark"></ge-footer>`
    );
    const img = el.shadowRoot.querySelector("img.ge-footer-armoiries");
    expect(img).to.exist;
    expect(img.getAttribute("src")).to.include("footer-armoiries-dark.svg");
  });

  it("renders armoiries image with light theme by default", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const img = el.shadowRoot.querySelector("img.ge-footer-armoiries");
    expect(img.getAttribute("src")).to.include("footer-armoiries-light.svg");
  });

  // ---------- maxWidth ----------

  it("applies maxwidth-true class by default", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const container = el.shadowRoot.querySelector(".ge-footer-container");
    expect(container.classList.contains("maxwidth-true")).to.be.true;
  });

  // ---------- Event: ge-footer-image-click ----------

  it("dispatches ge-footer-image-click on armoiries click", async () => {
    const el = await fixture(html`<ge-footer></ge-footer>`);
    const img = el.shadowRoot.querySelector("img.ge-footer-armoiries");

    setTimeout(() => img.click());
    const event = await oneEvent(el, "ge-footer-image-click");

    expect(event).to.exist;
    expect(event.type).to.equal("ge-footer-image-click");
    expect(event.detail.originalEvent).to.exist;
  });
});
