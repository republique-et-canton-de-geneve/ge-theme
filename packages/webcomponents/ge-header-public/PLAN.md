# ge-header-public — Refactoring Plan

Code review findings and improvement plan for the `ge-header-public` component.
Each task is self-contained and can be implemented independently (unless noted).

---

## P1 — Accessibility (Critical)

These issues directly affect screen reader users (JAWS, NVDA, VoiceOver) and violate WCAG 2.1 AA.

### A1. Add `aria-haspopup` to the menu button

**File:** `src/ge-header-public.js` — `_renderMenuButton()` (line 265)
**WCAG:** 4.1.2 Name, Role, Value

The menu button has `aria-expanded` but lacks `aria-haspopup="true"`.
Without it, JAWS announces "Menu, button" instead of "Menu, menu button, collapsed".
Screen reader users won't know this button opens a popup before pressing it.

**Fix:** Add `aria-haspopup="true"` to the `<button>`:
```html
<button
    class=${classMap(btnClasses)}
    @click=${this._toggleMenu}
    aria-label=${this._menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded=${this._menuOpen}
    aria-haspopup="true"
>
```

---

### A2. Add `aria-hidden="true"` to all decorative SVGs

**File:** `src/ge-header-public.js` — lines 250-252, 272-277
**WCAG:** 1.1.1 Non-text Content

The inline SVGs (menu hamburger, close X, login arrow) lack `aria-hidden="true"`.
Some screen readers attempt to announce SVG content or emit an unlabeled "image" announcement.
Every decorative icon already covered by a text label or `aria-label` must be hidden from AT.

**Fix:** Add `aria-hidden="true"` to each `<svg>`:
```html
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
```

Applies to all three SVGs in `_renderMenuButton()` and `_renderLoginButton()`.

---

### A3. Fix heading hierarchy in the menu panel

**File:** `src/ge-header-public-menu.js` — lines 238, 253, 267
**WCAG:** 1.3.1 Info and Relationships, 2.4.6 Headings and Labels

Current structure:
- "Accès rapide" → `<span>` (invisible to heading navigation)
- "Thématiques" → `<p>` (invisible to heading navigation)
- "A la une", "Démarches", etc. → `<h3>` (no preceding `<h2>`)

JAWS users navigate by pressing `H` to jump between headings. They will jump to `<h3>` column titles directly and have no way to discover the two major section groupings.

**Fix:** Change "Accès rapide" and "Thématiques" to `<h2>`, keep column titles as `<h3>`:
```html
<!-- quick-access section -->
<h2 class="section-title section-title--medium">Accès rapide</h2>

<!-- thematiques section -->
<h2 class="section-title section-title--medium thematiques-header">Thématiques</h2>

<!-- column titles remain <h3> -->
<h3 class="thematique-title">${section.title}</h3>
```

Add `margin: 0` to the `<h2>` styles to preserve current spacing.

---

### A4. Add `aria-hidden="true"` to the scrim overlay

**File:** `src/ge-header-public-menu.js` — line 233
**WCAG:** 4.1.2 Name, Role, Value

The scrim `<div class="scrim" @click=${this._close}>` is purely visual (dims the background) but is exposed to the accessibility tree. Screen reader users may encounter it as an unnamed interactive element while tabbing or navigating.

**Fix:**
```html
<div class="scrim" @click=${this._close} aria-hidden="true"></div>
```

The scrim click is a convenience shortcut. The accessible way to close the menu is the Escape key (already implemented) or the close button.

---

### A5. Replace hand-rolled focus trap with `m3e-focus-trap`

**File:** `src/ge-header-public.js` — `_handleKeydown()` (lines 165-199)
**WCAG:** 2.4.3 Focus Order

The current focus trap manually compares `shadowRoot.activeElement` with a flat list of focusable elements. This is fragile because:
- `m3e-button` has its own Shadow DOM; focus inside it may not match the host element depending on browser behavior
- If any future element has nested Shadow DOM (e.g., wrapping an `m3e-icon-button`), the comparison silently fails
- Edge cases like focus on `md-divider` (which shouldn't receive focus but appears in the selector) are not handled

The m3e library provides `m3e-focus-trap` (`@m3e/web/core/a11y/FocusTrapElement`) which:
- Handles arbitrary Shadow DOM depth via `M3eInteractivityChecker.isFocusable()`
- Uses two invisible sentinel `<div>` elements at the start/end for circular Tab cycling
- Marks sentinels as `aria-hidden="true"` and sets them `inert` when disabled
- Works correctly with slotted content

**Fix:** Wrap the menu panel content in `<m3e-focus-trap>` and remove the manual `_handleKeydown` Tab logic:

```js
// In ge-header-public-menu.js render():
import "@m3e/web/core/a11y/focus-trap.js"; // verify exact import path

return html`
  <div class="scrim" @click=${this._close} aria-hidden="true"></div>
  <m3e-focus-trap .disabled=${!this.open}>
    <nav class=${classMap(panelClasses)} aria-label="Menu principal">
      ...
    </nav>
  </m3e-focus-trap>
`;
```

Then in `ge-header-public.js`, simplify `_handleKeydown` to only handle Escape:
```js
_handleKeydown(event) {
    if (event.key === "Escape" && this._menuOpen) {
        this._closeMenu();
    }
}
```

**Note:** The menu toggle button is outside the menu component, so it must be included in the trap. Either:
- (a) Move the focus trap to the parent and wrap both button + menu, or
- (b) Keep the manual inclusion of the menu button in the Tab cycle (less clean but simpler)

Test with JAWS + Chrome and NVDA + Firefox to verify Tab cycling includes the menu button.

---

### A6. Warn users about the logo link opening in a new window

**File:** `src/ge-header-public.js` — line 296
**WCAG:** 3.2.5 Change on Request (Level AAA, but strongly recommended)

```html
<a href="https://www.ge.ch/" class="logo-section" target="gech">
```

`target="gech"` opens the link in a named window. Screen readers do not announce this.
Users are surprised when their browser context changes unexpectedly.

**Option A — Remove the target (recommended):**
```html
<a href="https://www.ge.ch/" class="logo-section">
```

**Option B — Add a visually-hidden warning:**
```html
<a href="https://www.ge.ch/" class="logo-section" target="gech">
    <img ... />
    <span class="title">ge.ch</span>
    <span class="visually-hidden">(s'ouvre dans une nouvelle fenêtre)</span>
</a>
```

With the corresponding CSS:
```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

### A7. Remove redundant `role="navigation"` on `<nav>`

**File:** `src/ge-header-public-menu.js` — line 234
**WCAG:** 4.1.2 (minor)

```html
<nav class=${classMap(panelClasses)} role="navigation" aria-label="Menu principal">
```

The `<nav>` element already has an implicit `navigation` role. The explicit `role="navigation"` is redundant and some screen readers may announce the landmark twice.

**Fix:** Remove `role="navigation"`:
```html
<nav class=${classMap(panelClasses)} aria-label="Menu principal">
```

---

### A8. Add `prefers-reduced-motion` override

**File:** `src/ge-header-public.js` — line 53
**WCAG:** 2.3.3 Animation from Interactions (Level AAA)

```css
.header {
    transition: width 0.3s ease;
}
```

Users who set `prefers-reduced-motion: reduce` in their OS settings still see this animation.

**Fix:** Add a media query to the component styles:
```css
@media (prefers-reduced-motion: reduce) {
    .header {
        transition: none;
    }
}
```

---

### A9. Add keyboard and focus management tests

**File:** `test/ge-header-public.test.js`

Current tests cover rendering and events but have zero coverage for:
- Escape key closing the menu
- Tab focus trapping within the menu
- Focus moving to first menu element on open
- Focus returning to the menu button on close

These are the most fragile behaviors and the most likely to regress.

**Tests to add:**
```js
it("closes menu on Escape key", async () => {
    const el = await fixture(html`<ge-header-public showMenu></ge-header-public>`);
    // Open the menu
    el.shadowRoot.querySelector('.action-button[aria-expanded]').click();
    await el.updateComplete;
    expect(el._menuOpen).to.be.true;

    // Press Escape
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    expect(el._menuOpen).to.be.false;
});

it("moves focus to first focusable element on menu open", async () => {
    const el = await fixture(html`<ge-header-public showMenu></ge-header-public>`);
    el.shadowRoot.querySelector('.action-button[aria-expanded]').click();
    await el.updateComplete;

    const menuEl = el.shadowRoot.querySelector('ge-header-public-menu');
    await menuEl.updateComplete;
    const focusable = menuEl.getFocusableElements();
    // Verify focus moved into the menu
    expect(focusable.length).to.be.greaterThan(0);
    // Note: exact activeElement check depends on Shadow DOM focus delegation
});

it("returns focus to menu button on close", async () => {
    const el = await fixture(html`<ge-header-public showMenu></ge-header-public>`);
    const menuBtn = el.shadowRoot.querySelector('.action-button[aria-expanded]');
    menuBtn.click();
    await el.updateComplete;

    // Close via Escape
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await el.updateComplete;
    await el.updateComplete; // wait for focus restoration

    expect(el.shadowRoot.activeElement).to.equal(menuBtn);
});
```

---

## P2 — Material Design 3 Compliance & m3e Simplification

### M1. Replace custom action buttons with m3e components

**File:** `src/ge-header-public.js` — `_renderMenuButton()`, `_renderLoginButton()`, and the `.action-button` CSS block (lines 83-123)

The menu and login buttons are fully hand-rolled with custom CSS. They lack:
- **State layers** — MD3 requires semi-transparent overlays on hover (8% opacity), focus (10%), and press (10%). Currently only the `color` changes on hover.
- **Ripple effect** — expected MD3 touch feedback
- **Focus ring** — uses a basic CSS `outline` instead of MD3's proper focus ring with offset and shape tokens
- **High contrast mode** — no `forced-colors` media query

**Fix — Menu button:** Replace with `m3e-icon-button`:
```js
import "@m3e/web/icon-button";

_renderMenuButton() {
    if (!this.showMenu) return nothing;
    return html`
        <m3e-icon-button
            aria-label=${this._menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded=${this._menuOpen}
            aria-haspopup="true"
            @click=${this._toggleMenu}
        >
            <m3e-icon>${this._menuOpen ? 'close' : 'menu'}</m3e-icon>
        </m3e-icon-button>
        <!-- Keep the "Menu" label below if desired, or use m3e-button with icon slot -->
    `;
}
```

**Note:** The current design has icon + text label stacked vertically (icon above, "Menu" below). `m3e-icon-button` is icon-only. If the text label must be preserved, use `m3e-button` with the `icon` slot instead, or keep a custom wrapper with just the label `<span>` below the `m3e-icon-button`. Evaluate which approach matches the design spec.

**Fix — Login button:** Replace with `m3e-button` with `href`:
```js
_renderLoginButton() {
    if (!this.showLogin) return nothing;
    return html`
        <m3e-button href=${this.loginUrl} variant="text">
            <m3e-icon slot="icon">login</m3e-icon>
            ${this.loginLabel}
        </m3e-button>
    `;
}
```

This removes ~40 lines of custom `.action-button` CSS. The `m3e-button` provides state layers, ripple, focus ring, high contrast, and proper link semantics (`<a>` rendered internally when `href` is set).

**Dependencies to add:**
```json
"@m3e/web": "^2.0.0"
```

Or individual packages `@m3e/icon-button`, `@m3e/icon` if tree-shaking by package is preferred.

**CSS to remove:** The entire `.action-button` block (lines 83-123) becomes unnecessary. Keep only layout styles for `.header-actions` gap and potential mobile label hiding.

---

### M2. Remove `@material/web` dependency — replace `md-divider`

**File:** `src/ge-header-public-menu.js` — line 5, and usage on lines 268, 287
**File:** `package.json` — line 50

The component imports `md-divider` from `@material/web` while everything else uses `@m3e/*`.
Mixing the two libraries:
- Increases bundle size (both register `--md-sys-*` custom properties)
- Creates potential token conflicts
- Adds a second dependency to track for updates

**Option A — Use a simple CSS border (recommended, simplest):**
```html
<!-- Replace <md-divider></md-divider> with: -->
<hr class="divider" />
```
```css
.divider {
    border: none;
    border-top: 1px solid var(--md-sys-color-outline-variant);
    margin: 0 0 var(--md-ref-spacings-3, 12px) 0;
}
```

**Option B — Use m3e divider if available:**
Check if `@m3e/web/divider` exists. If so:
```js
import "@m3e/web/divider";
// <m3e-divider></m3e-divider>
```

Then remove from `package.json`:
```diff
- "@material/web": "^2.4.1",
```

---

### M3. Use MD3 scrim color token

**File:** `src/ge-header-public-menu.js` — line 40

```css
.scrim {
    background: rgba(0, 0, 0, 0.32);
}
```

Hardcoded color. MD3 defines `--md-sys-color-scrim` for this purpose, ensuring correct behavior in light/dark themes.

**Fix:**
```css
.scrim {
    background: color-mix(in srgb, var(--md-sys-color-scrim, #000) 32%, transparent);
}
```

Or if `color-mix` browser support is a concern (it's well-supported since 2023):
```css
.scrim {
    background: var(--md-sys-color-scrim, #000);
    opacity: 0.32;
}
```

Note: the `opacity` approach makes the entire element transparent, which is fine since the scrim has no children.

---

## P3 — Code Quality & Maintainability

### C1. Remove redundant `requestUpdate()` calls

**File:** `src/ge-header-public.js` — lines 204, 230

```js
this._menuOpen = !this._menuOpen;
this.requestUpdate();  // <-- unnecessary
```

Setting a `@state()` property automatically schedules a Lit update. The explicit `requestUpdate()` is redundant and misleading (implies Lit wouldn't update otherwise).

**Fix:** Delete both `this.requestUpdate();` lines (in `_toggleMenu` and `_closeMenu`).

---

### C2. Only attach global listeners when the menu is open

**File:** `src/ge-header-public.js` — `connectedCallback` / `disconnectedCallback` (lines 143-155)

Currently, `document` listeners for `click` and `keydown` are attached in `connectedCallback` and remain active for the entire component lifetime — even when the menu is closed. Every click and keypress on the page runs through `_handleOutsideClick` and `_handleKeydown` (which bail early, but still execute).

**Fix:** Attach listeners when the menu opens, remove when it closes:

```js
connectedCallback() {
    super.connectedCallback();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    // Don't attach here — attach in _toggleMenu / _closeMenu
}

disconnectedCallback() {
    super.disconnectedCallback();
    // Ensure cleanup if component is removed while menu is open
    this._removeGlobalListeners();
}

_addGlobalListeners() {
    document.addEventListener("click", this._handleOutsideClick);
    document.addEventListener("keydown", this._handleKeydown);
}

_removeGlobalListeners() {
    document.removeEventListener("click", this._handleOutsideClick);
    document.removeEventListener("keydown", this._handleKeydown);
}

_toggleMenu() {
    this._menuOpen = !this._menuOpen;
    if (this._menuOpen) {
        this._addGlobalListeners();
    } else {
        this._removeGlobalListeners();
    }
    // ... rest of the method
}

_closeMenu() {
    if (!this._menuOpen) return;
    this._menuOpen = false;
    this._removeGlobalListeners();
    // ... rest of the method
}
```

---

### C3. Unify close events

**Files:** `src/ge-header-public.js`, `src/ge-header-public-menu.js`

When the scrim is clicked, two events fire:
1. `ge-header-public-menu` dispatches `ge-menu-close` (line 305 of menu)
2. Parent catches it, then dispatches `ge-menu-toggle` with `{ open: false }` (line 231 of header)

Consumers listening on the host element see both `ge-menu-close` (bubbled from child) and `ge-menu-toggle`. This is confusing — two events for one action.

**Fix:** Remove `ge-menu-close` from the menu sub-component. Instead, have the menu call a callback or let the parent handle close entirely:

Option A — Parent-driven close (recommended):
- The menu never sets its own `open` property or dispatches events
- The scrim click dispatches a simple internal event (e.g. `_request-close`)
- The parent handles it in `_closeMenu()`, which is the single source of truth

Option B — Keep `ge-menu-close` but stop dispatching `ge-menu-toggle` on close:
- Less disruptive, but consumers must listen to two different events

---

### C4. Improve `maxWidth` property API

**File:** `src/ge-header-public.js` — line 11, lines 285-289

Current API:
- `maxWidth="true"` → full width (counterintuitive: "max width is true" sounds constrained)
- `maxWidth="false"` → constrained to 1107px
- `maxWidth="1107px"` → constrained to 1107px

The string `"true"` / `"false"` acting as a Boolean is confusing and error-prone. `maxWidth="false"` and `maxWidth="1107px"` produce the same result, so the pixel value is meaningless.

**Option A — Boolean `fullWidth` (recommended):**
```js
@property({ type: Boolean }) fullWidth = true;
```
Usage: `<ge-header-public fullWidth>` or `<ge-header-public>` (default full) vs `<ge-header-public .fullWidth=${false}>`.

**Option B — String with only meaningful values:**
```js
@property({ type: String }) maxWidth = "none"; // "none" | "1107px"
```

**Note:** This is a breaking API change. If existing consumers use `maxWidth="true"`, a deprecation period may be needed. Add a `updated()` lifecycle hook that warns:
```js
updated(changed) {
    if (changed.has('maxWidth') && (this.maxWidth === 'true' || this.maxWidth === 'false')) {
        console.warn('ge-header-public: maxWidth="true"/"false" is deprecated. Use fullWidth boolean property.');
    }
}
```

---

### C5. Make the logo URL configurable

**File:** `src/ge-header-public.js` — line 298

```html
<img src="https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg" ... />
```

The logo URL is hardcoded to the CDN. This prevents:
- Using a different logo in staging/dev environments
- Supporting dark-mode logo variants (the filename says "light")
- Custom branding for sub-entities

**Fix:** Add an optional property with the current URL as default:
```js
@property({ type: String }) logoUrl = "https://static.app.ge.ch/theme/icons/common/header/header-armoiries-light.svg";
```

Also consider dark mode: if a `header-armoiries-dark.svg` exists, the component should switch based on the active theme. This could be a follow-up task.

---

### C6. Fix focus return selector robustness

**File:** `src/ge-header-public.js` — line 239

```js
const menuButton = this.shadowRoot?.querySelector('button.action-button');
```

This selector picks the first `<button>` with class `action-button`. If a future change adds another button (or reorders login/menu), it could focus the wrong element.

**Fix — Use a dedicated ID or ref:**
```html
<button id="menu-toggle" class=${classMap(btnClasses)} ...>
```
```js
const menuButton = this.shadowRoot?.querySelector('#menu-toggle');
```

Or use Lit's `createRef()`:
```js
import { createRef, ref } from "lit/directives/ref.js";

_menuButtonRef = createRef();

// In template:
<button ${ref(this._menuButtonRef)} ...>

// In _closeMenu:
this._menuButtonRef.value?.focus();
```

---

## P4 — m3e Components: What NOT to Use

These m3e components were evaluated and **should NOT replace** the current implementation:

| m3e Component | Reason |
|---|---|
| `m3e-menu` | Designed for action/context menus (right-click, dropdown). The current mega-menu with sections, columns, quick-access buttons is a fundamentally different UX pattern. Forcing it into `m3e-menu` would degrade usability. |
| `m3e-app-bar` | Could technically replace the header bar, but the current layout (logo + title on left, action buttons on right) is simpler than what `m3e-app-bar` is designed for (scroll elevation, medium/large sizes). Adding it would increase complexity without benefit. |
| `m3e-nav-menu` | Tree navigation sidebar (`role="tree"`). Not suitable for a mega-menu dropdown. Semantically wrong for this use case. |
| `m3e-drawer-container` | Would change UX from a dropdown panel to a side drawer. Could be a valid **mobile-only** alternative (future enhancement), but should not replace the desktop mega-menu. |
| `m3e-nav-bar` / `m3e-nav-rail` | Bottom/side navigation patterns for app-level navigation. Not relevant for a website header. |

---

## Implementation Order (Suggested)

The tasks are grouped by risk and dependency. Each step can be a separate commit.

| Order | Task | Impact | Risk |
|---|---|---|---|
| 1 | A1 — `aria-haspopup` | High a11y | Trivial, one-line |
| 2 | A2 — `aria-hidden` on SVGs | High a11y | Trivial, three SVGs |
| 3 | A4 — `aria-hidden` on scrim | Medium a11y | Trivial, one-line |
| 4 | A7 — Remove redundant `role` | Low a11y | Trivial, one-line |
| 5 | A8 — `prefers-reduced-motion` | Low a11y | Trivial, CSS-only |
| 6 | A3 — Fix heading hierarchy | High a11y | Low risk, HTML change + CSS tweak |
| 7 | A6 — Logo link target warning | Medium a11y | Low risk, decide option A or B |
| 8 | C1 — Remove `requestUpdate()` | Low quality | Trivial, verify tests pass |
| 9 | C2 — Lazy global listeners | Medium perf | Low risk, needs careful testing |
| 10 | C6 — Fix focus return selector | Low robustness | Low risk, add id or ref |
| 11 | M3 — Scrim color token | Low MD3 | Trivial, CSS-only |
| 12 | M2 — Remove `@material/web` | Medium bundle | Medium risk, test visual regression |
| 13 | M1 — Replace buttons with m3e | High MD3 | Medium risk, largest visual change, verify design spec |
| 14 | C3 — Unify close events | Medium API | Medium risk, potential breaking change |
| 15 | A5 — Replace focus trap with m3e | High a11y | Medium risk, verify import path and Shadow DOM behavior |
| 16 | C4 — Improve `maxWidth` API | Medium API | High risk, breaking change, needs deprecation |
| 17 | C5 — Configurable logo URL | Low flexibility | Low risk but scope creep potential (dark mode) |
| 18 | A9 — Add keyboard/focus tests | High quality | No risk, additive only |
