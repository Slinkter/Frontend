/* 
const Usre = {
  name: "liam",
  email: "liam@true.com",
  isActive: true
}

function createUser({ name: string, isPaid: boolean }) {


}

createUser({ name: "lana", isPaid: false })


function createCourse(): { name: string, price: number } {
  return { name: "reachs", price: 322 }
}

let newUser = { name: "reachs", isPaid: "false" }
createUser(newUser) 
*/
/* 
type User = {
  name: string;
  email: string;
  isActive: boolean;
}


function createUser(user: User): User {
  return { name: "", email: "", isActive: true }
}

createUser({ name: "", email: "", isActive: true })
 */


type User = {
  readonly _id: string
  name: string
  email: string
  isActive: boolean
  creaditCardDetails?: number
}

type cardNumber = {
  cardnumber: string
}

type cardDate = {
  cardDate: string
}

type cardDetails = cardNumber & cardDate & { ccv: number } // not good practice







let myUser: User = {
  _id: "13",
  name: "liam",
  email: "jsjd",
  isActive: false,

}
myUser.email = "ada@asc.com"
myUser._id = "dasd"

function createUser(u: User) {

}


export { } 