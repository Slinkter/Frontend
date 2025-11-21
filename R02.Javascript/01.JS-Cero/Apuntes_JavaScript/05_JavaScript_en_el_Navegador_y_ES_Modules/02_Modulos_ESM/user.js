// --- Módulo: user.js ---

// Exportación por Defecto (Default Export)
// Solo puede haber una por archivo.
export default class User {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return `Hola, mi nombre es ${this.nombre}`;
  }
}
