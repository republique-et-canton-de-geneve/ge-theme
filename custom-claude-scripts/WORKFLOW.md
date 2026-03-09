# Workflow 2 PCs

## PC perso
```bash
git push origin ma-branche
```

## PC pro (1ere fois)
```bash
git fetch github && git checkout -b ma-branche github/ma-branche && git push origin ma-branche
```

## PC pro (fois suivantes)
```bash
git fetch github && git checkout ma-branche && git pull github ma-branche && git push origin ma-branche
```
