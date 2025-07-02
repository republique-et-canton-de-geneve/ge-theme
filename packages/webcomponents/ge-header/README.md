# `<ge-header>` – Composant Web Header Authentifié (GE-Theme)

Le composant `<ge-header>` est un **Web Component** développé avec [Lit](https://lit.dev). Il représente l'en-tête d'une application **avec authentification**, adapté à la charte graphique **GE-Theme** de la République et canton de Genève.

---

## ✨ Fonctionnalités

- Affiche le logo officiel (`ge.ch`) et les armoiries genevoises
- Affiche dynamiquement les informations utilisateur :
  - Nom, prénom, e-mail, type de compte
- Affiche un **menu déroulant** au clic avec les options :
  - Voir les infos utilisateur
  - Gérer mon compte
  - Se déconnecter
- Déclenche des événements personnalisés :
  - `ge-manage-account`
  - `ge-logout`
- Design **responsive**, intégration Material Design (via tokens CSS)

---

## ✅ Installation et utilisation via CDN 

### Ajouter le script ci-dessous dans votre page HTML

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header/latest/ge-header.js"></script>
```

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Exemple GE Header</title>
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
    <script type="module" src="https://static.app.ge.ch/webcomponents/ge-header/latest/ge-header.js"></script>
  </head>
  <body>
    <ge-header id="ge-header"></ge-header>
 
 <script>
    const userInfo = {
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@etat-ge.ch",
      typeCompte: "PP"
    };

    const header = document.getElementById("ge-header");
    header.userInfo = userInfo;
    
    fetch('/api/user-info')
      .then(res => res.json())
      .then(data => {
        document.getElementById('ge-header').userInfo = data;
      });
    */
  </script>
  </body>
</html>
```

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
