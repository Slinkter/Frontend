class User {

  public email: string
  private name: string
  city: string = ""
  private readonly code: string = "15042"

  constructor(email: string, name: string) {
    this.email = email
    this.name = name
  }
}

const hitesh = new User("lian@co.com", "lian")
hitesh.city = " lima"
hitesh.email = "asd@fasd.com"
//hitesh.name = "new name "

class Instragram {

  private _courseCount = 1

  readonly city: string = "Paris"
  constructor(
    public email: string,
    public name: string
  ) {

  }

  private deleteToken() {
    console.log("delete");

  }

  get getAppleEmail(): string {
    return `apple is ${this.email}`
  }

  get couseCount(): number {
    return this._courseCount
  }
  set couseCount(courseNum) {
    if (courseNum <= 1) {
      throw new Error("course count shoul be more than 1")
    }
    this._courseCount = courseNum

  }
}

const a1 = new Instragram("dasd", "dsada")
// hitesh.deleteToken()