import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "../src/ge-header.js";

describe("ge-header", () => {
  const mockUserInfo = {
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@ge.ch",
    typeCompte: "PP",
  };

  // ---------- Element registration ----------

  it("is defined as a custom element", () => {
    expect(customElements.get("ge-header")).to.exist;
  });

  it("registers sub-components", () => {
    expect(customElements.get("ge-header-nav-menu")).to.exist;
    expect(customElements.get("ge-header-account-menu")).to.exist;
  });

  // ---------- Layout / fullWidth ----------

  it("applies maxwidth-full by default", async () => {
    const el = await fixture(html`<ge-header .userInfo=${mockUserInfo}></ge-header>`);
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-full")).to.be.true;
    expect(div.classList.contains("maxwidth-formulaire")).to.be.false;
  });

  it("applies maxwidth-formulaire when fullWidth is false", async () => {
    const el = await fixture(
      html`<ge-header .fullWidth=${false} .userInfo=${mockUserInfo}></ge-header>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
    expect(div.classList.contains("maxwidth-full")).to.be.false;
  });

  it("applies maxwidth-formulaire when maxWidth='false' (legacy)", async () => {
    const el = await fixture(
      html`<ge-header maxWidth="false" .userInfo=${mockUserInfo}></ge-header>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
  });

  it("applies maxwidth-formulaire when maxWidth='1107px' (legacy)", async () => {
    const el = await fixture(
      html`<ge-header maxWidth="1107px" .userInfo=${mockUserInfo}></ge-header>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
  });

  // ---------- Account button ----------

  it("always renders account button", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    expect(accountBtn).to.exist;
  });

  it("does not show badge for PP account", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const badge = el.shadowRoot.querySelector(".account-badge");
    expect(badge).to.be.null;
  });

  it("shows PRO badge for PM account", async () => {
    const pmUser = { ...mockUserInfo, typeCompte: "PM" };
    const el = await fixture(
      html`<ge-header .userInfo=${pmUser}></ge-header>`
    );
    const badge = el.shadowRoot.querySelector(".account-badge");
    expect(badge).to.exist;
    expect(badge.textContent.trim()).to.equal("PRO");
  });

  it("shows ADM badge for admin account", async () => {
    const admUser = { ...mockUserInfo, typeCompte: "ADM" };
    const el = await fixture(
      html`<ge-header .userInfo=${admUser}></ge-header>`
    );
    const badge = el.shadowRoot.querySelector(".account-badge");
    expect(badge).to.exist;
    expect(badge.textContent.trim()).to.equal("ADM");
  });

  // ---------- Account dropdown toggle ----------

  it("opens account dropdown on click", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;

    expect(el._accountOpen).to.be.true;
    expect(accountBtn.getAttribute("aria-expanded")).to.equal("true");
    const accountMenu = el.shadowRoot.querySelector("ge-header-account-menu");
    expect(accountMenu).to.exist;
    expect(accountMenu.open).to.be.true;
  });

  it("closes account dropdown on second click", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;
    accountBtn.click();
    await el.updateComplete;

    expect(el._accountOpen).to.be.false;
    expect(accountBtn.getAttribute("aria-expanded")).to.equal("false");
  });

  it("dispatches ge-account-toggle event", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    let eventDetail = null;
    el.addEventListener("ge-account-toggle", (e) => {
      eventDetail = e.detail;
    });

    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;

    expect(eventDetail).to.deep.equal({ open: true });
  });

  // ---------- User info display in account menu ----------

  it("passes userInfo to account menu", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountMenu = el.shadowRoot.querySelector("ge-header-account-menu");
    expect(accountMenu.userInfo).to.deep.equal(mockUserInfo);
  });

  // ---------- Nav menu ----------

  it("does not show menu button by default", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    expect(menuBtn).to.be.null;
  });

  it("shows menu button when showMenu is set", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    expect(menuBtn).to.exist;
  });

  it("toggles nav menu open/closed", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    expect(menuBtn.getAttribute("aria-expanded")).to.equal("false");

    menuBtn.click();
    await el.updateComplete;

    expect(menuBtn.getAttribute("aria-expanded")).to.equal("true");
    const navMenu = el.shadowRoot.querySelector("ge-header-nav-menu");
    expect(navMenu).to.exist;
    expect(navMenu.open).to.be.true;
  });

  it("dispatches ge-menu-toggle event", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    let eventDetail = null;
    el.addEventListener("ge-menu-toggle", (e) => {
      eventDetail = e.detail;
    });

    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.click();
    await el.updateComplete;

    expect(eventDetail).to.deep.equal({ open: true });
  });

  it("renders nav menu with default data", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    const navMenu = el.shadowRoot.querySelector("ge-header-nav-menu");
    expect(navMenu).to.exist;
    expect(navMenu.menuData.quickAccess.length).to.be.greaterThan(0);
    expect(navMenu.menuData.sections.length).to.be.greaterThan(0);
  });

  it("accepts custom menuData", async () => {
    const customData = {
      quickAccess: [{ label: "Test", url: "https://test.com" }],
      sections: [{ title: "Custom", links: [{ label: "Link", url: "https://link.com" }] }],
    };
    const el = await fixture(
      html`<ge-header showMenu .menuData=${customData} .userInfo=${mockUserInfo}></ge-header>`
    );
    const navMenu = el.shadowRoot.querySelector("ge-header-nav-menu");
    expect(navMenu.menuData.quickAccess[0].label).to.equal("Test");
    expect(navMenu.menuData.sections[0].title).to.equal("Custom");
  });

  // ---------- Mutual exclusion ----------

  it("closes account menu when opening nav menu", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    // Open account first
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;
    expect(el._accountOpen).to.be.true;

    // Open nav menu
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.click();
    await el.updateComplete;

    expect(el._menuOpen).to.be.true;
    expect(el._accountOpen).to.be.false;
  });

  it("closes nav menu when opening account menu", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    // Open nav menu first
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.click();
    await el.updateComplete;
    expect(el._menuOpen).to.be.true;

    // Open account menu
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;

    expect(el._accountOpen).to.be.true;
    expect(el._menuOpen).to.be.false;
  });

  // ---------- Events (from account menu) ----------

  it("dispatches ge-logout event from account menu", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountMenu = el.shadowRoot.querySelector("ge-header-account-menu");

    setTimeout(() => accountMenu._handleLogout());
    const event = await oneEvent(el, "ge-logout");

    expect(event).to.exist;
    expect(event.detail.userInfo).to.deep.equal(mockUserInfo);
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.true;
  });

  it("dispatches ge-manage-account event from account menu", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountMenu = el.shadowRoot.querySelector("ge-header-account-menu");

    const fakeEvent = new Event("click", { bubbles: true });
    fakeEvent.preventDefault = () => {};

    setTimeout(() => accountMenu._handleManageAccount(fakeEvent));
    const event = await oneEvent(el, "ge-manage-account");

    expect(event).to.exist;
    expect(event.detail.userInfo).to.deep.equal(mockUserInfo);
  });

  // ---------- Outside click ----------

  it("closes all menus on outside click", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    // Open account menu
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;
    expect(el._accountOpen).to.be.true;

    // Click outside
    document.body.click();
    await el.updateComplete;

    expect(el._accountOpen).to.be.false;
  });

  // ---------- Escape key ----------

  it("closes all menus on Escape key", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    // Open nav menu
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.click();
    await el.updateComplete;
    expect(el._menuOpen).to.be.true;

    // Press Escape
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;

    expect(el._menuOpen).to.be.false;
  });

  // ---------- ARIA attributes ----------

  it("has correct ARIA attributes on account button", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    expect(accountBtn.getAttribute("role")).to.equal("button");
    expect(accountBtn.getAttribute("tabindex")).to.equal("0");
    expect(accountBtn.getAttribute("aria-haspopup")).to.equal("true");
    expect(accountBtn.getAttribute("aria-expanded")).to.equal("false");
    expect(accountBtn.getAttribute("aria-label")).to.include("compte");
  });

  it("has correct ARIA attributes on menu button", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    expect(menuBtn.getAttribute("role")).to.equal("button");
    expect(menuBtn.getAttribute("tabindex")).to.equal("0");
    expect(menuBtn.getAttribute("aria-haspopup")).to.equal("true");
    expect(menuBtn.getAttribute("aria-expanded")).to.equal("false");
    expect(menuBtn.getAttribute("aria-label")).to.include("menu");
  });

  // ---------- Enter/Space key on toggles ----------

  it("opens account menu on Enter key", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;

    expect(el._accountOpen).to.be.true;
  });

  it("opens account menu on Space key", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await el.updateComplete;

    expect(el._accountOpen).to.be.true;
  });

  it("opens nav menu on Enter key", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;

    expect(el._menuOpen).to.be.true;
  });

  // ---------- Scrim ----------

  it("shows scrim only when nav menu is open", async () => {
    const el = await fixture(
      html`<ge-header showMenu .userInfo=${mockUserInfo}></ge-header>`
    );
    let scrim = el.shadowRoot.querySelector(".scrim");
    expect(scrim.classList.contains("scrim--visible")).to.be.false;

    // Open nav menu
    const menuBtn = el.shadowRoot.querySelector("#menu-toggle");
    menuBtn.click();
    await el.updateComplete;

    scrim = el.shadowRoot.querySelector(".scrim");
    expect(scrim.classList.contains("scrim--visible")).to.be.true;
  });

  it("does not show scrim when account menu is open", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    const accountBtn = el.shadowRoot.querySelector("#account-toggle");
    accountBtn.click();
    await el.updateComplete;

    const scrim = el.shadowRoot.querySelector(".scrim");
    expect(scrim.classList.contains("scrim--visible")).to.be.false;
  });
});
