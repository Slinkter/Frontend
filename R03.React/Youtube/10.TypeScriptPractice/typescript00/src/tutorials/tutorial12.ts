console.log("tutorial 12")
//
type Book = { id: number; name: string; price: number }
type DiscountedBook = Book & { discount: number }
//
const book1: Book = { id: 1, name: "Code Clear", price: 15 }
const book2: Book = { id: 2, name: "python", price: 25 }

const discountBookd: DiscountedBook = {
    id: 3,
    name: "React and Redux",
    price: 30,
    discount: 0.15
}