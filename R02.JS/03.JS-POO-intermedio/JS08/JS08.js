const numbers = [12, 351, 123, 54, 657, 568, 76, 4354, 1231];

for (let i = 0; i < numbers.length; ++i) {
    console.log("i : ", i, " numeros : ", numbers[i]);
}

function recursiva(num) {
    if (num < 5) {
        return recursiva(num + 1);
    } else {
        return 5;
    }
}

function recursivaArray(arrayRandom) {
    if (arrayRandom.length != 0) {
        const getFirstElement = arrayRandom[0];
        arrayRandom.shift();
        recursivaArray(arrayRandom);
    } else {
        console.log("end of array");
    }
}
recursivaArray(numbers);

// subject puede ser un elemento,string,array ,objecto
function isObject(subject) {
    return typeof subject === "object";
}
function isArray(subject) {
    return Array.isArray(subject);
}
// subject puede ser un elemento,string,array ,objecto
function deepCopy(subject) {
    let copySubject;
    const isArraySubject = isArray(subject);
    const isObjectSubject = isObject(subject);

    if (isArraySubject) {
        copySubject = [];
    } else if (isObjectSubject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);
        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (isArraySubject) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }

    return copySubject;
}

const obj1 = {
    a: "a",
    b: "b",
    x: {
        d: "d",
        e: "e",
    },
    editA() {
        this.a = "modificar a";
    },
};

const juan = deepCopy(student);
juan.name = "juan";
console.log(juan);

// evitar la propiedad name de juan
// evitar eliminar la propiedad name (delete)
const p1 = Object.defineProperty(juan, "name", {
    value: "juanito",
    configurable: false,
});

console.log(p1);
// evitar eliminar global propiedad a juan
console.log(Object.seal(juan));
juan.name = "juanito";
Object.isSealed(juan); // proteger de eliminar propiedades
Object.isFrozen(juan); // permite editar las propiedades
