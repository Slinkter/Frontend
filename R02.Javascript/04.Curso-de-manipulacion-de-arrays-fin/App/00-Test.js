class UserAuth {
    constructor(user) {
        this.user = user;
    }

    verifyCredentials() {
        return true;
    }
}

class UserGlass extends UserAuth {
    setting = " ";
    constructor() {
        super(user);
        this.setting = this.setting;
    }
}
