let score: number | string | boolean = 33
score = 44
score = "55"
score = false

type User = {
  name: string
  id: number
}
type Admin = {
  username: string
  id: number
}

let liam: User | Admin = { name: "liam", id: 322 }// type user
liam = { username: "da", id: 124 } // type admin


function getDbId(id: number | string) {
  if (typeof id === "string") {
    id.toLowerCase()
  }
  if (typeof id === "number") {
    id.toLowerCase()
  }

}
getDbId(3)
getDbId("3")

// array
const data: number[] = [1, 2, 3, 4, 5, "6"] // incorrect
const dataNum: number[] = [1, 2, 3, 4, 5, 6]
const dataString: string[] = ["1", "2", "3"]
const dataBoth: (number | string | boolean)[] = [1, "2", 3, false]
const dataAny: any[] = [1, "2", 3, false]


let seatAllotment: "aisle" | "middle" | "window"
seatAllotment = "aisle"
seatAllotment = "crew"
