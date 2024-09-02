//5.11
lista_utiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let a = lista_utiles.map((index) => index * index);
let b = lista_utiles.filter((index) => index > 5);
let c = lista_utiles.reduce((x, y) => x + y);

document.write(a)
document.write(`<br>`)
document.write(b)
document.write(`<br>`)
document.write(c)
