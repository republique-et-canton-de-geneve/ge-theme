# Web Components CDN – Guide de versionnement

Ce document explique comment référencer les web components versionnés depuis le CDN statique de l'État de Genève.

## URL de base du CDN

```
https://static.app.ge.ch/
```

Environnements alternatifs :

| Environnement | URL de base |
|---------------|-------------|
| Production    | `https://static.app.ge.ch/` |
| Recette       | `https://static.rec.etat-ge.ch/` |
| Développement | `https://static.dev.etat-ge.ch/` |

---

## Versions disponibles

Toutes les versions publiées sont listées à l'adresse :

```
https://static.app.ge.ch/webcomponents/versions.json
```

Retourne un tableau JSON de versions semver en ordre croissant :

```json
["1.0.0", "1.0.1", "1.0.2", "1.0.3"]
```

---

## Structure des URL

Chaque composant est disponible à l'adresse :

```
https://static.app.ge.ch/webcomponents/{nom-composant}/{version}/{nom-composant}.js
```

Définitions TypeScript (si disponibles) :

```
https://static.app.ge.ch/webcomponents/{nom-composant}/{version}/types/{nom-composant}.d.ts
```

### Composants disponibles

| Composant             | Description                                             |
|-----------------------|---------------------------------------------------------|
| `ge-header`           | En-tête avec menu d'authentification utilisateur        |
| `ge-header-public`    | En-tête public (sans authentification)                  |
| `ge-header-armoiries` | Armoiries SVG pour l'en-tête                            |
| `ge-footer`           | Pied de page avec liens institutionnels                 |
| `ge-footer-armoiries` | Armoiries SVG pour le pied de page                      |
| `ge-consent`          | Popover de consentement pour le tracking Matomo         |
| `ge-televerse`        | Composant QR code pour téléversement de fichiers |

---

## Documentation des composants

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

## Formats de version

### Version exacte

Figer une release spécifique. Recommandé pour les applications en production nécessitant une stabilité maximale.

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/1.0.3/ge-footer.js"></script>
```

### Latest (glissant)

Pointe toujours vers la version la plus récente. À utiliser en développement ou pour les applications souhaitant des mises à jour automatiques.

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
```

⚠️ **Attention** : Peut inclure des changements non rétrocompatibles entre versions majeures.

### Verrouillage par version majeure (`X.latest`)

Recevoir toutes les mises à jour au sein d'une version majeure. Protège contre les changements non rétrocompatibles tout en bénéficiant des nouvelles fonctionnalités et corrections.

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/1.latest/ge-footer.js"></script>
```

Résout vers la version `1.x.x` la plus élevée (ex. `1.2.5` mais pas `2.0.0`).

### Verrouillage par version mineure (`X.Y.latest`)

Recevoir uniquement les correctifs (patches). Option la plus conservatrice tout en bénéficiant des corrections de bugs.

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/1.0.latest/ge-footer.js"></script>
```

Résout vers la version `1.0.x` la plus élevée (ex. `1.0.12` mais pas `1.1.0`).

---

## Stratégie recommandée

| Cas d'usage | Format recommandé | Exemple |
|-------------|-------------------|---------|
| Production (prudent) | Version exacte | `1.0.3` |
| Production (maintenue) | Verrouillage majeur | `1.latest` |
| Recette | Verrouillage majeur | `1.latest` |
| Développement | `latest` | `latest` |

---

## Exemple d'intégration complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Application</title>
  
  <!-- CSS du thème (requis) -->
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css">
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css">
  
  <!-- Web Components (verrouillage majeur) -->
  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/1.latest/ge-header-public.js"></script>
  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/1.latest/ge-footer.js"></script>
</head>
<body>
  <ge-header-public></ge-header-public>
  
  <main>
    <!-- Votre contenu -->
  </main>
  
  <ge-footer></ge-footer>
</body>
</html>
```

---

## Import Maps (optionnel)

Pour les applications utilisant des modules ES avec des spécificateurs simples :

```html
<script type="importmap">
{
  "imports": {
    "@ael/ge-header": "https://static.app.ge.ch/webcomponents/ge-header/1.latest/ge-header.js",
    "@ael/ge-footer": "https://static.app.ge.ch/webcomponents/ge-footer/1.latest/ge-footer.js"
  }
}
</script>

<script type="module">
  import '@ael/ge-header';
  import '@ael/ge-footer';
</script>
```

Une import map pré-construite pour les dernières versions est disponible à :

```
https://static.app.ge.ch/import-map.json
```

---

## Vérifier la version résolue

Pour vérifier quelle version exacte un lien symbolique résout, récupérez `versions.json` et trouvez la version correspondante la plus élevée, ou inspectez les requêtes réseau dans les DevTools du navigateur.

```javascript
// Exemple : Trouver la version actuelle de 1.latest
const versions = await fetch('https://static.app.ge.ch/webcomponents/versions.json').then(r => r.json());
const v1Latest = versions.filter(v => v.startsWith('1.')).pop();
console.log('1.latest résout vers :', v1Latest);
```

---

## Considérations de cache

- **Versions exactes** : Cache agressif (contenu immuable)
- **Liens symboliques** (`latest`, `X.latest`, `X.Y.latest`) : TTL de cache court pour récupérer les nouvelles releases

Pour les applications en production figées sur des versions exactes, envisagez d'ajouter un processus pour vérifier périodiquement `versions.json` et mettre à jour les références lors des fenêtres de maintenance.

---

## Support

Pour toute question ou problème, contactez : **ocsin.scli.design-system@etat.ge.ch**