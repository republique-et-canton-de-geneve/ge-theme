import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import "../src/ge-autres-demarches.js";

describe("ge-autres-espaces", () => {
  const mockItems = [
    { title: "Espace A", url: "https://a.ge.ch", target: "_blank" },
    { title: "Espace B", url: "https://b.ge.ch" },
  ];

  it("is defined as a custom element", () => {
    expect(customElements.get("ge-autres-espaces")).to.exist;
  });

  it("renders a container with navigation role", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const container = el.shadowRoot.querySelector('[role="navigation"]');
    expect(container).to.exist;
  });

  // ---------- Title ----------

  it("renders default title", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const title = el.shadowRoot.querySelector(".title");
    expect(title).to.exist;
    expect(title.textContent.trim()).to.equal("Mes autres espaces");
  });

  it("renders custom title", async () => {
    const el = await fixture(
      html`<ge-autres-espaces title="Mon titre"></ge-autres-espaces>`
    );
    const title = el.shadowRoot.querySelector(".title");
    expect(title.textContent.trim()).to.equal("Mon titre");
  });

  // ---------- Expand / Collapse ----------

  it("starts in expanded state", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    expect(el.expanded).to.be.true;
    const content = el.shadowRoot.querySelector(".content");
    expect(content.classList.contains("expanded")).to.be.true;
  });

  it("collapses on toggle button click", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const toggleBtn = el.shadowRoot.querySelector("md-icon-button");
    expect(toggleBtn).to.exist;

    toggleBtn.click();
    await el.updateComplete;

    expect(el.expanded).to.be.false;
    const content = el.shadowRoot.querySelector(".content");
    expect(content.classList.contains("expanded")).to.be.false;
  });

  it("expands again on second toggle click", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const toggleBtn = el.shadowRoot.querySelector("md-icon-button");

    toggleBtn.click();
    await el.updateComplete;
    toggleBtn.click();
    await el.updateComplete;

    expect(el.expanded).to.be.true;
  });

  it("updates aria-expanded on toggle", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const toggleBtn = el.shadowRoot.querySelector("md-icon-button");
    expect(toggleBtn.getAttribute("aria-expanded")).to.equal("true");

    toggleBtn.click();
    await el.updateComplete;

    expect(toggleBtn.getAttribute("aria-expanded")).to.equal("false");
  });

  // ---------- Items rendering ----------

  it("renders items from the items property", async () => {
    const el = await fixture(
      html`<ge-autres-espaces .items=${mockItems}></ge-autres-espaces>`
    );
    const listItems = el.shadowRoot.querySelectorAll("md-list-item");
    expect(listItems.length).to.equal(2);
  });

  it("renders item titles", async () => {
    const el = await fixture(
      html`<ge-autres-espaces .items=${mockItems}></ge-autres-espaces>`
    );
    const titles = el.shadowRoot.querySelectorAll(".item-title");
    expect(titles.length).to.equal(2);
    expect(titles[0].textContent.trim()).to.equal("Espace A");
    expect(titles[1].textContent.trim()).to.equal("Espace B");
  });

  // ---------- Events ----------

  it("dispatches compact-icon-click on apps icon click", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const appsIcon = el.shadowRoot.querySelector(".apps-icon");

    setTimeout(() => appsIcon.dispatchEvent(new Event("click", { bubbles: true })));
    const event = await oneEvent(el, "compact-icon-click");

    expect(event).to.exist;
    expect(event.detail.component).to.equal(el);
  });

  it("dispatches item-click on item click", async () => {
    const el = await fixture(
      html`<ge-autres-espaces .items=${mockItems}></ge-autres-espaces>`
    );

    // Stub window.open to prevent actual navigation
    const originalOpen = window.open;
    let openedUrl = null;
    window.open = (url) => { openedUrl = url; };

    const listItem = el.shadowRoot.querySelector("md-list-item");

    setTimeout(() => listItem.click());
    const event = await oneEvent(el, "item-click");

    expect(event).to.exist;
    expect(event.detail.item).to.deep.equal(mockItems[0]);

    window.open = originalOpen;
  });

  // ---------- Keyboard accessibility ----------

  it("dispatches compact-icon-click on Enter key", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const appsIcon = el.shadowRoot.querySelector(".apps-icon");

    setTimeout(() =>
      appsIcon.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      )
    );
    const event = await oneEvent(el, "compact-icon-click");
    expect(event).to.exist;
  });

  it("dispatches compact-icon-click on Space key", async () => {
    const el = await fixture(
      html`<ge-autres-espaces></ge-autres-espaces>`
    );
    const appsIcon = el.shadowRoot.querySelector(".apps-icon");

    setTimeout(() =>
      appsIcon.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true })
      )
    );
    const event = await oneEvent(el, "compact-icon-click");
    expect(event).to.exist;
  });

  // ---------- Empty state ----------

  it("renders no items when items is empty", async () => {
    const el = await fixture(
      html`<ge-autres-espaces .items=${[]}></ge-autres-espaces>`
    );
    const listItems = el.shadowRoot.querySelectorAll("md-list-item");
    expect(listItems.length).to.equal(0);
  });
});
