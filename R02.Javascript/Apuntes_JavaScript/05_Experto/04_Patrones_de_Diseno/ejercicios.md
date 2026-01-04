# Ejercicios: Patrones

## Ejercicio 1: Implementar Strategy

Crea una clase `ContextoDescuento` que acepte una estrategia de descuento (función) y calcule el precio final.

- Estrategia `sinDescuento`: Retorna precio tal cual.
- Estrategia `clienteVip`: Retorna 20% menos.

```javascript
// Tus estrategias y clase Contexto
```

<details>
<summary>Ver Solución</summary>

```javascript
/**
 * Estrategia de precio sin descuento.
 * @param {number} precio - Precio original.
 * @returns {number} El mismo precio.
 */
const sinDescuento = (precio) => precio;

/**
 * Estrategia de precio para VIPs (20% off).
 * @param {number} precio - Precio original.
 * @returns {number} Precio con descuento.
 */
const clienteVip = (precio) => precio * 0.8;

/**
 * Contexto que utiliza una estrategia de precios intercambiable.
 */
class ContextoDescuento {
  /**
   * @param {function(number): number} estrategia - Función de estrategia inicial.
   */
  constructor(estrategia) {
    this.estrategia = estrategia;
  }

  /**
   * Cambia la estrategia de precios en tiempo de ejecución.
   * @param {function(number): number} estrategia - Nueva función de estrategia.
   */
  setEstrategia(estrategia) {
    this.estrategia = estrategia;
  }

  /**
   * Calcula el precio final usando la estrategia actual.
   * @param {number} precio - Precio base.
   * @returns {number} Precio calculado.
   */
  calcular(precio) {
    return this.estrategia(precio);
  }
}

const ctx = new ContextoDescuento(clienteVip);
console.log(ctx.calcular(100)); // 80
```

</details>

## Ejercicio 2: Singleton con Object Literal

En JS, los objetos literales son Singletons por defecto. ¿Por qué el siguiente código demuestra el patrón Singleton sin necesidad de clases?

```javascript
const Config = {
  api: "http://api.com",
  level: "prod",
};

// En otro archivo...
// import { Config } from './config';
// Config.api = "http://dev.com";
```

¿Si modifico `Config` en un archivo, cambia para todos los demás?

<details>
<summary>Ver Solución</summary>

**Sí.** Los módulos ES6 (y CommonJS) evalúan el módulo una sola vez y guardan la referencia en memoria. Si exportas una instancia de un objeto, esa misma instancia es compartida por todos los importadores. Es el Singleton más nativo de JS.

</details>
