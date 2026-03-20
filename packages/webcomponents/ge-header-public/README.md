# `<ge-header-public>` — Composant Web Header Public (GE-Theme)

Le composant `<ge-header-public>` est un **Web Component** developpe avec [Lit](https://lit.dev), qui implemente l'en-tete public de la Republique et canton de Geneve, selon la charte graphique **GE-Theme**.

## Fonctionnalites

- Affiche le logo des armoiries genevoises avec un lien vers le site officiel `ge.ch`
- Bouton de connexion optionnel avec URL configurable
- Menu de navigation mega-menu avec acces rapide et thematiques
- Focus trap automatique dans le menu ouvert (via `m3e-focus-trap`)
- Fermeture du menu par touche Echap, clic hors du panneau, ou bouton
- Design responsive (adaptation mobile via media queries)
- Support des variables CSS Material Design 3

## Installation via CDN

Ajoutez le script dans votre page HTML :

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
```

Ajoutez les feuilles de style dans la balise `<head>` :

```html
<!-- Variables de base (requis) -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />

<!-- Theme selon vos besoins (choisir une option) -->

<!-- Option 1 : Theme clair uniquement -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />

<!-- Option 2 : Theme sombre uniquement -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />

<!-- Option 3 : Theme automatique selon les preferences systeme -->
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
```

## Utilisation

### Exemple minimal

```html
<ge-header-public></ge-header-public>
```

### Avec menu et bouton de connexion

```html
<ge-header-public showMenu showLogin></ge-header-public>
```

### Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Exemple GE Header Public</title>
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
</head>
<body>
  <ge-header-public showMenu showLogin></ge-header-public>
  <main>Votre contenu ici</main>
</body>
</html>
```

## Proprietes

| Attribut     | Type      | Defaut                            | Description                                                                                         |
|--------------|-----------|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| `fullWidth`  | `boolean` | `true`                            | `true` = pleine largeur, `false` = largeur max 1107px. Le panneau menu est toujours contraint a 1088px. |
| `showMenu`   | `boolean` | `false`                           | Affiche le bouton menu et le panneau de navigation.                                                 |
| `showLogin`  | `boolean` | `false`                           | Affiche le bouton de connexion.                                                                     |
| `loginUrl`   | `string`  | `https://www.ge.ch/connexion`     | URL cible du bouton de connexion.                                                                   |
| `loginLabel` | `string`  | `Connexion`                       | Libelle affiche sous le bouton de connexion.                                                        |
| `menuData`   | `object`  | Donnees de navigation ge.ch       | Donnees du menu (voir structure ci-dessous).                                                        |
| `maxWidth`   | `string`  | `"true"`                          | **Deprecie.** Utiliser `fullWidth` a la place.                                                      |

### Controle de la largeur

```html
<!-- Pleine largeur (defaut) -->
<ge-header-public showMenu></ge-header-public>

<!-- Largeur contrainte a 1107px -->
<ge-header-public showMenu .fullWidth=${false}></ge-header-public>
```

Le panneau du menu est toujours contraint a 1088px, meme lorsque le header est en pleine largeur.

> **Note :** L'attribut `maxWidth` est deprecie. Utilisez `fullWidth` a la place.

### Structure de `menuData`

L'attribut `menuData` accepte un objet avec deux tableaux : `quickAccess` (boutons d'acces rapide) et `sections` (colonnes thematiques).

```javascript
{
  quickAccess: [
    { label: "Demarches", url: "https://www.ge.ch/demarches", variant: "filled" },
    { label: "Offres d'emploi", url: "https://www.ge.ch/offres-emploi-etat-geneve/liste-offres" },
  ],
  sections: [
    {
      title: "A la une",
      links: [
        { label: "Actualites", url: "https://www.ge.ch/publication?type=460" },
        { label: "Dossiers", url: "https://www.ge.ch/dossier" },
      ],
    },
    {
      title: "Demarches",
      links: [
        { label: "Ecoles et formations", url: "https://www.ge.ch/demarches/ecoles-formations" },
        { label: "Entreprises", url: "https://www.ge.ch/demarches/entreprises" },
      ],
    },
  ],
}
```

| Champ                    | Type     | Description                                                                 |
|--------------------------|----------|-----------------------------------------------------------------------------|
| `quickAccess[].label`    | `string` | Libelle du bouton.                                                          |
| `quickAccess[].url`      | `string` | URL cible du bouton.                                                        |
| `quickAccess[].variant`  | `string` | `"filled"` pour un bouton rempli, sinon `"outlined"` par defaut.            |
| `sections[].title`       | `string` | Titre de la colonne thematique.                                             |
| `sections[].links`       | `array`  | Tableau de liens `{ label, url }`.                                          |

Les sections avec plus de 7 liens sont automatiquement affichees sur deux colonnes.

## Evenements

| Evenement        | Detail              | Description                                              |
|------------------|---------------------|----------------------------------------------------------|
| `ge-menu-toggle` | `{ open: boolean }` | Emis a l'ouverture ou la fermeture du menu.              |

```javascript
document.querySelector('ge-header-public').addEventListener('ge-menu-toggle', (e) => {
  console.log('Menu ouvert :', e.detail.open);
});
```

## Comportement visuel

- Le header a une hauteur fixe de 80px (+ 1px de bordure inferieure)
- Les boutons Connexion et Menu passent en couleur `primary` au survol, a l'activation, et (pour Menu) lorsque le menu est ouvert
- Le panneau du menu s'ouvre avec une animation de type scale (100ms, depuis le centre)
- Un scrim semi-transparent (`--md-sys-color-scrim`) recouvre la page lorsque le menu est ouvert
- Le panneau du menu est toujours contraint a 1088px, meme lorsque le header est en pleine largeur

## Accessibilite

- Le bouton menu indique son etat via `aria-expanded` et `aria-haspopup`
- Le panneau de navigation est un `<nav aria-label="Menu principal">`
- Le focus est piege dans le menu ouvert via `m3e-focus-trap`
- La touche Echap ferme le menu et rend le focus au bouton menu
- Les boutons Connexion et Menu sont activables au clavier (Enter / Espace)
- Toutes les icones SVG sont marquees `aria-hidden="true"`
- Le lien logo indique l'ouverture dans une nouvelle fenetre aux lecteurs d'ecran
- `prefers-reduced-motion: reduce` desactive les transitions

## Developpement

```bash
# Installation des dependances
yarn install

# Lancement du serveur de developpement
yarn dev

# Build pour production
yarn build

# Lint
yarn lint
```

## Licence

Apache-2.0
