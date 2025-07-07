# 🔧 commit-builder

Automatiza la creación de commits en proyectos Git siguiendo convenciones estándar (`Conventional Commits`), con soporte interactivo y comandos extendidos para `push` y `tag`.

Ideal para equipos que buscan consistencia en los mensajes de commits, facilidad en el tagging automatizado y flujos simples para integraciones continuas.

---

## 🚀 Instalación

### Usar en un proyecto (recomendado)
```
npm install commit-builder --save-dev
```
o
```
yarn add commit-builder --dev
```

### (Opcional) Uso global
```
npm install -g commit-builder
```
o
```
yarn global add commit-builder
```

# 🧰 Scripts disponibles


# Script npx commit

Crea un commit interactivo con mensajes estructurados usando Conventional Commits.

### Te pedirá:
```
Tipo (feat, fix, refactor, etc.)
Módulo o componente afectado,
Título breve del cambio,
Mensaje descriptivo opcional.
```

### Resultado del commit:
```
feat(auth): agrega validación de sesión
Se mejora la validación al iniciar sesión usando tokens temporales.
```

# Script: npx commit-push

Hace un commit interactivo al igual que lo hace npx commit y ademas realiza git push automáticamente.


# npx commit-push-tag
Hace un commit interactivo al igual que lo hace npx commit, realiza git push automáticamente y crea un tag con nombre basado en la rama y hash corto y realiza push del mismo

### Ejemplo de tag generado:
```
qa-feature/login/1a2b3c4
```

El tag apunta al último commit de la rama.

Si ya existe, lo sobrescribe (-f).

# Script: npx new-tag

Crea un tag con nombre basado en la rama actual, hash corto y comentario del ultimo commit y realiza push del mismo.

# 🛠️ Setup opcional en package.json

Agrega alias en tu proyecto:

```
{
  "scripts": {
    "commit": "npx commit",
    "commit-push": "npx commit-push",
    "commit-push-tag": "npx commit-push-tag"
    "new-tag": "npx new-tag"
  }
}
```

Y luego puedes ejecutar con:
```
yarn commit / yarn commit-push / yarn commit-push-tag
```
 o
 ```
npm run commit / npm run commit-push / npm run commit-push-tag
```


# 🧪 Tip

Asegúrate de tener git inicializado y configurado con un remote (como GitLab o GitHub) antes de usar los comandos de push y tag.

# 📄 Licencia

MIT — libre para usar y adaptar.

### ¿Listo para tener commits más limpios, consistentes y automatizados? 🎯