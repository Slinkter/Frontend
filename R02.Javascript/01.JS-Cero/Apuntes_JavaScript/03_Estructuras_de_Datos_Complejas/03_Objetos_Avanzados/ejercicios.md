# Ejercicios Propuestos: Objetos Avanzados

## Ejercicio 1: Fusión y Actualización de Configuraciones

**Objetivo:** Utilizar el operador de propagación (`...`) y la desestructuración para gestionar un objeto de configuración de forma inmutable.

**Instrucciones:**
Crea una función `aplicarConfiguracion` que reciba dos objetos: `configuracionPorDefecto` y `configuracionUsuario`. La función debe:
1.  Fusionar los dos objetos. La configuración del usuario debe tener prioridad (sobreescribir las claves de la configuración por defecto si coinciden).
2.  Asegurarse de que el `theme` resultante nunca sea `"light"`. Si el `theme` final es `"light"`, debe ser cambiado a `"dark"`.
3.  La función debe devolver un nuevo objeto de configuración final, sin modificar ninguno de los objetos originales.

```javascript
const defaultConfig = {
  theme: 'dark',
  notifications: true,
  cache: {
    enabled: true,
    ttl: 3600
  }
};

const userConfig1 = {
  theme: 'light',
  notifications: false
};

const userConfig2 = {
  version: '2.0',
  cache: {
    ttl: 1800
  }
};

// Tu código para la función 'aplicarConfiguracion' aquí

// Casos de prueba
const finalConfig1 = aplicarConfiguracion(defaultConfig, userConfig1);
console.log(finalConfig1);
/* Esperado:
{
  theme: 'dark', // Cambiado de 'light' a 'dark'
  notifications: false,
  cache: { enabled: true, ttl: 3600 }
}
*/

const finalConfig2 = aplicarConfiguracion(defaultConfig, userConfig2);
console.log(finalConfig2);
/* Esperado:
{
  theme: 'dark',
  notifications: true,
  version: '2.0',
  cache: { ttl: 1800 } // Ojo: el objeto cache se sobreescribe, no se fusiona
}
*/
```

<details>
<summary>Solución Razonada</summary>

```javascript
const defaultConfig = { /* ... */ };
const userConfig1 = { /* ... */ };
const userConfig2 = { /* ... */ };

function aplicarConfiguracion(configuracionPorDefecto, configuracionUsuario) {
  // 1. Fusionar los objetos. El orden es importante.
  // Al poner 'configuracionUsuario' al final, sus propiedades sobreescriben
  // las de 'configuracionPorDefecto'.
  const configuracionFusionada = { ...configuracionPorDefecto, ...configuracionUsuario };

  // 2. Aplicar la lógica del tema.
  // Desestructuramos para extraer el 'theme' y el resto de las propiedades.
  const { theme, ...restoDeConfig } = configuracionFusionada;
  
  // 3. Construir y devolver el objeto final.
  // Usamos un ternario para decidir qué valor de 'theme' usar.
  return {
    theme: theme === 'light' ? 'dark' : theme,
    ...restoDeConfig
  };
}

// Versión más concisa
function aplicarConfiguracionConcisa(defaultConf, userConf) {
  const mergedConf = { ...defaultConf, ...userConf };
  if (mergedConf.theme === 'light') {
    mergedConf.theme = 'dark';
  }
  return mergedConf;
}

// Casos de prueba
const finalConfig1 = aplicarConfiguracion(defaultConfig, userConfig1);
console.log(finalConfig1);

const finalConfig2 = aplicarConfiguracion(defaultConfig, userConfig2);
console.log(finalConfig2);
```

**Explicación:**

1.  `{ ...configuracionPorDefecto, ...configuracionUsuario }`: Esta es la forma canónica de fusionar dos objetos de forma inmutable. El objeto `userConfig1` tiene `theme: 'light'`, por lo que después de este paso, `configuracionFusionada` tendría el tema `"light"`. En el segundo caso, `userConfig2` no tiene `theme`, por lo que se mantiene el de `defaultConfig`.
    **Nota importante:** El spread (`...`) realiza una **copia superficial**. En el caso de `finalConfig2`, todo el objeto `cache` de `defaultConfig` es reemplazado por el objeto `cache` de `userConfig2`, no se fusionan sus propiedades internas.

2.  `const { theme, ...restoDeConfig } = configuracionFusionada;`: Aquí usamos desestructuración con el operador `rest` para aislar la propiedad `theme` y agrupar todo lo demás en un nuevo objeto `restoDeConfig`. Esto nos permite tratar el `theme` por separado.

3.  `{ theme: theme === 'light' ? 'dark' : theme, ...restoDeConfig }`: Finalmente, construimos el objeto de retorno.
    -   Definimos la propiedad `theme` usando un operador ternario para aplicar la regla de negocio.
    -   Usamos el operador `spread` en `...restoDeConfig` para añadir todas las demás propiedades de vuelta al objeto.

Este enfoque es declarativo y garantiza la inmutabilidad, ya que cada paso crea un nuevo objeto en lugar de modificar los existentes.
</details>

---

## Ejercicio 2: Inversión de un Objeto

**Objetivo:** Utilizar `Object.entries` y `reduce` para invertir las claves y valores de un objeto.

**Instrucciones:**
Crea una función `invertirObjeto` que reciba un objeto y devuelva un nuevo objeto donde las claves originales son ahora los valores, y los valores originales son ahora las claves. Asume que todos los valores del objeto original son strings válidos para ser usados como claves.

```javascript
const rolesPorId = {
  '101': 'Admin',
  '102': 'Editor',
  '103': 'Lector'
};

// Tu código para la función 'invertirObjeto' aquí

// Caso de prueba
const idsPorRol = invertirObjeto(rolesPorId);
console.log(idsPorRol);
/*
Esperado:
{
  Admin: '101',
  Editor: '102',
  Lector: '103'
}
*/
```

<details>
<summary>Solución Razonada</summary>

```javascript
const rolesPorId = {
  '101': 'Admin',
  '102': 'Editor',
  '103': 'Lector'
};

function invertirObjeto(obj) {
  // 1. Usamos Object.entries para obtener un array de pares [clave, valor].
  // Para nuestro ejemplo: [['101', 'Admin'], ['102', 'Editor'], ['103', 'Lector']]
  return Object.entries(obj).reduce((acumulador, par) => {
    // 2. En cada iteración, 'par' es uno de los sub-arrays, ej: ['101', 'Admin'].
    // Desestructuramos el par para obtener la clave y el valor originales.
    const [claveOriginal, valorOriginal] = par;

    // 3. Añadimos una nueva propiedad al acumulador.
    // La nueva clave es el valor original, y el nuevo valor es la clave original.
    acumulador[valorOriginal] = claveOriginal;

    // 4. Devolvemos el acumulador para la siguiente iteración.
    return acumulador;
  }, {}); // 5. Empezamos con un objeto vacío como valor inicial del acumulador.
}


// Versión más concisa con desestructuración en los argumentos del callback
function invertirObjetoConciso(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
}


// Caso de prueba
const idsPorRol = invertirObjetoConciso(rolesPorId);
console.log(idsPorRol);
```

**Explicación:**

Este ejercicio demuestra la potencia de combinar los métodos de `Object` con los métodos funcionales de los `Array`.

1.  `Object.entries(obj)` es el primer paso crucial. Transforma el objeto, que no es directamente iterable con métodos de array, en un array de arrays, que sí lo es.

2.  `.reduce((acc, [key, value]) => { ... }, {})` es la herramienta perfecta para construir un nuevo objeto a partir de un array.
    -   El `{}` final es el valor inicial de nuestro `acumulador` (`acc`).
    -   En cada paso, tomamos el par `[key, value]` (desestructurado directamente en los argumentos del callback para mayor concisión).
    -   La línea `acc[value] = key;` realiza la inversión. Por ejemplo, en la primera iteración, se convierte en `acc['Admin'] = '101'`.
    -   Al devolver `acc` en cada paso, vamos construyendo el objeto invertido hasta que `reduce` termina de iterar.
</details>
