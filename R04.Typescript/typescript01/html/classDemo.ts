class Room {
    private family: string[] = [];
    readonly dobShikha: string = "1982-12-12";
    private readonly dobHriday: string = "2013-12-12";
    constructor(public room: string) {}
    addFamilyMember(member: string) {
        this.family.push(member);
    }
    showFamily() {
        console.log(this.family);
    }
    cleanRoom(soap: string) {
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
    constructor(
        room: string,
        private roomRent: number,
    ) {
        super(room);
    }

    changeRoomRet(rent: number) {
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
