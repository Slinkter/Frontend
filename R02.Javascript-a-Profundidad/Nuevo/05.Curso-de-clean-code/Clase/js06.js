/* 
Arrays: Plural.
Booleanos: Con prefijos “is”, “has” y “can”. (“es verdadero”, “tiene/contiene x”, “puede hacer x”).
Números: añadir  prefijos “min”, “max” y “total”.
Funciones: representan un accion ,
    Verbo + sustantivo/s (ya que son acciones).
    …de Acceso: get + sustantivo
    …de Modificación: set + sustantivo;
    …de Predicado: is + sustantivo; 

Clases: Sustantivos (no genéricos).
*/

// Arrays:
const users = ["Alex", "Mariana", "Jessica"];

//Booleanos:
const isValid = true;
const hasColor = true;
const canRead = false;

//Números:
const maxUsers = 50;
const minUsers = 10;
const totalUsers = 15;

//Funciones:
createUser(); // verb : create
updateUser(); // verb : update
sendEmail(); // verb : send
getUser(); //Acceso:
setUser(); //Modificación:
isValidUser(); //Predicado:

//Clases:
class User {}
class UserProfile {}
class Account {}
