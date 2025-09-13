# ¿Qué es Express.js?

**Express.js** es un framework web para Node.js, diseñado para construir aplicaciones web y APIs de manera rápida y sencilla. Es minimalista y flexible, lo que significa que proporciona solo las herramientas básicas necesarias, permitiendo a los desarrolladores agregar funcionalidades adicionales a través de middleware.

## ¿Para qué sirve Express.js?

Express.js se utiliza principalmente para:

1. **Crear Servidores Web**: Facilita la creación de servidores HTTP que pueden manejar solicitudes y respuestas.
2. **Desarrollar APIs**: Permite construir APIs RESTful de manera eficiente.
3. **Manejo de Rutas**: Define cómo la aplicación responde a diferentes rutas y métodos HTTP (GET, POST, PUT, DELETE, etc.).
4. **Middleware**: Utiliza middleware para manejar tareas comunes como la autenticación, el manejo de errores, y la manipulación de datos de solicitudes.

## Funciones Principales de Express.js

1. **Rutas**: Las rutas en Express.js definen cómo la aplicación responde a una solicitud de un cliente en un punto final específico, que es una URI (o ruta) y un método HTTP específico. Por ejemplo:

    ```javascript
    const express = require("express");
    const app = express();

    app.get("/", (req, res) => {
        res.send("¡Hola Mundo!");
    });

    app.listen(3000, () => {
        console.log("Servidor escuchando en el puerto 3000");
    });
    ```

    En este ejemplo, cuando un cliente hace una solicitud GET a la raíz ('/'), el servidor responde con '¡Hola Mundo!'.

2. **Middleware**: Los middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res), y a la siguiente función middleware en el ciclo de solicitud/respuesta de la aplicación. Pueden ejecutar cualquier código, realizar cambios en la solicitud y respuesta, finalizar el ciclo de solicitud/respuesta, y llamar a la siguiente función middleware. Ejemplo de uso de middleware:

    ```javascript
    const express = require("express");
    const app = express();

    // Middleware para registrar cada solicitud
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    app.get("/", (req, res) => {
        res.send("¡Hola Mundo!");
    });

    app.listen(3000, () => {
        console.log("Servidor escuchando en el puerto 3000");
    });
    ```

3. **Gestión de Errores**: Express.js permite manejar errores de manera centralizada, lo que facilita la depuración y el mantenimiento del código.
    ```javascript
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Algo salió mal!");
    });
    ```

## Ventajas de Usar Express.js

-   **Simplicidad y Flexibilidad**: Su diseño minimalista permite a los desarrolladores agregar solo las funcionalidades que necesitan.
-   **Gran Comunidad y Ecosistema**: Hay una gran cantidad de middleware y módulos disponibles que pueden integrarse fácilmente.
-   **Compatibilidad con Node.js**: Aprovecha todas las ventajas de Node.js, como su rendimiento y escalabilidad.

Express.js es una herramienta poderosa para cualquier desarrollador que trabaje con Node.js, permitiendo construir aplicaciones web y APIs de manera eficiente y efectiva.

-   crear el init
    ---> npm init --yes
-   descargar el paquete express
    ---> npm install express
-   se creo la carpeta node_modules.
-   se analisa package.json
-   se visualiza que necesita el paquete express con la version especifica
-   desintalar un paquete
    ---> npm uninstall express
-   instalar un paquete de una version especifica
    ---> npm install express@4.15.1
-   instalar un paquete para desarrollo
    ---> npm install express --save-dev
-   en el package.json esta en DevDependencies
-   package-lock.json , es un archivo de registro de los paquetes cuando se cambia o actualiza la version y dependencias de otros paquetes.
-
