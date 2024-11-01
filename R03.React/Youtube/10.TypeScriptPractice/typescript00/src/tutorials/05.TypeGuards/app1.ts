type valueType = string | number | boolean;
const randomnumber = Math.random();
//
let value101: valueType;
value101 = randomnumber < 0.33 ? "hello" : randomnumber < 0.66 ? 123.45 : true;
function checkValue(p_value: valueType): void {
    if (typeof p_value === "string") {
        console.log(p_value.toLowerCase());
        return;
    }
    if (typeof p_value === "number") {
        console.log(p_value.toFixed(2));
        return;
    }
    console.log(`boolean : ${p_value}`);
}

checkValue(value101);
