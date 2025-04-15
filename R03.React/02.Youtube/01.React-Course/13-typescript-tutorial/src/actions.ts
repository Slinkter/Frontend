export let person = "susan"
export function sayHello(name: string) {
    console.log(`hello ${name}`);
}
export type Studen = {
    name: string;
    age: number;
}
const newStudent: Studen = {
    name: "peter",
    age: 24
}

export default newStudent