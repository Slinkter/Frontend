# Ejemplos: Patrones de Diseño

## 1. Singleton

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = "Conectado";
    Database.instance = this;
  }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true
```

## 2. Factory

```javascript
class Coche {
  constructor() {
    this.ruedas = 4;
  }
}
class Moto {
  constructor() {
    this.ruedas = 2;
  }
}

class VehiculoFactory {
  static crearVehiculo(tipo) {
    if (tipo === "coche") return new Coche();
    if (tipo === "moto") return new Moto();
    throw new Error("Tipo desconocido");
  }
}

const miCoche = VehiculoFactory.crearVehiculo("coche");
```

## 3. Observer (Pub/Sub simple)

```javascript
class Newsletter {
  constructor() {
    this.suscriptores = [];
  }

  suscribir(fn) {
    this.suscriptores.push(fn);
  }

  notificar(data) {
    this.suscriptores.forEach((fn) => fn(data));
  }
}

const news = new Newsletter();

// Observador 1
news.suscribir((email) => console.log(`Enviando a ${email}`));

// Observador 2
news.suscribir((email) => console.log(`Log: ${email} suscrito`));

news.notificar("juan@gmail.com");
```
