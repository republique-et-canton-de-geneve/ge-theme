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

  // --- Menu button tests ---

  it("does not show menu button by default", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const menuBtn = el.shadowRoot.querySelector('#menu-toggle');
    expect(menuBtn).to.be.null;
  });

  it("shows menu button when showMenu is set", async () => {
    const el = await fixture(
      html`<ge-header-public showMenu></ge-header-public>`
    );
    const menuBtn = el.shadowRoot.querySelector('#menu-toggle');
    expect(menuBtn).to.exist;
  });

  // --- Login button tests ---

  it("does not show login button by default", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const loginBtn = el.shadowRoot.querySelector('m3e-icon-button[href]');
    expect(loginBtn).to.be.null;
  });

  it("shows login button when showLogin is set", async () => {
    const el = await fixture(
      html`<ge-header-public showLogin></ge-header-public>`
    );
    const loginBtn = el.shadowRoot.querySelector('m3e-icon-button[href]');
    expect(loginBtn).to.exist;
    expect(loginBtn.getAttribute("href")).to.equal("https://www.ge.ch/connexion");
  });

  it("uses custom loginUrl when provided", async () => {
    const el = await fixture(
      html`<ge-header-public showLogin loginUrl="https://example.com/login"></ge-header-public>`
    );
    const loginBtn = el.shadowRoot.querySelector('m3e-icon-button[href]');
    expect(loginBtn.getAttribute("href")).to.equal("https://example.com/login");
  });

  it("uses custom loginLabel when provided", async () => {
    const el = await fixture(
      html`<ge-header-public showLogin loginLabel="Se connecter"></ge-header-public>`
    );
    const label = el.shadowRoot.querySelector('.action-label');
    expect(label.textContent).to.include("Se connecter");
  });

  // --- Menu toggle tests ---

  it("toggles menu open/closed on button click", async () => {
    const el = await fixture(
      html`<ge-header-public showMenu></ge-header-public>`
    );
    const menuBtn = el.shadowRoot.querySelector('#menu-toggle');
    expect(menuBtn.getAttribute("aria-expanded")).to.equal("false");

    menuBtn.click();
    await el.updateComplete;

    expect(menuBtn.getAttribute("aria-expanded")).to.equal("true");

    const menuPanel = el.shadowRoot.querySelector("ge-header-public-menu");
    expect(menuPanel).to.exist;
    expect(menuPanel.open).to.be.true;
  });

  it("dispatches ge-menu-toggle event on menu toggle", async () => {
    const el = await fixture(
      html`<ge-header-public showMenu></ge-header-public>`
    );
    let eventDetail = null;
    el.addEventListener("ge-menu-toggle", (e) => {
      eventDetail = e.detail;
    });

    const menuBtn = el.shadowRoot.querySelector('#menu-toggle');
    menuBtn.click();
    await el.updateComplete;

    expect(eventDetail).to.deep.equal({ open: true });
  });

  // --- Menu data tests ---

  it("renders menu with default data", async () => {
    const el = await fixture(
      html`<ge-header-public showMenu></ge-header-public>`
    );
    const menuPanel = el.shadowRoot.querySelector("ge-header-public-menu");
    expect(menuPanel).to.exist;
    expect(menuPanel.menuData.quickAccess.length).to.be.greaterThan(0);
    expect(menuPanel.menuData.sections.length).to.be.greaterThan(0);
  });

  it("accepts custom menuData", async () => {
    const customData = {
      quickAccess: [{ label: "Test", url: "https://test.com" }],
      sections: [{ title: "Custom", links: [{ label: "Link", url: "https://link.com" }] }],
    };
    const el = await fixture(
      html`<ge-header-public showMenu .menuData=${customData}></ge-header-public>`
    );
    const menuPanel = el.shadowRoot.querySelector("ge-header-public-menu");
    expect(menuPanel.menuData.quickAccess[0].label).to.equal("Test");
    expect(menuPanel.menuData.sections[0].title).to.equal("Custom");
  });

  // --- No actions when both off ---

  it("does not render header-actions when both showMenu and showLogin are false", async () => {
    const el = await fixture(
      html`<ge-header-public></ge-header-public>`
    );
    const actions = el.shadowRoot.querySelector(".header-actions");
    expect(actions).to.be.null;
  });
});
