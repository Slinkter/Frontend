const text = "Im Ironman";

test("It should has the word Ironman", () => {
    expect(text).toMatch(/Ironman/);
});

// Ejemplo 2

const fruits = ["manzana", "platano", "fresa"];
//
test("¿Tenemos mango?", () => {
    expect(fruits).toContain("manzana");
});

//
const x = 10;
const y = 9;
test("mayor que ?", () => {
    expect(x).toBeGreaterThan(y);
});

//
test("Es verdadero ?", () => {
    expect(true).toBeTruthy();
});

//
const reverseString = (str, callback) => {
    callback(str.split("").reverse().join(""));
};

test("Probar un funcion callback", () => {
    reverseString("hola", (str) => {
        expect(str).toBe("aloh");
    });
});

// Clase 5/16
const reverseString2 = (str) => {
    return new Promise((resolve, reject) => {
        if (!str) {
            reject(Error("Error"));
        }
        resolve(str.split("").reverse().join(""));
    });
};

test("probar una promesa", () => {
    return reverseString2("hola").then((string) => {
        expect(string).toBe("aloh");
    });
});

test("probar async/await", async () => {
    const string = await reverseString2("hola");
    expect(string).toBe("aloh");
});

/* 
afterEach(() => console.log("Despues de cada prueba"));
afterAll(() => console.log("Despues de todas prueba"));
beforeEach(() => console.log("Antes de cada prueba"));
beforeAll(() => console.log("Despues de todas prueba"));
 */

// clase 06-16
