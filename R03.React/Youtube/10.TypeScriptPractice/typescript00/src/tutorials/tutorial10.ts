function createEmployee({ id }: { id: number }): {
    id: number;
    isActive: boolean;
} {
    return { id, isActive: id % 2 === 0 };
}

const first = createEmployee({ id: 1 });
const second = createEmployee({ id: 2 });
console.log(first);
console.log(second);

function createStuden(student: { id: number; name: string }): void {
    console.log(`welcome to the course : ${student.name.toUpperCase()}`);
}


const newStudent = { id: 5, name: "anna" }
createStuden(newStudent)


