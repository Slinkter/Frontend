type User = { id: number; name: string; isActive: boolean };

const john: User = {
  id: 1,
  name: "john",
  isActive: true,
};

console.log(john);

function createUser(user: User): User {
  console.log(`hello there ${user.name.toUpperCase()}`);
  return user;
}

type Both = string | number;

let value: Both;
value = "2";
value = 2;
console.log(value);

type Theme = "light" | "dark";
