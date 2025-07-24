# Arquitectura de Capas

## 1. Capa de Presentación (Frontend)

**Responsabilidad**: Manejar la interacción del usuario, presentar datos y capturar entradas de usuario.

**Componentes**:

-   **Cliente Web**: Aplicación desarrollada utilizando tecnologías web como HTML, CSS y JavaScript. Podría utilizar un framework de JavaScript moderno como React, Angular o Vue.js para crear una interfaz de usuario interactiva y dinámica.
-   **Responsividad**: El frontend debe ser responsivo, lo que significa que se adapta a diferentes dispositivos (móviles, tabletas, computadoras de escritorio).
-   **Acceso API**: El frontend se comunica con el backend mediante llamadas a APIs RESTful.

## 2. Capa de Aplicación (Backend)

**Responsabilidad**: Procesar la lógica de negocio, gestionar datos y coordinar las interacciones entre la capa de presentación y la base de datos.

**Componentes**:

-   **Servidor de Aplicaciones**: Es donde se implementa la lógica de negocio. Puede estar desarrollado en lenguajes como Python (Django, Flask), Node.js, Java (Spring Boot), Ruby (Ruby on Rails), etc.
-   **APIs RESTful**: Expone endpoints que permiten a la capa de presentación realizar operaciones como obtener productos, gestionar el carrito de compras, procesar pagos, etc.
-   **Autenticación y Autorización**: Maneja la seguridad, incluyendo el inicio de sesión de usuarios, control de acceso, y autorización.

## 3. Capa de Datos (Database)

**Responsabilidad**: Almacenar y gestionar datos persistentes utilizados por la aplicación.

**Componentes**:

-   **Base de Datos Relacional**: Se podría utilizar una base de datos SQL como MySQL, PostgreSQL o SQL Server para almacenar datos estructurados como productos, usuarios, pedidos, etc.
-   **Base de Datos NoSQL**: Dependiendo del caso de uso, podría incluirse una base de datos NoSQL como MongoDB para manejar datos no estructurados o semi-estructurados, como registros de actividad o productos con descripciones flexibles.
-   **Caché de Datos**: Implementación de un sistema de caché (por ejemplo, Redis) para acelerar el acceso a datos frecuentes.
-   **Servicios de Almacenamiento de Archivos**: Servicios como Amazon S3 para almacenar archivos grandes, imágenes de productos, etc.

## 4. Capa de Integración (Opcional)

**Responsabilidad**: Integrar la aplicación con servicios externos o microservicios.

**Componentes**:

-   **Servicios Externos**: Integraciones con pasarelas de pago, servicios de envío, APIs de terceros, etc.
-   **Microservicios**: Si se adopta una arquitectura de microservicios, cada microservicio manejará una parte específica de la lógica de negocio (por ejemplo, un servicio para la gestión de inventario, otro para la gestión de usuarios, etc.).

## 5. Capa de Seguridad

**Responsabilidad**: Asegurar la protección de datos y transacciones dentro del sistema.

**Componentes**:

-   **Cifrado de Datos**: Uso de HTTPS para encriptar la comunicación entre el cliente y el servidor.
-   **Autenticación y Autorización Segura**: Uso de OAuth, JWT, o sistemas similares para garantizar que solo usuarios autenticados y autorizados puedan acceder a los recursos necesarios.
-   **Monitorización de Seguridad**: Herramientas para monitorear intentos de acceso no autorizado, brechas de seguridad, etc.

## 6. Capa de DevOps y Mantenimiento

**Responsabilidad**: Gestionar la infraestructura, despliegues y monitorización de la aplicación.

**Componentes**:

-   **CI/CD (Integración Continua / Despliegue Continuo)**: Herramientas como Jenkins, GitLab CI/CD o GitHub Actions para automatizar pruebas y despliegues.
-   **Contenedores y Orquestación**: Uso de Docker para contenerizar la aplicación y Kubernetes para la orquestación de contenedores.
-   **Monitorización y Logging**: Herramientas como Prometheus, Grafana, y ELK Stack (Elasticsearch, Logstash, Kibana) para la monitorización de rendimiento y registro de eventos.

## 7. Capa de Servicios de Soporte (Opcional)

**Responsabilidad**: Proveer servicios adicionales para mejorar la experiencia y funcionalidad del sistema.

**Componentes**:

-   **Notificaciones**: Servicios para enviar correos electrónicos, mensajes SMS, o notificaciones push.
-   **Análisis y Reportes**: Herramientas de análisis de datos para comprender el comportamiento de los usuarios y generar reportes de negocio.

# Atributos de calidad de un producto de software

Si has llegado hasta aquí es porque de verdad quieres pulir tus conocimientos que te permitirán comprender mejor cómo diseñar un buen software. A continuación responderé: **¿Qué es un atributo de calidad cuando hablamos de un producto de Software?** y **¿Cuáles son?**

## ¿Qué es un atributo de calidad cuando hablamos de arquitectura de un producto Software?

Un **atributo de calidad** es una propiedad medible de un sistema que indica qué tan bien el sistema satisface las necesidades de las partes interesadas. También se les conoce como:

-   Requerimientos no funcionales
-   Características de arquitectura
-   Propiedades de calidad

A continuación se presenta un listado de atributos de calidad con una breve explicación de cada uno, según el modelo de calidad ISO25010:

### 1. Compatibilidad

Capacidad de dos o más sistemas o componentes para intercambiar información y/o llevar a cabo sus funciones requeridas cuando comparten el mismo entorno de hardware o software. Esta característica incluye:

-   **Interoperabilidad**: Facilidad de comunicación con componentes externos.
-   **Coexistencia**: Capacidad de estar en un contexto con otros sistemas.

### 2. Usabilidad

Capacidad del producto de software para ser entendido, aprendido, usado y resultar atractivo para el usuario bajo determinadas condiciones. Incluye:

-   **Reconocimiento de idoneidad**: Permite al usuario entender si el software es adecuado para sus necesidades.
-   **Capacidad de aprendizaje**: Permite al usuario aprender su aplicación.
-   **Capacidad para ser usado**: Permite al usuario operarlo y controlarlo fácilmente.
-   **Protección contra errores de usuario**: Previene errores de usuario y proporciona retroalimentación.
-   **Estética de la interfaz de usuario**: Proporciona una interfaz agradable y satisfactoria.
-   **Accesibilidad**: Permite su uso por personas con características o discapacidades específicas.

### 3. Fiabilidad / Confiabilidad

Capacidad de un sistema o componente para desempeñar las funciones especificadas bajo ciertas condiciones y en un período de tiempo determinado. Incluye:

-   **Madurez**: Satisface las necesidades de fiabilidad en condiciones normales.
-   **Disponibilidad**: Permanece operativo y accesible cuando se requiere.
-   **Tolerancia a fallos**: Funciona según lo previsto en presencia de fallos.
-   **Capacidad de recuperación**: Recupera datos y reestablece el estado deseado en caso de fallos.

### 4. Adecuación Funcional

Capacidad del software para proporcionar funciones que satisfacen necesidades específicas en condiciones determinadas. Incluye:

-   **Completitud funcional**: Cubre todas las tareas y objetivos del usuario.
-   **Corrección funcional**: Proporciona resultados correctos con precisión.
-   **Pertinencia funcional**: Proporciona un conjunto adecuado de funciones para tareas específicas.

### 5. Eficiencia de desempeño

Representa el desempeño en relación a los recursos utilizados bajo ciertas condiciones. Incluye:

-   **Comportamiento temporal**: Tiempos de respuesta y procesamiento según un banco de pruebas.
-   **Utilización de recursos**: Recursos utilizados para llevar a cabo su función.
-   **Capacidad**: Cumple con los límites máximos de parámetros requeridos.

### 6. Seguridad

Protege la información y datos para evitar accesos o modificaciones no autorizados. Incluye:

-   **Confidencialidad**: Protege contra el acceso no autorizado.
-   **Integridad**: Previene accesos o modificaciones no autorizadas.
-   **No repudio**: Registra eventos y acciones para evitar el rechazo de los mismos.
-   **Responsabilidad**: Rastrea las acciones de una entidad.
-   **Autenticidad**: Verifica la identidad de usuarios o recursos.

### 7. Mantenibilidad

Capacidad para ser modificado de manera eficiente debido a necesidades de evolución, corrección o perfección. Incluye:

-   **Modularidad**: Minimiza el impacto de los cambios en componentes.
-   **Reusabilidad**: Permite ser usado en múltiples sistemas.
-   **Analizabilidad**: Facilita la evaluación del impacto de cambios.
-   **Capacidad para ser modificado**: Permite modificaciones sin afectar el desempeño.
-   **Capacidad para ser probado**: Facilita la creación y ejecución de pruebas.

### 8. Portabilidad

Capacidad del software para ser transferido de un entorno a otro de manera eficiente. Incluye:

-   **Adaptabilidad**: Permite la adaptación a diferentes entornos.
-   **Capacidad para ser instalado**: Facilita su instalación o desinstalación en entornos específicos.
-   **Capacidad para ser reemplazado**: Permite ser utilizado en lugar de otro producto similar.

Espero que este resumen les sea útil para comprender qué es un atributo de calidad en productos de software y cuáles se aplican en la norma ISO25010.
