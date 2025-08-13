# 🌟 Web Components GE Theme

Ce package fournit une bibliothèque de composants Web (Web Components) réutilisables construits avec [Lit](https://lit.dev). Il inclut les composants suivants :

- `<ge-header>` : En-tête avec gestion de l'utilisateur connecté.
- `<ge-header-public>` : En-tête.
- `<ge-footer>` : Pied de page avec liens utiles.


# 📦 Intégration des Web Components via Static

Cette procédure décrit comment intégrer directement les Web Components et les feuilles de style hébergés sur les serveurs `static` de l'État de Genève.

---

## 🔗 Intégration dans le `<head>`

### ✅ Références aux CSS

Ajoutez les feuilles de style suivantes dans la balise `<head>` de votre application :

par défaut
```html
<link rel="stylesheet" href=https://static.app.ge.ch/theme/css/primitives.css />
```

si l'application supporte uniquement le thème clair (forcer le thème clair)
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />

si l'application supporte l'affichage system clair et sombre
  ```html
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
  ```

si l'application propose une option d'affichage clair et sombre

  ```html
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
  ```

  si l'application supporte uniquement le thème sombre (forcer le thème sombre)
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />


## 🔗 Ajoutez les Web Components nécessaires via des balises `<script type="module">`

## Remarque :
Par défaut, les URL de production (sur static.app.ge.ch) sont à utiliser en DEV/REC et PRD
Pour tester d'éventuelles montées de version, les URL de DEV ou REC peuvent être utilisées

DEV https://static.dev.etat-ge.ch 
REC https://static.rec.etat-ge.ch 
 

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header/latest/ge-header.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge- footer.js"></script>
```
## Intégration sur une page html
Pour les applications avec contenus pleine largeur (ex: Mon esapce e-démarches)
```html
    <ge-header-public/>
    <ge-footer/>
```
Pour les applications avec marges sur le contenus (ex: Formulaires e-démarches, ... )
```html
    <ge-header-public maxWidth="80%" />
    <ge-footer maxWidth="80%" />
```


## 📁 Installation

```bash
yarn install 
```
## 🚀 Démarer le projet

```bash
yarn start
```

## 🚀 Build

```bash
yarn build
```

## 📁 Création d'un composant web

Dans src/web-components/xxx, créez un répertoire contenant votre composant, où xxx est la catégorie du composant.

## ✉️ Liste des composants disponible

#### `<ge-header>`
- Props disponibles :
    - `userInfo`: objet contenant `nom`, `prenom`, `email`, `typeCompte` (`PP`, `PM`, `ADM`)
    - `isMenuOpen`: booléen pour afficher/masquer le menu utilisateur
    - `maxWidth`: pourcentage ("80%" pour les contenus avec marges)
- Événements personnalisés :
    - `ge-toggle-app-menu`
    - `ge-manage-account`
    - `ge-logout`

#### `<ge-header-public>`
- Props disponibles :
    - `maxWidth`: pourcentage ("80%" pour les contenus avec marges)

#### `<ge-footer>`
- Affiche automatiquement les liens d'aide, accessibilité, confidentialité et CGU ainsi que le logo de l'État de Genève.
- Props disponibles :
    - `maxWidth`: pourcentage ("80%" pour les contenus avec marges)

---

## 💚 Intégration dans les frameworks

> ⚠️ **Important : Les composants Lit ne sont pas automatiquement réactifs aux changements de props dans certains frameworks comme Vue, React ou Angular.**
> Il faut **manuellement mettre à jour** les propriétés et appeler `requestUpdate()` sur les composants concernés.


### Vue 3

Dans un composant Vue :

## 📄 Installer la dépendence

```yarn
yarn add @opf/ge-theme;
```

Importez le package dans votre projet :

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
import '@opf/ge-theme';

const headerRef = ref(null);
const isMenuOpen = ref(false);
const miniVariant = ref(false);

watch(
  () => userStore.getters.utilisateur(),
  (newUser) => {
    if (headerRef.value) {
      headerRef.value.userInfo = newUser;
      headerRef.value.requestUpdate(); // 🔁 Forcer la mise à jour
    }
  },
  { immediate: true, deep: true }
);
</script>
```

### React

Pour utiliser des Web Components dans React :

1. Ajoutez `@opf/ge-theme` dans le `index.js` ou `App.js` :

```jsx
import '@opf/ge-theme';
```

2. Utilisez-les dans votre JSX :

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
      headerRef.current.requestUpdate(); // 🔁 Forcer la mise à jour
    }
  }, [userInfo]);

  return <ge-header ref={headerRef}></ge-header>;
};
```

### Angular

1. Ajoutez `@opf/ge-theme` dans `angular.json` (scripts et styles si besoin).
2. Activez les **Custom Elements** dans votre module :

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
    this.headerRef.nativeElement.requestUpdate(); // 🔁 Mise à jour forcée
  }
}
```

---

## 📆 prochaine étapes (proposée)

- [ ] Ajout de tests unitaires avec Playwright ou Testing Library
- [ ] Ajout d'un composant `ge-breadcrumb` ou lister les composants partagé
- [ ] Storybook pour documentation interactive

---

## ⚖️ Licence

Ce projet est distribué selon les conditions de l'État de Genève. Veuillez contacter le support pour plus d'informations.

---

Pour toute question ou proposition, contactez l'équipe Cyberadministration à : **ocsin.scli.design-system@etat.ge.ch**


## Badges
![lastest release](https://git.devops.etat-ge.ch/gitlab/ACCES_RESTREINT/3417_espace_numerique_usager/widget-front/-/badges/release.svg)
