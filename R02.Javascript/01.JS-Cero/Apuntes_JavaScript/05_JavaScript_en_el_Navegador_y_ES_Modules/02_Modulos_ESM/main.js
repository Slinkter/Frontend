// --- Módulo: main.js ---

// 1. Importación Nombrada de 'utils.js'
// Se importan funcionalidades específicas por su nombre entre llaves.
import { PI, sumar } from './utils.js';

// Se puede usar un alias para renombrar una importación.
import { restar as diferencia } from './utils.js';


// 2. Importación por Defecto de 'user.js'
// Se puede nombrar como se desee (aquí usamos 'Usuario' por convención).
import Usuario from './user.js';


// 3. Importación de Espacio de Nombres (Namespace)
// Importa todo lo exportado de forma nombrada en un solo objeto.
import * as utilsCompletas from './utils.js';


console.log('--- Módulos de ES ---');

// Usando las importaciones nombradas
console.log('Valor de PI:', PI);
console.log('Suma (2+3):', sumar(2, 3));
console.log('Resta (10-4) con alias "diferencia":', diferencia(10, 4));

// Usando la importación por defecto
const usuario = new Usuario('Ana');
console.log(usuario.saludar());

// Usando el namespace
console.log('PI desde el namespace:', utilsCompletas.PI);
console.log('Resta desde el namespace (5-1):', utilsCompletas.restar(5, 1));


// 4. Importación Dinámica (se ejecuta al hacer clic en un botón)
document.body.innerHTML += '<button id="dynamic-load-btn">Cargar Módulo Dinámico</button>';

const dynamicButton = document.querySelector('#dynamic-load-btn');
dynamicButton.addEventListener('click', async () => {
  try {
    console.log('Cargando módulo dinámico...');
    // import() devuelve una promesa
    const moduloDinamico = await import('./user.js');
    const AdminUser = moduloDinamico.default; // Accedemos a la exportación por defecto
    const admin = new AdminUser('Admin');
    console.log(`Módulo cargado dinámicamente: ${admin.saludar()}`);
  } catch (error) {
    console.error('Error cargando el módulo dinámico:', error);
  }
});
