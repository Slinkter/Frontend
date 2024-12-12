class Course {
    constructor({ name, classes = [] }) {
        this._name = name;
        this.classes = classes;
    }

    get name() {
        return this._name;
    }

    set name(new_name) {
        if (new_name === "Bad Coding Course") {
            console.error("Hey! Te wa madrear...");
        } else {
            this._name = new_name;
        }
    }
}

const course_one = new Course({
    name: "Course 01",
    classes: [],
});

// Haciendo uso de get and set en Course (pruebas en consola)
course_one;
console.log(course_one.name);

// course_one.name = "Another way to change the name"
// course_one.change_name('A new course name')
course_one.name = "This is the new course name";
console.log(course_one.name);
course_one.name = "Bad Coding Course"; //mensaje error
console.log(course_one.name);
