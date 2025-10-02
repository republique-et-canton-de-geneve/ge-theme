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

  <script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
</head>
<body>
  <!-- Votre contenu ici -->
  <ge-footer theme="light"></ge-footer>
</body>
</html>

```

## Propriétés <ge-header>
- Affiche automatiquement les liens d'aide, accessibilité, confidentialité et CGU ainsi que le logo de l'État de Genève.
- Props disponibles :
    - `maxWidth`: booleen "true" ou "false" (true=sans marge à gauche et à droite / false= avec marge à gauche et à droite)
    - `links='[`
              `{"title":"Support","href":"https://example.com/support"},`
              `{"title":"Mentions légales","href":"https://example.com/legal"}`
            `]'`
- Valeurs par défaut
    - `maxWidth = "true"
    - `links =[`
              `{ title: "Contact", href: this.contactLink },`
              `{ title: "Accessibilité", href: this.accessibilityLink },`
              `{ title: "Politique de confidentialité", href: this.privacyLink },`
              `{ title: "Conditions générales", href: this.termsLink }`
              `]`
                `@property({ type: String }) contactLink = "https://www.ge.ch/c/footer-edm-aide";`
                `@property({ type: String }) accessibilityLink = "https://www.ge.ch/c/footer-edm-accessibilite";`
                `@property({ type: String }) privacyLink = "https://www.ge.ch/c/footer-edm-confidentialite";`
                `@property({ type: String }) termsLink = "https://www.ge.ch/c/footer-edm-cgu";`
