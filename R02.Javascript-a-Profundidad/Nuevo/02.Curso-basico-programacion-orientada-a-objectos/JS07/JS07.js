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
  approvedCourses: ["curso 1", "curso 2", "curso 3"],
  learningPath: [
    {
      name: "ruta 1",
      Course: [],
    },
    {
      name: "ruta 2",
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
    twitter = undefined,
    instagram = undefined,
    facebook = undefined,
    approvedCourses = [],
    leanringPath = [],
  }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.socialMedia = { twitter, instagram, facebook };
    this.approvedCourses = approvedCourses;
    this.leanringPath = leanringPath;
  }
}

const objjuan = new Student(juan);
objjuan.socialMedia.twitter = juan.socialMedia.twitter;
objjuan.socialMedia.instagram = juan.socialMedia.instagram;
objjuan.socialMedia.facebook = juan.socialMedia.facebook;
console.log(objjuan);

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
