# `<ge-skiplink>` – Composant Web Skiplink (GE-Theme)

Le composant `<ge-skiplink>` est un **Web Component** développé avec [Lit](https://lit.dev), permettant d'ajouter un ensemble de liens d'accès rapide (skiplinks) au début d'une page ou d'une application web. Il améliore la navigation clavier et répond aux bonnes pratiques d’accessibilité (WCAG 2.x), selon la charte graphique **GE-Theme**.

---

## ✨ Fonctionnalités

- Affiche automatiquement une liste de liens d’accès rapide :
  - Vers des sections internes de la page (ex. : #contenu, #navigation, etc.)
  - Personnalisables via une propriété Lit
- Entièrement conforme aux standards d’accessibilité :
  - Gestion du focus
  - Affichage uniquement lorsque le lien reçoit le focus (:focus-within)
- Design minimaliste et facilement personnalisable
- Peut être intégré dans n'importe quel framework ou application web

---

## ✅ Installation et utilisation via CDN

### Ajouter le script ci-dessous dans votre page HTML

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-skiplink/latest/ge-skiplink.js"></script>
```

### Ajoutez les feuilles de style suivantes dans la balise `<head>` de votre application :

 par défaut
  ```html
  <link rel="stylesheet" href=https://static.app.ge.ch/theme/css/primitives.css />
  ```

  si l'application supporte uniquement le thème clair (forcer le thème clair)
  ```html
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
  ```

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
  ```html
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
  ```
## Exemple complet avec l'import via CDN 

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Exemple GE Footer</title>
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />

    <!-- si l'application supporte uniquement le thème clair (forcer le thème clair)-->
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
  
    <!-- si l'application supporte l'affichage system clair et sombre-->  
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />

    <!-- si l'application propose une option d'affichage clair et sombre --> 
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
    
    <!-- si l'application supporte uniquement le thème sombre (forcer le thème sombre)-->
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
    <!-- puis --> 

  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-skiplink/latest/ge-skiplink.js"></script>
</head>
<body>
  <ge-skiplink
          .links="${[
    { href: '#content', title: 'Contenu' },
    { href: '#main-navigation', title: 'Menu' },
    { href: '#search', title: 'Recherche' },
    { href: '#footer', title: 'Pied de page' }
  ]}"
  ></ge-skiplink>
  <!-- Votre contenu ici -->
</body>
</html>

```

## Propriétés <ge-header>
- `links` _(type: **Array**)_  : Définit la liste des liens affichés dans le composant. Chaque élément est un objet contenant :
  - `href`: cible du lien (id de section, URL interne, etc)
  - `title`: texte affiché

Exemple d'utilisation :
```html
<ge-skiplink
    .links="${[
        { href: '#content', title: 'Contenu' },
        { href: '#main-navigation', title: 'Menu' },
        { href: '#search', title: 'Recherche' },
        { href: '#footer', title: 'Pied de page' }
    ]}"
></ge-skiplink>
```