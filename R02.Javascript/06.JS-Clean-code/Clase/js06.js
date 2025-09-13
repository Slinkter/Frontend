/* 
Arrays: Plural.
Booleanos:  prefijos “is”, “has” y “can”. (“es verdadero”, “tiene/contiene x”, “puede hacer x”).
Números:   prefijos “min”, “max” y “total”.
Funciones: 
    …de Acceso.       : get + sustantivo
    …de Modificación  : set + sustantivo;
    …de Predicado.    : is + sustantivo; 

Clases: Sustantivos (no genéricos).
*/
// Arrays:
// No recomendado
const user = ["Alex", "Mariana", "Jessica"];
// Regular
const userList = ["Alex", "Mariana", "Jessica"];
// Bueno
const users = ["Alex", "Mariana", "Jessica"];
// Excelente
const userNames = ["Alex", "Mariana", "Jessica"];

//> Booleanos
// No recomendado
const valid = true;
const read = false;
const color = true;
// Recomendado
const isValid = true;
const canRead = false;
const hasColor = true;

//> Números
// No recomendado
// const users = 15;
// Recomendado
const maxUsers = 50;
const minUsers = 10;
const totalUsers = 15;

//> Funciones
// No recomendado
createUserIfNotExist();
updateUserIfNotEmpty();
sendEmailIfIsValid();
// Recomendado
createUser();
updateUser();
sendEmail();
getUser();
setUser();
isValidUser();

//> Clases
// No recomendado
class Data {}
class Manager {}
class Info {}
// Recomendado
class User {}
class UserProfile {}
class Account {}
