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
  

<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
</head>
<body>
  <!-- Votre contenu ici -->
  <ge-header-public theme="light"></ge-header-public>
</body>
</html>

```
## Propriétés <ge-header-public>

- Props disponibles :
    - `maxWidth`: booleen "true" ou "false" (true=sans marge à gauche et à droite / false= avec marge à gauche et à droite)