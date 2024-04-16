const ranStr = require("../index");

test("probar la funcionlidad", () => {
    expect(typeof ranStr()).toBe("string");
});

// parecido a test
describe("Probar funcionalidades de randomStrings", () => {
    test("probar la funcionalidad", () => {
        expect(typeof ranStr()).toBe("string");
    });
    test("Comprobar que no existe una ciudad", () => {
        expect(ranStr()).not.toMatch(/Cordoba/);
    });
});
