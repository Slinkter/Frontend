"use strict";
class Room {
    constructor(room) {
        this.room = room;
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
        console.log(`Cleaning ${this.room} with ${soap}`);
    }
}
const nab = new Room("Nabendu");
const shi = new Room("Shikha");
const hri = new Room("Hriday");
const mou = new Room("Mousam");
//nab.dobShikha;
nab.addFamilyMember("Nabendu");
nab.addFamilyMember("Shikha");
nab.addFamilyMember("Hriday");
nab.cleanRoom("Lizol");
nab.showFamily();
class OyoRoom extends Room {
    constructor(room, roomRent) {
        super(room);
        this.roomRent = roomRent;
    }
    changeRoomRet(rent) {
        this.roomRent = rent;
    }
    showRoomRent() {
        console.log(`${this.room} s room rent is ${this.roomRent}`);
    }
}
const shkear = new OyoRoom("shekar", 1000);
shkear.showRoomRent();
shkear.changeRoomRet(2000);
shkear.showRoomRent();
shkear.cleanRoom("pilot");
//# sourceMappingURL=classDemo.js.map