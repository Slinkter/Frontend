# Clase 04: Patrones de Diseño

Los patrones de diseño son soluciones típicas a problemas comunes en el diseño de software. En JavaScript, algunos patrones son nativos del lenguaje y otros requieren implementación manual.

## 1. Patrones Creacionales

### 1.1 Singleton

Asegura que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

- **Uso:** Variables de entorno, conexiones a base de datos, Store de estado (Redux).

### 1.2 Factory Method

Define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase instanciar.

- **Uso:** Cuando la creación del objeto es compleja o depende de configuración.

## 2. Patrones Estructurales

### 2.1 Module Pattern

(Visto en la sección de Módulos). Uso de closures o ESM para encapsular métodos privados y exponer una API pública.

### 2.2 Adapter

Permite que interfaces incompatibles trabajen juntas.

- **Uso:** Envolver una librería antigua o una API externa para que coincida con la interfaz que tu aplicación espera.

## 3. Patrones de Comportamiento

### 3.1 Observer (Pub/Sub)

Define una dependencia uno-a-muchos entre objetos. Cuando el sujeto cambia de estado, todos sus dependientes (observadores) son notificados y actualizados.

- **Uso:** Event Listeners del DOM, RxJS, Sockets.

### 3.2 Strategy

Define una familia de algoritmos, encapsula cada uno, y los hace intercambiables.

- **Uso:** Validaciones de formularios (distintas estrategias de validación), métodos de pago.
