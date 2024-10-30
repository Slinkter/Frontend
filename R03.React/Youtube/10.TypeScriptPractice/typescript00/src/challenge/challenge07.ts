enum UserRole {
    Admin,
    Manager,
    Employee,
}

type User = {
    id: number;
    name: string;
    role: UserRole;
    contact: [string, string];
};

function createUser(user: User): User {
    return user;
}

const user: User = createUser({
    id: 1,
    name: "Liam",
    role: UserRole.Admin,
    contact: ["liam@xmail.com", "999-666-333"],
});

console.log(user);
