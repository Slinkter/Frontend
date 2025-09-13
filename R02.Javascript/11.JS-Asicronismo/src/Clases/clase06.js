/* ejemplo 1 */
function callback_sum(num1, num2) {
    return num1 + num2;
}

function calc(num1, num2, callback) {
    return callback(num1, num2);
}

console.log(calc(2, 9, callback_sum));

/* ejemplo 2 */
setTimeout(() => {
    console.log("hola JS");
}, 2000);

function gretting(name) {
    console.log(`hola ${name}`);
}

setTimeout(gretting, 300, "oscar");
