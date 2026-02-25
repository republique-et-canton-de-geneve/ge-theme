# Web Components GE Theme

Ce package fournit une bibliothèque de composants Web (Web Components) réutilisables construits avec [Lit](https://lit.dev) pour les sites et applications de l'État de Genève. Il inclut les composants suivants :

- `<ge-header>` : En-tête avec gestion de l'utilisateur connecté.
- `<ge-header-public>` : En-tête public (sans authentification).
- `<ge-footer>` : Pied de page avec liens institutionnels et armoiries.
- `<ge-header-armoiries>` : Armoiries SVG pour l'en-tête.
- `<ge-footer-armoiries>` : Armoiries SVG pour le pied de page.
- `<ge-consent>` : Consentement cookies pour le tracking Matomo.
- `<ge-televerse>` : Téléversement de documents via QR code.

## Gestion des versions pour les webcomponents

[Voir la documentation ici](/packages/webcomponents/README.md)

---

## Intégration des Web Components via Static

Cette procédure décrit comment intégrer directement les Web Components et les feuilles de style hébergés sur les serveurs `static` de l'État de Genève.

### Références aux CSS

Ajoutez les feuilles de style suivantes dans la balise `<head>` de votre application :

Par défaut :
```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
```

Si l'application supporte uniquement le thème clair (forcer le thème clair) :
```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
```

Si l'application supporte l'affichage système clair et sombre :
```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
```

Si l'application propose une option d'affichage clair et sombre :
```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
```

Si l'application supporte uniquement le thème sombre (forcer le thème sombre) :
```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
```

### Ajout des Web Components via `<script type="module">`

> Par défaut, les URL de production (`static.app.ge.ch`) sont à utiliser en DEV/REC et PRD.
> Pour tester d'éventuelles montées de version, les URL de DEV ou REC peuvent être utilisées :
>
> | Environnement | URL |
> |---------------|-----|
> | Production    | `https://static.app.ge.ch` |
> | Recette       | `https://static.rec.etat-ge.ch` |
> | Développement | `https://static.dev.etat-ge.ch` |

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header/latest/ge-header.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-consent/latest/ge-consent.js"></script>
```

### Intégration sur une page HTML

Pour les applications avec contenus pleine largeur (ex : Mon espace e-démarches) :
```html
<ge-header-public></ge-header-public>
<main>...</main>
<ge-footer></ge-footer>
```

Pour les applications avec marges sur le contenu (ex : Formulaires e-démarches) :
```html
<ge-header-public maxWidth="false"></ge-header-public>
<main>...</main>
<ge-footer maxwidth="false"></ge-footer>
```

---

## Installation et développement

```bash
yarn install       # Installer les dépendances
yarn dev           # Lancer le mode développement (tous les packages en parallèle)
yarn build         # Build de tous les packages
yarn lint          # Linter tous les packages
yarn format        # Formatter tous les fichiers avec Prettier
yarn test          # Lancer les tests unitaires
```

---

## Liste des composants

### `<ge-header>`

En-tête avec gestion de l'utilisateur connecté et menu de compte.

- **Props** :
    - `userInfo` (Object) : objet contenant `nom`, `prenom`, `email`, `typeCompte` (`PP`, `PM`, `ADM`)
    - `isMenuOpen` (Boolean) : afficher/masquer le menu utilisateur
    - `maxWidth` (String) : `"true"` = pleine largeur (défaut), `"false"` ou `"1107px"` = avec marges
- **Événements** :
    - `ge-toggle-app-menu` : déclenché lors du clic sur le menu burger (mobile)
    - `ge-manage-account` : déclenché lors du clic sur « Gérer mon compte ». `detail: { userInfo }`
    - `ge-logout` : déclenché lors du clic sur « Se déconnecter ». `detail: { userInfo }`

### `<ge-header-public>`

En-tête public sans authentification, avec logo et lien vers ge.ch.

- **Props** :
    - `maxWidth` (String) : `"true"` = pleine largeur (défaut), `"false"` ou `"1107px"` = avec marges

### `<ge-footer>`

Pied de page avec liens institutionnels, support multilingue et détection automatique du thème.

- **Props** :
    - `maxwidth` (Boolean) : `true` = pleine largeur (défaut), `false` = contraint à 1107px
    - `links` (Array) : tableau JSON de liens personnalisés `[{"title":"...","href":"..."}]`. Remplace les liens par défaut si fourni.
    - `contactLink` (String) : URL du lien Contact (défaut : `https://www.ge.ch/c/footer-edm-aide`)
    - `accessibilityLink` (String) : URL du lien Accessibilité (défaut : `https://www.ge.ch/c/footer-edm-accessibilite`)
    - `privacyLink` (String) : URL du lien Confidentialité (défaut : `https://www.ge.ch/c/footer-edm-confidentialite`)
    - `termsLink` (String) : URL du lien CGU (défaut : `https://www.ge.ch/c/footer-edm-cgu`)
    - `locale` (String) : langue (`fr`, `en`, `es`, `pt`). Par défaut, hérite de l'attribut `lang` du document.
    - `theme` (String) : `"light"` ou `"dark"`. Par défaut, détecte la préférence système via `prefers-color-scheme`.
- **Événements** :
    - `ge-footer-image-click` : déclenché lors du clic sur les armoiries. `detail: { originalEvent }`

### `<ge-header-armoiries>` / `<ge-footer-armoiries>`

Composants SVG affichant les armoiries de la République et canton de Genève (variantes en-tête et pied de page).

- **Attributs** :
    - `variant` : `"light"` (défaut) ou `"dark"`
    - `width` / `height` : dimensions du SVG (le ratio est préservé automatiquement)
    - `onClick` : nom d'une fonction globale à appeler au clic

### `<ge-consent>`

Boîte de dialogue de consentement pour les cookies de tracking Matomo (Matomo Tag Manager).

S'affiche automatiquement si aucun consentement n'a été donné (absence des cookies `mtm_consent` / `mtm_consent_removed`).

- **Méthodes** :
    - `show()` : ouvre la boîte de dialogue programmatiquement
    - `reset()` : efface les cookies de consentement et réouvre la boîte de dialogue
- **Événements** :
    - `consent` : déclenché après le choix de l'utilisateur. `detail: { granted: boolean }`

### `<ge-televerse>`

Composant de téléversement de documents via QR code avec suivi en temps réel (Server-Sent Events).

- **Attributs** :
    - `api-base-url` (String) : URL de base de l'API backend (défaut : `/api`)
    - `user-id` (String) : identifiant de l'utilisateur
    - `form-id` (String) : identifiant du formulaire
    - `document-type` (String) : type de document (ex : `ID_CARD`, `PROOF_OF_ADDRESS`)
- **Événements** :
    - `televerse-ready` : session créée, QR code affiché. `detail: { token, uploadUrl }`
    - `televerse-upload` : un fichier a été téléversé. `detail: { documentId, fileName }`
    - `televerse-complete` : téléversement finalisé. `detail: { documentId, pageCount }`
    - `televerse-error` : une erreur est survenue. `detail: { message }`
    - `televerse-expired` : la session a expiré

---

## Intégration dans les frameworks

> **Important** : Les composants Lit ne sont pas automatiquement réactifs aux changements de props dans certains frameworks comme Vue, React ou Angular.
> Il faut **manuellement mettre à jour** les propriétés et appeler `requestUpdate()` sur les composants concernés.

### Vue 3

Installer la dépendance du composant souhaité :

```bash
yarn add @ael/ge-header
```

Utilisation dans un composant Vue :

```vue
<template>
  <ge-header
    :userInfo="userStore.getters.utilisateur()"
    :isMenuOpen="isMenuOpen"
    ref="headerRef"
    @ge-toggle-app-menu="miniVariant = !miniVariant"
  ></ge-header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { userStore } from '@/stores/user';
import '@ael/ge-header';

const headerRef = ref(null);
const isMenuOpen = ref(false);
const miniVariant = ref(false);

watch(
  () => userStore.getters.utilisateur(),
  (newUser) => {
    if (headerRef.value) {
      headerRef.value.userInfo = newUser;
      headerRef.value.requestUpdate();
    }
  },
  { immediate: true, deep: true }
);
</script>
```

### React

1. Installer et importer le composant dans `index.js` ou `App.js` :

```jsx
import '@ael/ge-header';
```

2. Utiliser dans le JSX :

```jsx
<ge-header ref={headerRef} isMenuOpen={true}></ge-header>
```

3. Mettre à jour les props manuellement :

```jsx
import { useEffect, useRef } from 'react';

const HeaderWrapper = ({ userInfo }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.userInfo = userInfo;
      headerRef.current.requestUpdate();
    }
  }, [userInfo]);

  return <ge-header ref={headerRef}></ge-header>;
};
```

### Angular

1. Ajouter le composant dans `angular.json` (scripts et styles si besoin).
2. Activer les **Custom Elements** dans le module :

```ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  declarations: [...],
  imports: [...],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

3. Utilisation dans un template Angular :

```html
<ge-header [attr.isMenuOpen]="true"></ge-header>
```

4. Mise à jour manuelle des propriétés :

```ts
@ViewChild('headerRef') headerRef: ElementRef;

ngOnChanges() {
  if (this.headerRef?.nativeElement) {
    this.headerRef.nativeElement.userInfo = this.user;
    this.headerRef.nativeElement.requestUpdate();
  }
}
```

---

## Tests unitaires

Les tests utilisent [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) avec Chromium headless et [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) pour les helpers (fixture, html, expect).

### Lancer les tests

```bash
yarn test
```

### Structure

Chaque composant possède un fichier de test dans son répertoire `test/` :

```
packages/
├── utils/svg-wrapper/test/svg-wrapper.test.js
└── webcomponents/
    ├── ge-header/test/ge-header.test.js
    ├── ge-header-public/test/ge-header-public.test.js
    ├── ge-footer/test/ge-footer.test.js
    ├── ge-header-armoiries/test/ge-header-armoiries.test.js
    └── ge-footer-armoiries/test/ge-footer-armoiries.test.js
```

### Configuration

Le fichier `web-test-runner.config.mjs` à la racine configure :
- **Chromium headless** comme navigateur (compatible WSL avec `--no-sandbox`)
- **Plugins custom** : transformation des décorateurs Lit via esbuild, stub des imports CSS, inline des SVG, résolution des packages `@ael/*` vers les sources
- **Node resolve** pour résoudre les bare imports (`lit`, `@material/web`, etc.)

### Sous WSL

Chromium doit être installé (`sudo apt install chromium-browser`) et le chemin est configuré dans `web-test-runner.config.mjs` via `executablePath`.

---

## Licence

Ce projet est sous licence [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

---

Pour toute question ou proposition, contactez l'équipe Design System à : **ocsin.scli.design-system@etat.ge.ch**
