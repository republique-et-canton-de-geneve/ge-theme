# `<ge-condition>`

Web component permettant d'afficher les Conditions Générales de Vente (CGV) ou d'Utilisation (CGU) dans une modale avec contenu en accordéon, sans quitter la page en cours.

## Installation

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-condition/latest/ge-condition.js"></script>
```

## Modes d'utilisation

### Mode 1 – Checkbox simple (`checkbox`)

Case à cocher seule, sans lien ni modale.

```html
<ge-condition mode="checkbox" required></ge-condition>
```

### Mode 2 – Checkbox + Dialog (`checkbox-dialog`) — par défaut

Case à cocher avec lien ouvrant une modale contenant le texte des conditions en accordéon.

```html
<ge-condition
    content-url="/path/to/cgu.html"
    pdf-url="/path/to/cgu.pdf"
    required
></ge-condition>
```

### Mode 3 – Summary (`summary`)

Résumé en langage clair affiché au-dessus de la case à cocher + lien vers la modale.

```html
<ge-condition
    mode="summary"
    content-url="/path/to/cgu.html"
    pdf-url="/path/to/cgu.pdf"
    summary="En acceptant, vous autorisez le traitement de vos données."
    required
></ge-condition>
```

### Multi-documents avec onglets

Une seule case à cocher, modale avec onglets pour naviguer entre plusieurs documents.

```html
<ge-condition
    required
    documents='[
        {"title": "CGU", "contentUrl": "/cgu.html", "pdfUrl": "/cgu.pdf"},
        {"title": "Confidentialité", "contentUrl": "/privacy.html", "pdfUrl": "/privacy.pdf"}
    ]'
    link-label="conditions et politiques"
    dialog-title="Documents contractuels"
></ge-condition>
```

## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `mode` | `String` | `"checkbox-dialog"` | `"checkbox"`, `"checkbox-dialog"`, ou `"summary"` |
| `label` | `String` | — | Texte de la case à cocher |
| `link-label` | `String` | — | Texte du lien cliquable |
| `content-url` | `String` | — | URL du contenu HTML pour la modale |
| `documents` | `JSON` | — | Documents multiples : `[{ title, contentUrl, pdfUrl }]` |
| `pdf-url` | `String` | — | URL du PDF pour téléchargement |
| `summary` | `String` | — | Résumé en langage clair (mode summary) |
| `checked` | `Boolean` | `false` | État de la case à cocher |
| `required` | `Boolean` | `false` | Case obligatoire |
| `dialog-title` | `String` | — | Titre de la modale |
| `locale` | `String` | — | Locale (fr/en/es/pt), sinon hérite de `[lang]` |
| `name` | `String` | `"condition"` | Nom du champ formulaire |

## Méthodes

| Méthode | Retour | Description |
|---------|--------|-------------|
| `validate()` | `boolean` | Valide la condition, affiche l'erreur si invalide |
| `openDialog()` | `void` | Ouvre la modale |
| `closeDialog()` | `void` | Ferme la modale |

## Événements

| Événement | Detail | Description |
|-----------|--------|-------------|
| `ge-condition-change` | `{ checked, name }` | Case à cocher modifiée |
| `ge-condition-dialog-open` | `{ name }` | Modale ouverte |
| `ge-condition-dialog-close` | `{ name }` | Modale fermée |

## Contenu HTML de la modale

Le contenu chargé via `content-url` est automatiquement transformé en accordéon :
- Les `<h2>` / `<h3>` deviennent des sections repliables (`<details>/<summary>`)
- La première section est ouverte par défaut
- Si le HTML contient déjà des `<details>`, il est utilisé tel quel

## Accessibilité

- Modale via `<dialog>` natif (focus-trap, Escape, backdrop)
- Navigation clavier complète
- Messages d'erreur annoncés via `aria-live`
- Retour du focus sur l'élément déclencheur après fermeture

## Langues supportées

Français (fr), English (en), Español (es), Português (pt).
