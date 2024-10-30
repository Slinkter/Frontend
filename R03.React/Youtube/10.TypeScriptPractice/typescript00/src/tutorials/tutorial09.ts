function calculate(price: number, discount?: number): number {
    return price - (discount || 0)
}


function calculeScore(initialscore: number, penality: number = 0): number {
    return initialscore - penality
}
let priceDiscoun = calculate(100, 20)
let pricePenality = calculeScore(200)
console.log(priceDiscoun);
console.log(pricePenality);


function sum(message: string, ...numbers: number[]): string {
    const doubled = numbers.map(num => num * 2)
    console.log(doubled);
    let total = doubled.reduce((prev, acc) => { return prev + acc })
    console.log(total);
    return `${message} ${total}`
}

let result = sum("tota is :", 1, 2, 3, 4, 5)
console.log(result);
















