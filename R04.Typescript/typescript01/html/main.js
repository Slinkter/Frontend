"use strict";
/*  Chapter 4 */
class CreateRoom {
    constructor(name) {
        this.family = [];
        this.dobShikha = "1982-12-12";
        this.dobHriday = "2013-12-12";
    }
    addFamilyMember(member) {
        this.family.push(member);
    }
    showFamily() {
        console.log(this.family);
    }
    cleanRoom(soap) {
        console.log(`Cleaning ... ${this.room} with ${soap}`);
    }
}
/*  */
const nabendu = new CreateRoom("Nabendu");
const shikha = new CreateRoom("Shikha");
const hriday = new CreateRoom("Hriday");
const mousam = new CreateRoom("Mousam");
//# sourceMappingURL=main.js.map