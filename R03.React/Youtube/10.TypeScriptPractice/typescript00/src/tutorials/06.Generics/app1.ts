/* 
let arrayg1: Array<string> = ["Apple", "banana", "mango"];
 */

function genericFunction<T>(arg: T): T {
    return arg;
}

const someStringValue = genericFunction<string>("hello world");
const someNumberValue = genericFunction<number>(2);

interface GenericInterface<T> {
    value: T;
    getValue: () => T;
}

const genericString: GenericInterface<string> = {
    value: "hello world",
    getValue() {
        return this.value;
    },
};

async function someFunc(): Promise<number> {
    return 2344;
}
