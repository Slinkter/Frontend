const f_requiereParam = (param) => {
  throw new Error(param + " es requerido");
};

function createStudent({
  name = f_requiereParam("name"),
  email = f_requiereParam("email"),
  age = f_requiereParam("age"),
  twitter,
  instragram,
  facebook,
  approvedCourse = [],
  learningPaths = [],
} = {}) {
  // metodos
  const private = {
    _name: name,
  };
  const public = {
    email,
    age,
    approvedCourse,
    learningPaths,
    socialMedia: {
      twitter,
      instragram,
      facebook,
    },
    get name() {
      return private["_name"];
    },
    set name(newName) {
      if (newName.length != 0) {
        return private["_name"];
      } else {
        console.warn("tu nombre esta vacio");
      }
    },
  };

  Object.defineProperty(public, "readName", {
    configurable: false,
    writable: false,
  });

  return public;
}

const juan = createStudent({
  name: "juan",
  email: "juan@test.com",
  age: 18,
  twitter: "juanX",
});

console.log(juan);

function createLearingPath({ name = requiredParam("name"), courses = [] }) {
  const private = {
    _name: name,
    _courses: courses,
  };
  const public = {
    get name() {
      return private["_name"];
    },
    set name(newName) {
      if (newName.length != 0) {
        return private["_name"];
      } else {
        console.warn("tu nombre esta vacio");
      }
    },
    get courses() {
      return private["_courses"];
    },
  };

  return public;
}
