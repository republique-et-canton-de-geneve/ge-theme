# `<ge-footer>` – Composant Web Footer (GE-Theme)

Le composant `<ge-footer>` est un **Web Component** développé avec [Lit](https://lit.dev), qui implémente le pied de page institutionnel de la République et canton de Genève, selon la charte graphique **GE-Theme**.

## Fonctionnalités

- Affiche les liens institutionnels par défaut : Contact, Accessibilité, Politique de confidentialité, Conditions générales
- Permet de personnaliser les liens via l'attribut `links`
- Intègre les armoiries genevoises, avec adaptation automatique au thème clair/sombre
- Détection automatique du thème système (clair/sombre) avec possibilité de forcer un thème
- Design responsive (adaptation mobile via media queries)
- Placement automatique dans une grille CSS (`grid-area: footer`)
- Support des variables CSS Material Design

## Installation via CDN

Ajoutez le script dans votre page HTML :

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
```

Ajoutez les feuilles de style dans la balise `<head>` :

```html
<!-- Variables de base (requis) -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />

<!-- Thème selon vos besoins (choisir une option) -->

<!-- Option 1 : Thème clair uniquement -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />

<!-- Option 2 : Thème sombre uniquement -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />

<!-- Option 3 : Thème automatique selon les préférences système -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
```

## Utilisation

### Exemple minimal

Le composant se place automatiquement dans la zone `footer` d'une grille CSS si elle existe :

```html
<body style="display: grid; grid-template-areas: 'header' 'main' 'footer';">
  <header style="grid-area: header;">En-tête</header>
  <main style="grid-area: main;">Contenu</main>
  <ge-footer></ge-footer>
</body>
```

### Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Exemple GE Footer</title>
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
</head>
<body>
  <main>Votre contenu ici</main>
  <ge-footer></ge-footer>
</body>
</html>
```

## Propriétés

| Attribut | Type | Défaut | Description |
|----------|------|--------|-------------|
| `theme` | `'light'` \| `'dark'` | Auto (système) | Thème d'affichage. Par défaut, suit les préférences système. |
| `maxWidth` | `boolean` | `true` | `true` = pleine largeur, `false` = largeur max 1107px |
| `links` | `JSON` | Liens par défaut | Tableau JSON de liens personnalisés |
| `contactLink` | `string` | `https://www.ge.ch/c/footer-edm-aide` | URL du lien Contact |
| `accessibilityLink` | `string` | `https://www.ge.ch/c/footer-edm-accessibilite` | URL du lien Accessibilité |
| `privacyLink` | `string` | `https://www.ge.ch/c/footer-edm-confidentialite` | URL du lien Confidentialité |
| `termsLink` | `string` | `https://www.ge.ch/c/footer-edm-cgu` | URL du lien CGU |

### Gestion du thème

Le thème est déterminé selon la priorité suivante :

1. **Attribut `theme`** : Si présent, force le thème spécifié
2. **Préférence système** : Si l'attribut est absent, suit `prefers-color-scheme`

```html
<!-- Thème automatique (préférence système) -->
<ge-footer></ge-footer>

<!-- Forcer le thème clair -->
<ge-footer theme="light"></ge-footer>

<!-- Forcer le thème sombre -->
<ge-footer theme="dark"></ge-footer>
```

### Personnalisation des liens

#### Via les attributs individuels

```html
<ge-footer
  contactLink="https://example.com/contact"
  privacyLink="https://example.com/privacy"
></ge-footer>
```

#### Via l'attribut `links` (remplace tous les liens)

```html
<ge-footer links='[
  {"title": "Support", "href": "https://example.com/support"},
  {"title": "Mentions légales", "href": "https://example.com/legal"},
  {"title": "FAQ", "href": "https://example.com/faq"}
]'></ge-footer>
```

### Contrôle de la largeur

```html
<!-- Pleine largeur (défaut) -->
<ge-footer></ge-footer>
<ge-footer maxWidth></ge-footer>

<!-- Largeur contrainte à 1107px -->
<ge-footer maxWidth="false"></ge-footer>
```

## Événements

| Événement | Détail | Description                                                                   |
|-----------|--------|-------------------------------------------------------------------------------|
| `ge-footer-image-click` | `{ originalEvent: MouseEvent }` | Émis lors du clic sur les armoiries (à des fins de test du mode dark / light) |

```javascript
document.addEventListener('ge-footer-image-click', (e) => {
  console.log('Armoiries cliquées', e.detail);
});
```

## Intégration CSS Grid

Le composant définit `grid-area: footer` sur son `:host`. Pour l'utiliser dans une mise en page grid :

```css
body {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
```

Le `<ge-footer>` se positionnera automatiquement dans la zone `footer` définie par un CSS `grid-area`.

## Développement

```bash
# Installation des dépendances
yarn install

# Lancement du serveur de développement
yarn start

# Build pour production
yarn build

# Lint
yarn lint
```

## Licence

Apache-2.0