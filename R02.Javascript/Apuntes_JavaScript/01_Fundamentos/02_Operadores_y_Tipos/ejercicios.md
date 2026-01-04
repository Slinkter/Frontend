# Ejercicios: Operadores y Lógica

## Ejercicio 1: Coerción

¿Cuál es el output de las siguientes operaciones?

1. `[] == ![]`
2. `true == "true"`
3. `NaN === NaN`

<details>
<summary>Ver Solución</summary>

1.  **true**:
    - `![]` -> `false` (Array es truthy, negado es false).
    - `[] == false`
    - `[]` se convierte a primtivo `""`.
    - `"" == false` -> `0 == 0` -> **true**.
2.  **false**:
    - `true` se convierte a número `1`.
    - `"true"` se convierte a número `NaN`.
    - `1 == NaN` -> **false**.
3.  **false**: - `NaN` es el único valor en JS que no es igual a sí mismo. Se debe usar `Number.isNaN()` o `Object.is()`.
</details>

## Ejercicio 2: Refactorización con Operadores Lógicos

Reescribe la siguiente función usando un solo `return` y operadores lógicos, sin `if`.

```javascript
function puedeConducir(edad, tieneLicencia) {
  if (edad >= 18) {
    if (tieneLicencia) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

<details>
<summary>Ver Solución</summary>

```javascript
function puedeConducir(edad, tieneLicencia) {
  return edad >= 18 && tieneLicencia;
}
```

</details>

## Ejercicio 3: Nullish Coalescing

Dado un objeto de configuración incompleto, asigna valores por defecto solo si faltan (`null` o `undefined`).

```javascript
const userSettings = {
  theme: "dark",
  notifications: false, // El usuario no quiere notificaciones
  retries: 0, // Intentos explícitos
};

// Tu código aquí: crea variables theme, notif, retries con defaults (light, true, 3)
```

<details>
<summary>Ver solución</summary>

```javascript
const theme = userSettings.theme ?? "light";
const notif = userSettings.notifications ?? true; // Si fuese ||, false activaría el default true (error)
const retries = userSettings.retries ?? 3; // Si fuese ||, 0 se convertiría en 3 (error)

console.log(theme, notif, retries); // "dark", false, 0
```

</details>
