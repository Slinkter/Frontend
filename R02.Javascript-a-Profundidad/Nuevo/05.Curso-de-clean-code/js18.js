/* unica tarea : Autenticar   */

class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    return false;
  }
}

class UserSetting extends UserAuth {
  constructor(user, settings) {
    super(user);
    this.settings = settings;
  }
  changeSetting(settings) {
    if (this.verifyCredentials()) {
      console.log("Puede modificar su configuracion");
    } else {
      console.log("No tiene acceso");
    }
  }
}

const newAccess = new UserSetting("Alex", "Dark Mode");
newAccess.changeSetting();
