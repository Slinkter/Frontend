class UserAuth {
  constructor(user) {
    this.user = user;
  }
  checkCredencials() {
    return false;
  }
}

class UserPlantArena extends UserAuth {
  constructor(user, setting) {
    super(user);
    this.setting = setting;
  }
  CheckSetting(setting) {
    if (this.checkCredencials()) {
      console.log("si puede modificar");
    } else {
      console.log("no puede modificar ");
    }
  }
}

const newAccess = new UserPlantArena("Alex", "Dark Mode");
console.log(newAccess.CheckSetting());
console.log(newAccess);
