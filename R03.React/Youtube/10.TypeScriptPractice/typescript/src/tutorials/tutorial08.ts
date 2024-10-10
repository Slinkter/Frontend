function sayHi(name: string) {
    console.log(`hello there ${name.toUpperCase()}`);
}

sayHi("liam")

function calcleDiscount(price: number): number {
    const hasDiscount = true
    if (hasDiscount) {
        return price
        // return "Discount Applied"
    }

    return price * 0.9
}

const finalprice = calcleDiscount(200)
console.log(finalprice);



function addThree(number: any) {
    let anotherNumber = 3
    return number + anotherNumber
}

const rpta = addThree(3);
console.log(rpta);
/* const someValue = rpta
someValue.myMethod() */

