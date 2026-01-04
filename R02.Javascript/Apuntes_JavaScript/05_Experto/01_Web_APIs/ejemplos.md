# Ejemplos: Web APIs

## 1. Fetch Wrapper Genérico

Crear un wrapper reutilizable para manejar errores HTTP automáticamente.

```javascript
async function request(url, method = "GET", body = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fallo en request:", error);
    throw error;
  }
}

// Uso
request("https://api.ejemplo.com/data").then((data) => console.log(data));
```

## 2. LocalStorage Helper

LocalStorage solo guarda Strings. Debemos serializar (JSON.stringify) y deserializar (JSON.parse).

```javascript
const Storage = {
  get(key) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

Storage.set("usuario", { nombre: "Ana", theme: "dark" });
const user = Storage.get("usuario");
console.log(user.nombre); // "Ana"
```

## 3. Intersection Observer (Lazy Load)

```javascript
const imagenes = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Cargar imagen real
      img.classList.remove("blur");
      observer.unobserve(img); // Dejar de observar
    }
  });
});

imagenes.forEach((img) => observer.observe(img));
```
