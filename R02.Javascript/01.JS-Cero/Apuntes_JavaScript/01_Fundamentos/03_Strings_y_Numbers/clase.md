# Clase: Manipulación Avanzada de Strings y Numbers

## 1. Strings: Más Allá del Texto Plano

En JavaScript, los `strings` son un tipo de dato primitivo fundamental, pero su tratamiento es mucho más sofisticado de lo que parece a simple vista. A pesar de ser primitivos, exhiben un comportamiento similar al de los objetos gracias al "boxing" o "envoltura" automática, que les da acceso a un potente conjunto de métodos sin perder los beneficios de la inmutabilidad.

### 1.1. Inmutabilidad y sus Implicaciones en el Rendimiento

La inmutabilidad de los strings es una característica de diseño clave. Significa que cada vez que se "modifica" un string (e.g., con `replace()` o `toUpperCase()`), el motor de JavaScript no altera el string original, sino que crea uno nuevo en memoria.

- **Ventaja:** Esto garantiza que los strings sean predecibles y seguros. Una función no puede modificar un string que le ha sido pasado como argumento, evitando efectos secundarios.
- **Consideración de Ingeniería:** En operaciones que implican una gran cantidad de manipulaciones de strings en bucles (como la concatenación masiva), la creación constante de nuevos strings puede impactar el rendimiento y aumentar la recolección de basura (Garbage Collection). En tales escenarios, es preferible construir un array de strings y unirlos al final con `array.join('')`.

### 1.2. Plantillas Literales (Template Literals - ES6): La Evolución de la Concatenación

Las plantillas literales, introducidas en ES6, revolucionaron la manipulación de strings.

```javascript
const usuario = {
  nombre: 'Elena',
  puntos: 120
};

// Forma antigua (verbosa y propensa a errores)
const mensajeAntiguo = 'El usuario "' + usuario.nombre + '" tiene ' + usuario.puntos + ' puntos.';

// Forma moderna (legible, concisa y segura)
const mensajeModerno = `El usuario "${usuario.nombre}" tiene ${usuario.puntos} puntos.`;
```

**Ventajas Clave:**
1.  **Interpolación (`${...}`):** Permite incrustar expresiones de JavaScript directamente en el string, mejorando drásticamente la legibilidad.
2.  **Multilínea:** Los strings pueden abarcar múltiples líneas sin necesidad de caracteres de escape (`\n`), lo que es ideal para plantillas HTML, consultas SQL, etc.
3.  **Seguridad:** Ayudan a prevenir errores de sintaxis comunes al concatenar con `+`.

## 2. Numbers: Precisión, Límites y Casos Especiales

JavaScript utiliza un único tipo `number` para todos los valores numéricos (enteros y de punto flotante), basado en el estándar IEEE 754 de doble precisión de 64 bits. Esta decisión de diseño tiene consecuencias importantes.

### 2.1. El Problema de la Precisión Decimal

La representación binaria de números de punto flotante puede llevar a imprecisiones en cálculos aritméticos con decimales.

```javascript
0.1 + 0.2 === 0.3; // false
console.log(0.1 + 0.2); // 0.30000000000000004
```

**Solución de Ingeniería:** Para operaciones financieras o científicas que requieren alta precisión, no se debe usar `number` directamente. En su lugar, se recomienda:
-   Trabajar con enteros (e.g., representar `$10.50` como `1050` centavos).
-   Utilizar librerías especializadas como `Decimal.js` o `BigNumber.js`.
-   Para redondear de forma segura, usar `Number.EPSILON` para establecer un margen de error aceptable en las comparaciones.

### 2.2. `parseInt()`, `parseFloat()` y `Number()`

La conversión de strings a números es una tarea común, y es crucial elegir el método correcto.

-   **`parseInt(string, radix)`**: Extrae el *primer* entero de un string. Es fundamental especificar siempre el `radix` (la base, usualmente 10) para evitar que el motor interprete incorrectamente el número (e.g., strings que empiezan con "0x" pueden ser interpretados como hexadecimales).

-   **`parseFloat(string)`**: Extrae un número de punto flotante. Es más directo y no requiere `radix`.

-   **`Number(value)`**: Es un conversor más estricto. Si el string contiene cualquier carácter no numérico (además de los signos y puntos decimales), devolverá `NaN`.

**Recomendación:** Usar `parseInt(string, 10)` para enteros y `parseFloat(string)` para decimales cuando se espera que el string pueda contener otros caracteres al final. Usar `Number(string)` cuando se espera que el string sea puramente numérico.

### 2.3. El Caso de `NaN`

`NaN` ("Not a Number") es un valor numérico especial que indica un resultado indefinido o no representable. Su comportamiento más peculiar es que no es igual a nada, ni siquiera a sí mismo.

```javascript
NaN === NaN; // false
```

Para comprobar si un valor es `NaN`, no se debe usar `===`. La forma correcta y robusta es utilizar la función `Number.isNaN()`.

```javascript
let resultado = 0 / 0; // NaN
console.log(Number.isNaN(resultado)); // true
```

## 3. Conclusión

El manejo experto de `strings` y `numbers` requiere una comprensión de sus mecanismos internos, como la inmutabilidad y la representación de punto flotante. Adoptar prácticas modernas como el uso de plantillas literales y la elección cuidadosa de los métodos de conversión y comparación no solo previene errores, sino que también mejora significativamente la calidad y legibilidad del código.
