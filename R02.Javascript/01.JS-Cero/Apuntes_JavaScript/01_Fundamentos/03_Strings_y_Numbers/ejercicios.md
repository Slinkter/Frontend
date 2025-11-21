# Ejercicios Propuestos: Strings y Numbers

## Ejercicio 1: Formateador de Nombres de Archivo

**Objetivo:** Combinar métodos de `String` para resolver un problema práctico.

**Instrucciones:**
Crea una función `formatearNombreArchivo` que reciba un string (el nombre de un archivo). La función debe realizar las siguientes transformaciones y devolver el nuevo nombre:
1.  Convertir todo el nombre a minúsculas.
2.  Reemplazar todos los espacios en blanco por guiones (`-`).
3.  Eliminar cualquier carácter especial (quedarse solo con letras, números, guiones y puntos).
4.  Asegurarse de que el nombre del archivo no termine con un guion. Si lo hace, eliminarlo.

**Pista:** Para el punto 3, puedes usar una expresión regular simple con `replace()`. Por ejemplo, `/[^a-z0-9.-]/g`.

```javascript
// Tu código aquí

// Casos de prueba
console.log(formatearNombreArchivo("  Factura Enero 2023.PDF "));
// "factura-enero-2023.pdf"
console.log(formatearNombreArchivo("Reporte_Ventas_Anual!#.xlsx"));
// "reporte-ventas-anual.xlsx"
console.log(formatearNombreArchivo("Mi Foto de Perfil (copia) -.jpeg"));
// "mi-foto-de-perfil-copia.jpeg"
```

<details>
<summary>Solución Razonada</summary>

```javascript
function formatearNombreArchivo(nombre) {
  // 1. Convertir a minúsculas y quitar espacios al inicio/final
  let nombreLimpio = nombre.toLowerCase().trim();

  // 2. Reemplazar espacios y caracteres no deseados
  // La expresión regular /[^a-z0-9.-]/g busca cualquier carácter que NO sea (^)
  // una letra de la 'a' a la 'z', un número del '0' al '9', un punto o un guion.
  // La 'g' al final asegura que se reemplacen todas las ocurrencias.
  nombreLimpio = nombreLimpio.replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '');

  // 3. Eliminar guion al final si existe
  if (nombreLimpio.endsWith('-')) {
    nombreLimpio = nombreLimpio.slice(0, -1);
  }

  return nombreLimpio;
}

// Versión más encadenada
function formatearNombreArchivoEncadenado(nombre) {
  let nombreLimpio = nombre
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '');

  return nombreLimpio.endsWith('-') ? nombreLimpio.slice(0, -1) : nombreLimpio;
}


// Casos de prueba
console.log(formatearNombreArchivoEncadenado("  Factura Enero 2023.PDF "));
// "factura-enero-2023.pdf"
console.log(formatearNombreArchivoEncadenado("Reporte_Ventas_Anual!#.xlsx"));
// "reporteventasanual.xlsx" (Nota: el guion bajo también se elimina, si se quiere mantener hay que añadirlo a la regex)
// Para mantener el guion bajo: .replace(/[^a-z0-9._-]/g, '')
console.log(formatearNombreArchivoEncadenado("Mi Foto de Perfil (copia) -.jpeg"));
// "mi-foto-de-perfil-copia.jpeg"
```

**Explicación:**
La solución encadena varios métodos de string para procesar el nombre en una secuencia lógica.
1.  `toLowerCase()` y `trim()` preparan el string para un procesamiento consistente.
2.  `replace(/\s+/g, '-')` se encarga de convertir uno o más espacios en un solo guion.
3.  `replace(/[^a-z0-9.-]/g, '')` es un filtro que elimina todo lo que no esté en la lista de caracteres permitidos.
4.  Finalmente, `endsWith()` y `slice()` se usan para limpiar un posible guion al final, resultado de las transformaciones anteriores.
</details>

---

## Ejercicio 2: Calculadora de Propinas

**Objetivo:** Manipular y formatear `Numbers` en un contexto realista.

**Instrucciones:**
Crea una función `calcularPropina` que acepte dos argumentos:
1.  `totalCuenta`: Un string que representa el total de la cuenta (e.g., `"125.50"`).
2.  `porcentajePropina`: Un string para el porcentaje de propina (e.g., `"15%"`).

La función debe:
1.  Convertir ambos strings a números utilizables.
2.  Calcular el monto de la propina.
3.  Calcular el total final (cuenta + propina).
4.  Devolver un objeto con la propina y el total final, ambos formateados como strings con dos decimales.

```javascript
// Tu código aquí

// Caso de prueba
const resultado = calcularPropina("125.50", "15%");
console.log(resultado);
// { propina: "18.83", totalFinal: "144.33" }

const resultado2 = calcularPropina("80", "20%");
console.log(resultado2);
// { propina: "16.00", totalFinal: "96.00" }
```

<details>
<summary>Solución Razonada</summary>

```javascript
function calcularPropina(totalCuenta, porcentajePropina) {
  // 1. Convertir strings a números
  // Usamos parseFloat para manejar decimales y caracteres extra (como '%')
  const cuentaNum = parseFloat(totalCuenta);
  const porcentajeNum = parseFloat(porcentajePropina) / 100;

  // Verificar si las conversiones fueron exitosas
  if (Number.isNaN(cuentaNum) || Number.isNaN(porcentajeNum)) {
    return { error: "Valores de entrada no válidos." };
  }

  // 2. Calcular propina y total
  const propinaCalc = cuentaNum * porcentajeNum;
  const totalFinalCalc = cuentaNum + propinaCalc;

  // 3. Formatear y devolver el resultado
  return {
    propina: propinaCalc.toFixed(2),
    totalFinal: totalFinalCalc.toFixed(2)
  };
}

// Casos de prueba
const resultado = calcularPropina("125.50", "15%");
console.log(resultado);
// { propina: "18.83", totalFinal: "144.33" }

const resultado2 = calcularPropina("80", "20%");
console.log(resultado2);
// { propina: "16.00", totalFinal: "96.00" }

const resultadoError = calcularPropina("ochenta", "20%");
console.log(resultadoError);
// { error: "Valores de entrada no válidos." }
```

**Explicación:**
1.  `parseFloat` es la elección ideal aquí porque puede extraer el número de strings como `"125.50"` y `"15%"`, ignorando el `%` al final.
2.  Se divide el porcentaje entre 100 para obtener su valor decimal para el cálculo.
3.  Se añade una validación con `Number.isNaN()` para manejar casos donde la entrada no sea un número válido. Esta es una práctica robusta.
4.  `toFixed(2)` es el método perfecto para formatear los resultados a una representación monetaria estándar, que siempre debe tener dos decimales. Devuelve un string, que es exactamente lo que necesitamos para la presentación final.
</details>
