import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "../src/ge-header.js";

describe("ge-header", () => {
  const mockUserInfo = {
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@ge.ch",
    typeCompte: "PP",
  };

  it("is defined as a custom element", () => {
    expect(customElements.get("ge-header")).to.exist;
  });

  // ---------- maxWidth ----------

  it("applies maxwidth-formulaire when maxWidth='false'", async () => {
    const el = await fixture(
      html`<ge-header maxWidth="false"></ge-header>`
    );
    const div = el.shadowRoot.querySelector(".header");
    expect(div.classList.contains("maxwidth-formulaire")).to.be.true;
  });

  // ---------- Menu toggle ----------

  it("opens user menu on icon-container click", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    const iconContainer = el.shadowRoot.querySelector(".icon-container");

    iconContainer.click();
    await el.updateComplete;

    expect(el.isMenuOpen).to.be.true;
    const menu = el.shadowRoot.querySelector(".user-menu");
    expect(menu).to.exist;
  });

  it("closes user menu on second click", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    const iconContainer = el.shadowRoot.querySelector(".icon-container");

    iconContainer.click();
    await el.updateComplete;
    iconContainer.click();
    await el.updateComplete;

    expect(el.isMenuOpen).to.be.false;
  });

  it("displays user info in open menu", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );
    el.isMenuOpen = true;
    el.requestUpdate("isMenuOpen");
    await el.updateComplete;

    const name = el.shadowRoot.querySelector(".user-name");
    expect(name).to.exist;
    expect(name.textContent).to.include("Dupont");
    expect(name.textContent).to.include("Jean");

    const email = el.shadowRoot.querySelector(".user-email");
    expect(email).to.exist;
    expect(email.textContent).to.include("jean.dupont@ge.ch");
  });

  // ---------- getAccountType ----------

  it("returns 'personnel' for PP", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getAccountType("PP")).to.equal("personnel");
  });

  it("returns 'professionnel' for PM", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getAccountType("PM")).to.equal("professionnel");
  });

  it("returns 'administratif' for unknown type", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getAccountType("XX")).to.equal("administratif");
  });

  // ---------- getBadgeType ----------

  it("returns undefined for PP badge", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getBadgeType("PP")).to.be.undefined;
  });

  it("returns 'PRO' for PM badge", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getBadgeType("PM")).to.equal("PRO");
  });

  it("returns 'ADM' for unknown badge", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    expect(el.getBadgeType("XX")).to.equal("ADM");
  });

  // ---------- Events ----------

  it("dispatches ge-logout event", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );

    setTimeout(() => el.handleLogout());
    const event = await oneEvent(el, "ge-logout");

    expect(event).to.exist;
    expect(event.detail.userInfo).to.deep.equal(mockUserInfo);
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.true;
  });

  it("dispatches ge-manage-account event", async () => {
    const el = await fixture(
      html`<ge-header .userInfo=${mockUserInfo}></ge-header>`
    );

    setTimeout(() => el.handleManageAccount());
    const event = await oneEvent(el, "ge-manage-account");

    expect(event).to.exist;
    expect(event.detail.userInfo).to.deep.equal(mockUserInfo);
  });

  it("dispatches ge-toggle-app-menu on burger click", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);

    const fakeEvent = new Event("click", { bubbles: true });
    fakeEvent.stopPropagation = () => {};
    fakeEvent.preventDefault = () => {};

    setTimeout(() => el.handleBurgerClick(fakeEvent));
    const event = await oneEvent(el, "ge-toggle-app-menu");

    expect(event).to.exist;
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.true;
  });

  // ---------- Outside click ----------

  it("closes menu on outside click", async () => {
    const el = await fixture(html`<ge-header></ge-header>`);
    el.isMenuOpen = true;
    el.requestUpdate("isMenuOpen");
    await el.updateComplete;

    document.body.click();

    expect(el.isMenuOpen).to.be.false;
  });

  // ---------- Badge rendering ----------

  it("renders badge with account type", async () => {
    const pmUser = { ...mockUserInfo, typeCompte: "PM" };
    const el = await fixture(
      html`<ge-header .userInfo=${pmUser}></ge-header>`
    );
    const badge = el.shadowRoot.querySelector(".badge");
    expect(badge).to.exist;
    expect(badge.textContent.trim()).to.equal("PRO");
  });
});
