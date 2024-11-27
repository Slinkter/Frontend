import { describe, expect, it } from "vitest";

const f_canConfigure = (from) => {
    if (from === undefined) {
        throw new Error("from is required");
    }
    if (typeof from !== "string") {
        throw new Error("");
    }
};

//
describe("canReconfigure", () => {
    it("should be a function", () => {
        expect(typeof f_canConfigure).toBe("function");
    });
    it("should throw if first parametr is missing ", () => {
        expect(() => f_canConfigure()).toThrow();
    });
    it("should throw if first parameter is not a string", () => {
        expect(() => f_canConfigure(2)).toThrow();
    });


    
});
