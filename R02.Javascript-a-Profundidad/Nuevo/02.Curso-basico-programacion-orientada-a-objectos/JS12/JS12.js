class LearningPath {
  constructor({ name, courses = [] }) {
    this.name = name;
    this.courses = courses;
  }
}

class Course {
  constructor({ name, classes = [] }) {
    this._name = name;
    this.classes = classes;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (newName === "Curso 00") {
      console.log("no ahora ... no");
    } else {
      this._name = newName;
    }
  }

  changeName(newName) {
    return (this._name = newName);
  }
}

const course1 = new Course({ name: "CURSO 1 " });
const course2 = new Course({ name: "CURSO 2 " });
const course3 = new Course({ name: "CURSO 3 " });
const course4 = new Course({ name: "CURSO 4 " });
//
console.log(course1);
course1.name = "Curso -1";
console.log(course1);
course1.changeName("Curso -2");
console.log(course1);
course1.name = "Curso Gratis";
console.log(course1);

//

const escuelaWeb = new LearningPath({
  name: "Escuela de desarrollo web",
  courses: [course1, course2, course3],
});

const escuelaVgs = new LearningPath({
  name: "Escuela de video juegos",
  courses: [course3, course4],
});

class Student {
  constructor({
    name,
    email,
    username,
    facebook = undefined,
    twitter = undefined,
    instagram = undefined,
    approvedCourses = [],
    leanringPath = [],
  }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.socialMedia = { facebook, twitter, instagram };
    this.approvedCourses = approvedCourses;
    this.leanringPath = leanringPath;
  }
}
