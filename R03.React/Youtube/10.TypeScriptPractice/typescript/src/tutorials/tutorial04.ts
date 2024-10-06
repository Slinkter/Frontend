const books = ["1984", "Brave New World", "Fahrenheit 451"];
let foundBook: string | undefined;

for (let book of books) {
    console.log(book);
    if (book === "1984") {
        foundBook = book
        foundBook = foundBook?.toUpperCase()
        break
    }
}
console.log(foundBook?.length);


/* 
console.log(foundBook);
console.log(books);
 */