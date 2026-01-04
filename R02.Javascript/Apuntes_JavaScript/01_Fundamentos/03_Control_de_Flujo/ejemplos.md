# Ejemplos: Control de Flujo

## 1. Patrón Early Return (If)

Refactorización para evitar el anidamiento.

```javascript
// Mal: Anidado
function procesarUsuario(usuario) {
  if (usuario) {
    if (usuario.activo) {
      if (usuario.rol === "admin") {
        return "Acceso concedido";
      }
    }
  }
  return "Acceso denegado";
}

// Bien: Early Return
function procesarUsuarioMejorado(usuario) {
  if (!usuario) return "Acceso denegado";
  if (!usuario.activo) return "Acceso denegado";
  if (usuario.rol !== "admin") return "Acceso denegado";

  return "Acceso concedido";
}
```

## 2. For...of vs For...in

```javascript
const colores = ["rojo", "verde", "azul"];
colores.propiedadExtra = "Soy una propiedad";

// for...of itera VALORES (Recomendado para Arrays)
for (const color of colores) {
  console.log(color); // "rojo", "verde", "azul"
}

// for...in itera CLAVES/INDICES (No recomendado para Arrays)
for (const key in colores) {
  console.log(key); // "0", "1", "2", "propiedadExtra"
}
```

## 3. Manejo de Errores

```javascript
function dividir(a, b) {
  try {
    if (b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    return a / b;
  } catch (e) {
    console.error("Error capturado:", e.message);
    return null; // Retorno seguro en caso de fallo
  } finally {
    console.log("Operación de división finalizada");
  }
}

dividir(10, 0);
// Output:
// "Error capturado: No se puede dividir por cero"
// "Operación de división finalizada"
```
