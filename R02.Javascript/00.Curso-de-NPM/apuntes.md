# 📦 Guía Definitiva de NPM: De Cero a Experto

Esta guía está diseñada para llevar tu comprensión de `npm` desde los conceptos más básicos hasta temas avanzados, con explicaciones claras, ejemplos prácticos y ejercicios para que puedas consolidar tu aprendizaje.

---

## 🎯 ¿Qué es NPM y por qué es tan importante?

**NPM (Node Package Manager)** es el corazón del desarrollo moderno en JavaScript. Imagínalo como una gigantesca biblioteca online donde los desarrolladores publican y comparten "paquetes" de código listos para usar.

-   **¿Qué es un paquete?** Es un proyecto (una librería, un framework, una herramienta) que resuelve un problema específico. Por ejemplo, `react` para crear interfaces, `express` para construir servidores o `jest` para hacer tests.
-   **¿Cuál es su función?** NPM te permite:
    1.  **Descargar** e instalar paquetes de otros desarrolladores en tu proyecto.
    2.  **Gestionar** las versiones de esos paquetes para evitar conflictos.
    3.  **Ejecutar** tareas comunes (como iniciar tu app o correr tests) con comandos sencillos.
    4.  **Compartir** tu propio código con el mundo publicando tus paquetes.

---

## 🚀 Sección 1: Primeros Pasos

### 1.1. Instalación y Verificación

`npm` se instala automáticamente junto con **Node.js**. Para empezar, siempre es bueno verificar que todo esté en orden.

```bash
# Verifica la versión de Node.js instalada
node -v

# Verifica la versión de npm instalada
npm -v
```

> **💡 Nota:** Se recomienda usar siempre versiones **LTS (Long Term Support)** de Node.js, ya que son las más estables.

### 1.2. El `package.json`: El Manifiesto de tu Proyecto

Todo proyecto que utiliza `npm` necesita un archivo `package.json`. Este archivo es un manifiesto en formato JSON que contiene toda la metadata de tu proyecto:
-   Nombre, versión y descripción del proyecto.
-   Las dependencias que necesita para funcionar.
-   Scripts personalizados para automatizar tareas.
-   Y mucho más.

Para crear este archivo, navega a la carpeta de tu proyecto en la terminal y ejecuta:

```bash
# Inicia un asistente que te hará preguntas para crear el package.json
npm init

# O bien, crea un package.json con valores por defecto sin preguntas
npm init -y
```

---

## 🔧 Sección 2: Gestión de Dependencias

Esta es la tarea principal de `npm`. Las dependencias son los paquetes que tu proyecto necesita. Existen principalmente dos tipos:

### 2.1. `dependencies` (Dependencias de Producción)

Son paquetes **esenciales** para que tu aplicación funcione en el entorno de producción (cuando ya está desplegada para los usuarios). Por ejemplo: React, Express, Lodash.

**Instalación:**

```bash
# Instala un paquete y lo guarda en `dependencies`
npm install <nombre-del-paquete>

# Ejemplo: instalando el framework para servidores Express
npm install express

# Alias más corto (funciona igual)
npm i express
```

### 2.2. `devDependencies` (Dependencias de Desarrollo)

Son paquetes que **solo necesitas mientras estás desarrollando**, pero que no son necesarios para que la aplicación final funcione. Por ejemplo: herramientas de testing, linters (para revisar la calidad del código) o bundlers.

**Instalación:**

```bash
# Instala un paquete y lo guarda en `devDependencies`
npm install <nombre-del-paquete> --save-dev

# Alias más corto y común
npm i <nombre-del-paquete> -D

# Ejemplo: instalando ESLint, una herramienta para analizar código
npm i eslint -D
```

### 2.3. Dependencias Globales

Estos paquetes no se instalan en un proyecto específico, sino en tu sistema operativo, para que puedas usarlos como herramientas de línea de comandos desde cualquier lugar.

```bash
# Instala un paquete de forma global
npm install <nombre-del-paquete> --global

# Alias más corto
npm i <nombre-del-paquete> -g

# Ejemplo: instalando un servidor local estático para pruebas rápidas
npm i http-server -g
```

### 2.4. `package-lock.json`: Garantizando Consistencia

Este archivo se genera y actualiza automáticamente cada vez que modificas tus dependencias. Su función es **bloquear las versiones exactas** de cada paquete (y sus sub-dependencias) que se instalaron.

**¿Por qué es crucial?** Garantiza que todos los desarrolladores del equipo, y también el servidor de producción, instalen exactamente la misma versión de cada dependencia, evitando el clásico error de "en mi máquina sí funciona".

> **⚠️ Importante:** Siempre debes incluir `package.json` y `package-lock.json` en tu repositorio de Git. **Nunca** incluyas la carpeta `node_modules`.

---

## 🤖 Sección 3: Scripts y Automatización con NPM

`npm` no solo gestiona paquetes, también es un potente ejecutor de tareas. Dentro de tu `package.json`, puedes definir `scripts` para automatizar comandos repetitivos.

```json
// package.json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "test": "jest",
  "build": "webpack --mode production"
}
```

**Ejecución:**

```bash
# Ejecuta el script llamado "start"
npm run start

# Ejecuta el script llamado "dev"
npm run dev
```

> **💡 Alias útiles:** Para scripts con nombres especiales como `start`, `test`, `stop` y `restart`, puedes omitir la palabra `run`:
> `npm start` (en lugar de `npm run start`)
> `npm test` (en lugar de `npm run test`)

### 3.1. `npx`: Ejecutando Paquetes sin Instalarlos

`npx` es una herramienta que viene con `npm` y te permite **ejecutar el código de un paquete sin tener que instalarlo** de forma permanente en tu proyecto o de manera global.

Es extremadamente útil para herramientas de scaffolding (creación de proyectos) o paquetes que solo usas una vez.

```bash
# Crea una nueva aplicación de React en la carpeta "mi-app"
# No necesitas tener create-react-app instalado
npx create-react-app mi-app

# Ejecuta el paquete "cowsay" para que una vaca diga "Hola"
npx cowsay "Hola, mundo!"
```

---

## 📈 Sección 4: Mantenimiento del Proyecto

### 4.1. Auditoría de Seguridad

Los paquetes pueden tener vulnerabilidades. `npm` incluye una herramienta para detectarlas y, a menudo, arreglarlas automáticamente.

```bash
# Analiza tu proyecto en busca de vulnerabilidades conocidas
npm audit

# Intenta arreglar las vulnerabilidades de forma automática
npm audit fix

# Si el arreglo automático requiere cambios que rompen la compatibilidad, puedes forzarlo (¡con cuidado!)
npm audit fix --force
```

### 4.2. Comandos de Mantenimiento Útiles

```bash
# Lista todas las dependencias instaladas en tu proyecto
npm list

# Muestra solo las dependencias de producción y a una profundidad de 0
npm list --prod --depth=0

# Muestra los paquetes que tienen una versión más nueva disponible
npm outdated

# Actualiza los paquetes a la última versión permitida por tu `package.json`
npm update

# Desinstala un paquete y lo elimina de tu `package.json`
npm uninstall <nombre-del-paquete>

# Si algo va mal, la solución más común es borrar node_modules y reinstalar todo
rm -rf node_modules
npm install
```

---

## 🎓 Sección 5: Ejercicios Prácticos

### Ejercicio 1: "Hola NPM" con `cowsay`

1.  **Crea y navega** a una nueva carpeta llamada `mi-primer-proyecto-npm`.
2.  **Inicializa** un proyecto con `npm init -y`.
3.  **Instala** el paquete `cowsay` como una dependencia de producción.
4.  **Crea un archivo** `index.js` y escribe el siguiente código:
    ```javascript
    const cowsay = require("cowsay");

    console.log(cowsay.say({
        text : "¡Estoy aprendiendo NPM!",
        e : "oO",
        T : "U "
    }));
    ```
5.  **Añade un script** a tu `package.json` llamado `"start"` que ejecute `node index.js`.
6.  **Ejecuta tu script** con `npm start` y observa la magia.

### Ejercicio 2: Desarrollo con `nodemon`

1.  En el mismo proyecto, **instala** `nodemon` como una dependencia de desarrollo (`-D`).
2.  **Crea un nuevo script** en `package.json` llamado `"dev"` que ejecute `nodemon index.js`.
3.  **Ejecuta** `npm run dev`.
4.  Ahora, **modifica el texto** dentro de `cowsay.say()` en `index.js` y guarda el archivo. Verás que el script se reinicia automáticamente en la terminal. ¡Esa es la utilidad de una `devDependency`!

---

## 🌐 Sección 6: Publicando tu Propio Paquete (Resumen)

Compartir tu código es uno de los pilares de la comunidad de código abierto.

1.  **Inicia sesión en npm:**
    ```bash
    npm adduser
    ```
2.  **Versiona tu paquete:** Antes de publicar, es una buena práctica asignar una versión. [SemVer (Versionado Semántico)](https://semver.org/lang/es/) es el estándar (ej: `1.0.0`).
    ```bash
    # Actualiza la versión (patch, minor, or major)
    npm version patch
    ```
3.  **Publica tu paquete:**
    ```bash
    npm publish
    ```

> **Nota:** El nombre de tu paquete en `package.json` debe ser único en el registro de `npm`.

¡Y eso es todo! Con esta guía, tienes una base sólida para trabajar con `npm` de manera profesional y eficiente.