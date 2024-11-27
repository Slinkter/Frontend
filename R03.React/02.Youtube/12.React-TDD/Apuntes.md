# Vitest

-   no se usa jest ,
-   se usa Vistes
-

```sh
npm init -y
npm install -D vitest
npm install standard -D
```

-   Cambiar en packeage.json

```sh
  "scripts": {
  "test": "vitest"
  },


```

-   ejecuitar en terminal

```sh
npm run test


```

-

```sh
fizzbuzz.test.js
import { describe, expect, it } from "vitest";
import { fizzbuzz } from "../src/test";

describe("fizzbuzz", () => {
it("should be a function", () => {
expect(typeof fizzbuzz).toBe("function");
});
it("show throw if not number is provided as parameter ", () => {
expect(() => fizzbuzz()).toThrow();
});
it("show throw a specific error message if not number is provided as parameter ", () => {
expect(() => fizzbuzz()).toThrow("parameter provider must be a number");
});
it("show throw a specific error message not number is provided ", () => {
expect(() => fizzbuzz(NaN)).toThrow(
"parameter provider must be a number"
);
});
it("should return 1 if number provided is 1", () => {
expect(fizzbuzz(1)).toBe(1);
});

    it("should return 2 if number provided is 2", () => {
        expect(fizzbuzz(2)).toBe(2);
    });
    it("should return 'fizz' if number provided is 3", () => {
        expect(fizzbuzz(3)).toBe("fizz");
    });
    it("should return 'fizz' if number provided is multiple of 3 ", () => {
        expect(fizzbuzz(6)).toBe("fizz");
        expect(fizzbuzz(9)).toBe("fizz");
        expect(fizzbuzz(12)).toBe("fizz");
    });

    it("should return 4", () => {
        expect(fizzbuzz(4)).toBe(4);
    });


    it("show return 'buzz ' if number provided is 5 ", () => {
        expect(fizzbuzz(5)).toBe("buzz");
    });

    it("show return 'buzz ' if number provider is multiple of 5 ", () => {
        expect(fizzbuzz(10)).toBe("buzz");
         expect(fizzbuzz(15)).toBe("buzz");
        expect(fizzbuzz(20)).toBe("buzz");
    });

    it("show return 'fizzbuzz ' if number provider is multiple of 15 ", () => {
        expect(fizzbuzz(15)).toBe("fizzbuzz");
    });

});
```
