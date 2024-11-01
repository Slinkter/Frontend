type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}
/* anothor */
type Student18 = {
    name: string;
    study: () => void;
};
type User18 = {
    name: string;
    login: () => void;
};
type Person18 = Student18 | User18;

const randomPerson18 = (): Person18 => {
    return Math.random() > 0.5
        ? {
              name: "john",
              study() {
                  console.log("Studying");
              },
          }
        : {
              name: "mary",
              login() {
                  console.log("logging in");
              },
          };
};

const personABC18 = randomPerson18();
console.log(personABC18);
function isStuden(p_person: Person18): p_person is Student18 {
    return (p_person as Student18).study !== undefined;
}

if (isStuden(personABC18)) {
    personABC18.study();
} else {
    personABC18.login();
}
