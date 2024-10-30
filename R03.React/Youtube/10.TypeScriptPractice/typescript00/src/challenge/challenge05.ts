console.log("challenge 05 ")

type Employee = { id: number; name: string; department: string }
type Manager = { id: number, name: string; employees: Employee[] }
type Staff = Employee | Manager

function printStaff(inputStaff: Staff): void {
    if ("employees" in inputStaff) {
        console.log(`${inputStaff.name} is a manage in the ${inputStaff.employees.length} employees`);

    } else {
        console.log(`${inputStaff.name} is an employee in the ${inputStaff.department} department`);

    }


}

const alice: Employee = { id: 1, name: "alice", department: "Sales" }
const steve: Employee = { id: 2, name: "steve", department: "HR" }
const bob: Manager = { id: 1, name: "bob", employees: [alice, steve] }

printStaff(alice)
printStaff(steve)
printStaff(bob)