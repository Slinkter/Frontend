console.log("tutorial 11");

type UserStand = { id: number; name: string; isActive: boolean }

const john: UserStand = {
    id: 1,
    name: "john",
    isActive: true
}

const susan: UserStand = {
    id: 1,
    name: "susan",
    isActive: false
}

function createUserStand(user: UserStand): UserStand {
    console.log(`Hello there ${user.name}`);
    return user
}
createUserStand(susan)
createUserStand(john)

type StringOrNumber = string | number
let value: StringOrNumber
value = "hello"
value = 322

type Theme = "light" | "dark"
let theme: Theme
theme = "dark"
theme = "light"
function setTheme(t: Theme) {
    theme = t
}

setTheme("dark")
console.log(theme);

