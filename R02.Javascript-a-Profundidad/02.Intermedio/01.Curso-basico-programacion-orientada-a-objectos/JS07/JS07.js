//objetos literales, no es recomendable esta estructura
const juan = {
  name: "JuanCC",
  username: "JuanCC",
  points: 100,
  socialMedia: {
    twitter: "t_JuanCC",
    instagram: "ig_JuanCC",
    facebook: "fb_JuanCC",
  },
  approvedCourses: ["curso 1", "curso 2"],
  learningPath: [
    {
      name: "escuela 1",
      Course: [],
    },
    {
      name: "escuela 2",
      Course: [],
    },
  ],
};
// se recomeinda crear instancia de objectos
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

class LearningPath {
  constructor() {}
}

const escuelaWeb = new LearningPath();

const objJuan2 = {
  name: "JuanCC",
  email: "JuanCC@asd.com",
  username: "JuanCC",
  twitter: "JuanTwitter",
};
const juan2 = new Student(objJuan2);
console.log(juan2);
