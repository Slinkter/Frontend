const listName: string[] = ["Liam", "Lorena", "Liza", "Lily"];
console.log(listName);

function isNameInList(name: string): boolean {
    let checkName = listName.includes(name);
    return checkName;
}

const rpta1 = isNameInList("Liza") ? "si " : "no "
console.log(rpta1);

