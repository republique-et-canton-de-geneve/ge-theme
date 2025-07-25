# `<ge-header-public>` – Composant Web Header Public (GE-Theme)

Le composant `<ge-header-public>` est un **Web Component** développé avec [Lit](https://lit.dev), qui implémente l’en-tête public de la République et canton de Genève, selon la charte graphique **GE-Theme**.


---

## ✨ Fonctionnalités

- Affiche le logo des **armoiries genevoises** avec un lien vers le site officiel `ge.ch`
- Présente le titre `ge.ch` en tant qu’identité visuelle principale
- Entièrement responsive
- Intègre l'image des **armoiries genevoises**, dynamique selon le thème (`light` ou `dark`)
- Design responsive compatible mobile
- Support de la personnalisation via **CSS variables Material Design**

---

## ✅  Installation et utilisation via CDN

### Ajouter le script ci-dessous dans votre page HTML

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
```

### Ajoutez les feuilles de style suivantes dans la balise `<head>` de votre application :

```html
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
    <!-- et, si l'application gère le mode light/dark-->
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
    <!-- ou, si l'application ne gère pas le mode light/dark --> 
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
    <!-- puis --> 

```
## Exemple complet avec l'import via CDN 

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Exemple GE Footer</title>
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
    <!-- et, si l'application gère le mode light/dark-->
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
    <!-- ou, si l'application ne gère pas le mode light/dark --> 
      <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
    <!-- puis --> 

<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
</head>
<body>
  <!-- Votre contenu ici -->
  <ge-header-public theme="light"></ge-header-public>
</body>
</html>

```