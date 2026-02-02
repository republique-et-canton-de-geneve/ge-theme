# `<ge-consent>` – Composant Consentement Cookies Matomo

Web Component développé avec [Lit](https://lit.dev) pour gérer le consentement des cookies de mesure d'audience Matomo Tag Manager, conforme au design system GE-Theme (Material 3).

## Fonctionnalités

- Affichage automatique si aucun choix n'a été fait
- Gestion des cookies `mtm_consent` / `mtm_consent_removed`
- Intégration native avec Matomo Tag Manager (`_mtm.push`)
- Méthodes publiques `show()` et `reset()`
- Événement `consent` pour réagir au choix utilisateur
- Thème Material 3 via CSS custom properties

## Installation

### Via CDN

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-consent/latest/ge-consent.js"></script>
```

### Via npm

```bash
yarn add @ael/ge-consent
```

```javascript
import '@ael/ge-consent';
```

## Prérequis CSS

```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css" />
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
```

## Utilisation

### Exemple minimal

```html
<body>
  <!-- Votre contenu -->
  <ge-consent></ge-consent>
</body>
```

Le dialog s'affiche automatiquement si l'utilisateur n'a pas encore fait de choix.

### Contrôle programmatique

```javascript
const consent = document.querySelector('ge-consent');

// Afficher le dialog manuellement
consent.show();

// Réinitialiser le consentement (efface les cookies et rouvre le dialog)
consent.reset();
```

### Écoute des événements

```javascript
document.querySelector('ge-consent').addEventListener('consent', (e) => {
  if (e.detail.granted) {
    console.log('Tracking autorisé');
  } else {
    console.log('Tracking refusé');
  }
});
```

## API

### Méthodes

| Méthode   | Description                                              |
|-----------|----------------------------------------------------------|
| `show()`  | Ouvre le dialog de consentement                          |
| `reset()` | Efface les cookies de consentement et rouvre le dialog   |

### Événements

| Événement | Détail                      | Description                        |
|-----------|-----------------------------|------------------------------------|
| `consent` | `{ granted: boolean }`      | Émis après le choix de l'utilisateur |

### CSS Custom Properties

Le composant utilise les tokens Material 3 du GE-Theme :

| Variable                                | Utilisation              |
|-----------------------------------------|--------------------------|
| `--md-sys-color-surface-container-high` | Fond du dialog           |
| `--md-sys-color-on-surface`             | Texte principal          |
| `--md-sys-color-on-surface-variant`     | Texte secondaire         |
| `--md-sys-color-primary`                | Bouton accepter          |
| `--md-sys-color-on-primary`             | Texte bouton accepter    |
| `--md-sys-color-primary-container`      | Hover bouton refuser     |
| `--md-sys-color-scrim`                  | Backdrop                 |
| `--md-sys-shape-corner-extra-large`     | Border-radius dialog     |
| `--md-sys-shape-corner-full`            | Border-radius boutons    |

## Configuration Matomo Tag Manager

Pour que le consentement soit respecté, configurez vos tags MTM avec l'option **"Require consent"** activée.

## Développement

```bash
yarn install
yarn start      # Dev server sur http://localhost:1234
yarn build      # Build production
yarn lint       # ESLint
```

## Licence

Apache-2.0