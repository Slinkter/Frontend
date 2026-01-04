# Clase 03: Performance y Seguridad

## 1. Performance (Rendimiento)

El rendimiento en la web es crítico para la experiencia de usuario (UX) y el SEO (Core Web Vitals).

### 1.1 Critical Rendering Path

Es el proceso que sigue el navegador desde que recibe el HTML hasta que pinta los píxeles.

- **Bloqueo:** CSS y JS (sin `async`/`defer`) bloquean el renderizado.
- **Reflow (Layout):** Calcular posición y geometría de elementos. Costoso.
- **Repaint (Paint):** Colorear píxeles.
- **Composite:** Componer capas. Es lo más eficiente (GPU).

### 1.2 Memory Leaks (Fugas de Memoria)

Ocurren cuando objetos que ya no se necesitan siguen siendo referenciados, impidiendo que el Garbage Collector (GC) libere memoria.

- **Causas comunes:** Listeners de eventos no removidos, intervalos olvidados, referencias en closures globales.

## 2. Seguridad en JavaScript

JavaScript en el cliente es intrínsecamente inseguro (el usuario tiene control total). Sin embargo, debemos proteger la aplicación contra ataques comunes.

### 2.1 XSS (Cross-Site Scripting)

Inyección de scripts maliciosos.

- **Prevención:** NUNCA insertar datos de usuario sin escapar (sanitizar). Evitar `innerHTML`. Usar `textContent` o frameworks que escapen por defecto (React/Vue).

### 2.2 CSRF (Cross-Site Request Forgery)

Ataque donde sitio malicioso fuerza al navegador del usuario a realizar acciones no deseadas en una web donde está autenticado.

- **Prevención:** Tokens Anti-CSRF, Cookies `SameSite`.

### 2.3 Prototypal Pollution

Inyección de propiedades en `Object.prototype`, afectando a todos los objetos.

- **Prevención:** Usar `Object.create(null)`, congelar prototipos, validar JSONs profundos.
