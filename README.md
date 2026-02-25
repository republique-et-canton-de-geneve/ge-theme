# GE Theme — CDN Design System de l'État de Genève

Ce dépôt produit le **site CDN statique** de l'État de Genève (`static.app.ge.ch`), qui distribue les artefacts partagés du design system :

- **CSS du thème** — Tokens Material Design 3 (primitives, thèmes clair/sombre, préférence système)
- **Polices** — Roboto via `@fontsource`
- **Icônes** — Jeu d'icônes SVG commun et personnalisé
- **Web Components** — Composants [Lit](https://lit.dev) réutilisables et indépendants du framework (en-tête, pied de page, consentement cookies, etc.)

Pour la documentation détaillée des Web Components (props, événements, méthodes), voir le [README des Web Components](./packages/webcomponents/README.md).

---

## Intégration via le CDN

Les artefacts du design system sont hébergés sur les serveurs `static` de l'État de Genève.

> | Environnement | URL |
> |---------------|-----|
> | Production    | `https://static.app.ge.ch` |
> | Recette       | `https://static.rec.etat-ge.ch` |
> | Développement | `https://static.dev.etat-ge.ch` |
>
> Par défaut, utiliser les URL de production en DEV/REC et PRD. Les URL de DEV ou REC servent à tester d'éventuelles montées de version.

### CSS du thème

Ajoutez les feuilles de style nécessaires dans le `<head>` de votre application :

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

### Web Components

Les Web Components sont chargés via `<script type="module">`. Chaque composant est disponible à l'adresse :

```
https://static.app.ge.ch/webcomponents/{nom-composant}/{version}/{nom-composant}.js
```

#### Versionnement

Plusieurs formats de version sont supportés :

| Format | Exemple | Usage |
|--------|---------|-------|
| Version exacte | `.../ge-footer/1.0.3/ge-footer.js` | Production — fige une release spécifique |
| Majeure glissante | `.../ge-footer/1.latest/ge-footer.js` | Production maintenue — reçoit les nouvelles fonctionnalités et correctifs au sein de la v1 |
| Mineure glissante | `.../ge-footer/1.0.latest/ge-footer.js` | Conservateur — reçoit uniquement les patches de la v1.0 |
| Latest | `.../ge-footer/latest/ge-footer.js` | Développement — toujours la dernière version |

La liste complète des versions publiées est disponible sur `https://static.app.ge.ch/webcomponents/versions.json`.

#### Exemple d'intégration

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/1.latest/ge-header-public.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/1.latest/ge-footer.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-consent/1.latest/ge-consent.js"></script>
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

Pour la documentation complète des composants (props, événements, méthodes), voir le [README des Web Components](./packages/webcomponents/README.md).

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

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| `<ge-header>` | En-tête avec menu d'authentification utilisateur |
| `<ge-header-public>` | En-tête public (sans authentification) |
| `<ge-footer>` | Pied de page avec liens institutionnels et armoiries |
| `<ge-header-armoiries>` | Armoiries SVG pour l'en-tête |
| `<ge-footer-armoiries>` | Armoiries SVG pour le pied de page |
| `<ge-consent>` | Consentement cookies pour le tracking Matomo |
| `<ge-televerse>` | Téléversement de documents via QR code |

Documentation détaillée (props, événements, méthodes) : [README des Web Components](./packages/webcomponents/README.md)

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
