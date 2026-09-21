¡Entendido! 🙌 Te armé una **versión mejorada y ordenada** de tus apuntes, en **Markdown**, con ortografía corregida, ejemplos aclarados y mejor estructura para que te sirva como un **resumen bien organizado**.

---

# 📦 Apuntes de NPM – Gestión de Dependencias en JavaScript

## Clase 02: Gestión de dependencias

-   **JavaScript** nace en **1995**.
-   **Node.js** y **npm** aparecen en **2009**.
-   **npm** es el gestor de paquetes de Node.js, que permite crear y compartir librerías y herramientas con otros desarrolladores.
-   **CLI (Command Line Interface)** → donde se ejecutan los comandos.

---

## Clase 03: Instalación en macOS

Verificar instalación de Node LTS y npm desde la terminal:

```bash
node -v
npm -v
```

---

## Clase 04: Instalación en Windows

(Similar a macOS: descargar Node.js LTS, instalar y verificar versiones).

---

## Clase 05: Primeros pasos en NPM

Inicializar un proyecto con npm:

```bash
npm init -y
```

Esto genera el archivo **package.json** con la configuración inicial del proyecto.

---

## Clase 06: Instalación de dependencias

### Dependencias de desarrollo

Se usan solo en desarrollo, **no en producción**:

```bash
npm install eslint --save-dev
# o equivalente:
npm i eslint -D
```

### Dependencias de producción

Se usan en la app final (ejemplo: React):

```bash
npm install react --save
```

### Paquetes globales

No se instalan en el proyecto, sino en todo el sistema operativo.
No se registran en `package.json`.

```bash
npm install -g cowsay
```

### Comandos útiles

-   Ver dependencias instaladas en el proyecto:

    ```bash
    npm list
    ```

-   Ver dependencias instaladas globalmente:

    ```bash
    npm list -g
    ```

-   Simular instalación (para revisar conflictos):

    ```bash
    npm install react-dom --dry-run
    ```

-   Instalar versión específica:

    ```bash
    npm install json-server@0.15.0
    ```

---

## Clase 08: Comandos en NPM (Scripts)

En `package.json` puedes definir comandos personalizados dentro de `"scripts"`:

```json
{
    "scripts": {
        "start": "webpack-dev-server --open --mode development",
        "build": "webpack --mode production",
        "deploy": "npm run format && npm run build"
    }
}
```

Ejecutar en terminal:

```bash
npm run start
npm run build
npm run deploy
```

👉 Algunos comandos tienen **alias**, por ejemplo:

```bash
npm start
```

es equivalente a `npm run start`.

### NPX (Node Package Execute)

Permite ejecutar paquetes directamente sin instalarlos.

Ejemplo:

```bash
npx create-react-app mi-app
npx create-next-app mi-app
```

---

## Clase 09: Actualización de dependencias

-   Instalar dependencias:

    ```bash
    npm install
    ```

-   Ver dependencias:

    ```bash
    npm list
    ```

-   Ver dependencias desactualizadas:

    ```bash
    npm outdated
    ```

---

## Clase 10: Seguridad y solución de problemas

### Auditoría de seguridad

-   Revisar vulnerabilidades:

    ```bash
    npm audit
    ```

-   Salida en formato JSON:

    ```bash
    npm audit --json
    ```

-   Arreglar vulnerabilidades:

    ```bash
    npm audit fix
    npm audit fix --force
    ```

### Manejo de errores comunes

-   Problemas con `package.json`.
-   Errores en `node_modules`.
-   Configuración errónea en Git/GitHub.
-   Archivos corruptos o versiones en caché.

#### Solución de caché

```bash
npm cache clean --force
npm cache verify
```

---

## Clase 11: Eliminación de dependencias y Package Lock

-   Desinstalar un paquete:

    ```bash
    npm uninstall <paquete>
    ```

-   Eliminar todas las dependencias y reinstalar:

    ```bash
    rm -rf node_modules
    npm install
    ```

### `package-lock.json`

-   Registra las **versiones exactas** de cada dependencia y sub-dependencia.
-   Garantiza que todos los desarrolladores instalen las mismas versiones.

👉 Buenas prácticas:
Si se corrompe el proyecto, borrar `node_modules` y `package-lock.json`, luego:

```bash
npm install
```

---

## Clase 12: Crear un paquete

Pasos básicos para crear y publicar un paquete en **npmjs.com**:

1. Verificar si el nombre está disponible.
2. Crear repositorio en GitHub.
3. Inicializar proyecto:

    ```bash
    npm init -y
    ```

4. Crear carpeta `src` con `index.js`.
5. Configurar archivo `bin/global.js` (para comandos globales).
6. Actualizar `package.json`.

---

## Clase 13: Publicar un paquete

1. Logear en npm:

    ```bash
    npm adduser
    ```

2. Publicar paquete:

    ```bash
    npm publish
    ```

3. Documentar paquete en la página de npm.

---

## Clase 14: Versionado de paquetes y paquetes privados

-   Actualizar versión manualmente:

    ```bash
    npm version 1.1.0
    npm publish
    ```

-   Documentar los pasos de instalación en la publicación.

---

✅ **En resumen**:

-   **npm** es más que instalar librerías, es todo un **gestor de dependencias**.
-   Se debe entender la diferencia entre dependencias de desarrollo, producción y globales.
-   Usar **scripts** y **npx** optimiza el trabajo.
-   Siempre verificar **seguridad** y mantener limpio el proyecto.
-   Publicar paquetes permite compartir tu trabajo con la comunidad.

---

¿Quieres que también te haga un **mapa visual en diagrama** (tipo esquema resumido) para que tengas todo en una sola imagen?
