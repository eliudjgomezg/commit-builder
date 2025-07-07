# ⚠️ Advertencia

Esta librería está diseñada para funcionar con proyectos que usan **Node.js v16.13.1** o versiones **anteriores**. Su funcionamiento no está garantizado con versiones más recientes.

---

# 🔧 commit-builder

Automatiza la creación de commits en proyectos Git siguiendo convenciones estándar (`Conventional Commits`), con soporte interactivo y comandos extendidos para `push` y `tag`.

Ideal para equipos que buscan consistencia en los mensajes de commits, facilidad en el tagging automatizado y flujos simples para integraciones continuas.

---

## 🚀 Instalación

### Usar en un proyecto (recomendado)
```bash
npm install commit-builder --save-dev
```
o
```bash
yarn add commit-builder --dev
```

### (Opcional) Uso global
```bash
npm install -g commit-builder
```
o
```bash
yarn global add commit-builder
```

---

# 🧰 Scripts disponibles

## Script: `npx commit`

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

---

## Script: `npx commit-push`

Hace un commit interactivo al igual que lo hace `npx commit` y además realiza `git push` automáticamente.

---

## Script: `npx commit-push-tag`

Hace un commit interactivo, realiza push y crea un tag con nombre basado en la rama + hash corto, y lo sube a GitLab.

### Ejemplo de tag generado:
```
qa-feature/login/1a2b3c4
```

El tag apunta al último commit de la rama.  
Si ya existe, lo sobrescribe (`-f`).

---

## Script: `npx new-tag`

Crea un tag con nombre basado en la rama actual, hash corto y comentario del último commit.  
Luego realiza push del mismo.

---

## Script: `npx commit-push-mr`

Hace un commit interactivo, realiza push y genera automáticamente una URL para crear un Merge Request en GitLab.

> 💡 **Por ahora este script solo funciona con repositorios GitLab.**  
> Es necesario que el repositorio use protocolo `https` en su remote y que tengas instalado el CLI oficial [`glab`](https://gitlab.com/gitlab-org/cli).

### Instalación de `glab` (todos los sistemas operativos)

#### macOS (usando Homebrew):
```bash
brew install glab
```

#### Windows (usando Scoop):
```powershell
scoop install glab
```

#### Windows (alternativa usando Chocolatey):
```powershell
choco install glab
```

#### Linux (Debian/Ubuntu):
```bash
curl -s https://raw.githubusercontent.com/profclems/glab/trunk/scripts/install.sh | sudo bash
```

#### Linux (Arch Linux):
```bash
sudo pacman -S glab
```

#### Otra alternativa:
Puedes consultar más métodos de instalación oficiales aquí:  
👉 https://gitlab.com/gitlab-org/cli#installation

### Autenticación con tu cuenta de GitLab:
```bash
glab auth login
```
Sigue las instrucciones en consola para vincular tu cuenta (usa el protocolo `https`).

### Verificar si estás autenticado correctamente:
```bash
glab auth status
```
Deberías ver tu usuario y el host configurado (por ejemplo: `gitlab.com`).

Una vez autenticado, el script te mostrará directamente la URL del Merge Request creado, lista para revisar.

---

## 🛠️ Setup opcional en `package.json`

Agrega alias en tu proyecto:

```json
{
  "scripts": {
    "commit": "npx commit",
    "commit-push": "npx commit-push",
    "commit-push-tag": "npx commit-push-tag",
    "new-tag": "npx new-tag",
    "commit-push-mr": "npx commit-push-mr"
  }
}
```

Y luego puedes ejecutar con:
```bash
yarn commit / yarn commit-push / yarn commit-push-tag / yarn commit-push-mr
```
o
```bash
npm run commit / npm run commit-push / npm run commit-push-tag / npm run commit-push-mr
```

---

## 🧪 Tip

Asegúrate de tener Git inicializado y configurado con un remote válido (`origin`) antes de usar los comandos de `push` y `tag`.

---

## 📄 Licencia

MIT — libre para usar y adaptar.

---

### ¿Listo para tener commits más limpios, consistentes y automatizados? 🎯
