let car: { brand: string, year: number } = { brand: "toyata", year: 2020 }
console.log(car);
car.brand = "ford"
console.log(car);
//car.color = "blue"
let car1: { brand: string; year: number } = { brand: "audi", year: 2022 }
console.log(car1)

let book = { title: "book soft", cost: 20 }
let pen = { title: "pen", cost: 10 }
let notebook = { title: "notebook" }

// let items: { readonly title: string; cost: number }[] = [book, pen, notebook]
//console.log(items);


let bike: { brand: string, year: number } = { brand: "yamaha", year: 2010 }
let laptop: { brand: string, year: number } = { brand: "Dell", year: 2020 }

let p1 = { title: "shirt", price: 20 }
let p2 = { title: "pants" }
let products: { title: string, price?: number }[] = [p1, p2]
products.push({ title: "shoes" })