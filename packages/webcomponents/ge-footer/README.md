# `<ge-footer>` – Composant Web Footer (GE-Theme)

Le composant `<ge-footer>` est un **Web Component** développé avec [Lit](https://lit.dev), qui implémente le pied de page institutionnel de la République et canton de Genève, selon la charte graphique **GE-Theme**.

---

## ✨ Fonctionnalités

- Affiche les liens institutionnels :  
  - `Contact`
  - `Accessibilité`
  - `Politique de confidentialité`
  - `Conditions générales`
- Intègre l'image des **armoiries genevoises**, dynamique selon le thème (`light` ou `dark`)
- Design responsive compatible mobile (grâce à des media queries)
- Support de la personnalisation via **CSS variables Material Design**

---

## ✅ Instation et utilisation via CDN

### Ajouter le script ci-dessous dans votre page HTML

```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
```

### Ajoutez les feuilles de style suivantes dans la balise `<head>` de votre application :

```html
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
<link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
```
## Exemple complet avec l'import via CDN 

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Exemple GE Footer</title>
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/dark.css" />
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css" />
  <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/theme.css" />
  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
</head>
<body>
  <!-- Votre contenu ici -->
  <ge-footer theme="light"></ge-footer>
</body>
</html>

```