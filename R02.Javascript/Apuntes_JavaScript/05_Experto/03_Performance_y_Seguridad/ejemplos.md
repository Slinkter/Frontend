# Ejemplos: Performance y Seguridad

## 1. Debounce (Optimización de Eventos)

Evitar que una función se ejecute demasiadas veces seguidas (ej. resize, scroll, input search).

```javascript
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const guardarCambios = debounce(() => {
  console.log("Guardando en BD...");
}, 1000);

// Aunque se llame 100 veces, solo se ejecutará 1 vez al final
window.addEventListener("resize", guardarCambios);
```

## 2. Evitar Memory Leaks

### Malo ❌

```javascript
function suscribir() {
  const data = new Array(1000000).fill("data"); // Gasta memoria
  // El listener mantiene referencia a 'data' vía closure
  window.addEventListener("scroll", () => {
    console.log(data.length);
  });
}
// Si suscribir() se llama muchas veces, los listeners se acumulan y 'data' nunca se libera.
```

### Bueno ✅

```javascript
function suscribir() {
  const onScroll = () => console.log("Scroll");
  window.addEventListener("scroll", onScroll);

  // Retornar método para limpiar
  return function cancelar() {
    window.removeEventListener("scroll", onScroll);
  };
}
```

## 3. Sanitización Básica (Seguridad)

```javascript
function sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.textContent = str; // Esto escapa automáticamente HTML
  return temp.innerHTML;
}

const inputUsuario = "<img src=x onerror=alert(1)>";
const seguro = sanitizeHTML(inputUsuario);
console.log(seguro); // "&lt;img src=x onerror=alert(1)&gt;" (Texto plano, no ejecutable)
```
