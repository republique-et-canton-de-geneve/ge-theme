# @ge/televerse-webcomponent

Web component `<ge-televerse>` pour l'intégration du téléversement mobile dans les formulaires de l'État de Genève.

## Usage

```html
<script type="module" src="ge-televerse.js"></script>

<ge-televerse
  api-base-url="/api"
  user-id="U12345"
  form-id="form-abc"
  document-type="ID_CARD"
></ge-televerse>
```

Le composant :
1. Crée une session de téléversement via `POST /api/sessions`
2. Affiche un QR code que l'usager scanne avec son téléphone
3. Écoute les événements SSE pour suivre la progression
4. Émet des événements DOM quand le document est prêt

## Attributs

| Attribut | Description | Défaut |
|---|---|---|
| `api-base-url` | URL de base de l'API backend | `/api` |
| `user-id` | Identifiant de l'usager | — |
| `form-id` | Identifiant du formulaire | — |
| `document-type` | Type de document (ID_CARD, PROOF_OF_ADDRESS, etc.) | — |

## Événements émis

| Événement | Détail | Description |
|---|---|---|
| `televerse-ready` | `{ token, uploadUrl }` | Session créée, QR code affiché |
| `televerse-upload` | `{ documentId, fileName }` | Un fichier a été téléversé |
| `televerse-complete` | `{ documentId, pageCount }` | L'usager a finalisé le téléversement |
| `televerse-error` | `{ message }` | Erreur de connexion ou de session |
| `televerse-expired` | — | Session expirée |

## Exemple d'intégration

```javascript
const televerse = document.querySelector('ge-televerse');

televerse.addEventListener('televerse-complete', (e) => {
  const { documentId, pageCount } = e.detail;
  console.log(`Document prêt : ${documentId} (${pageCount} pages)`);
  // Stocker documentId dans le formulaire hôte
});

televerse.addEventListener('televerse-error', (e) => {
  console.error('Erreur téléversement :', e.detail.message);
});
```

## Développement

### Prérequis

- Node.js 20+
- Yarn

### Installation

```bash
yarn install
```

### Page de test locale

```bash
yarn start
```

Ouvre `http://localhost:3000` avec 4 panneaux :

1. **Génération QR** — Entrer une URL arbitraire pour tester le rendu du QR code
2. **Web component** — Monte le composant avec un mock backend (fetch + EventSource simulés)
3. **Simulation SSE** — Boutons pour simuler des événements upload-complete, session-complete, expiration
4. **Journal** — Affiche en temps réel tous les événements DOM émis par le composant

### Build

```bash
yarn build
```

Produit `build/ge-televerse.js` — un module ES à intégrer dans l'application hôte.

## Theming

Le composant utilise les CSS custom properties du design system M3 de l'État de Genève (chargées via `static.app.ge.ch/theme/css/theme.css`). Il fonctionne sans ce thème avec des valeurs par défaut, mais les couleurs s'adapteront automatiquement au thème GE si celui-ci est présent.
