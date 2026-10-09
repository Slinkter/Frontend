/*  Chapter 4 */
class CreateRoom {
    public room: string;
    private family: string[] = [];
    readonly dobShikha: string = "1982-12-12";
    private readonly dobHriday: string = "2013-12-12";
    constructor(name: string) {}
    addFamilyMember(member: string) {
        this.family.push(member);
    }
    showFamily() {
        console.log(this.family);
    }
    cleanRoom(soap: string) {
        console.log(`Cleaning ... ${this.room} with ${soap}`);
    }
}
/*  */

const nabendu = new CreateRoom("Nabendu");
const shikha = new CreateRoom("Shikha");
const hriday = new CreateRoom("Hriday");
const mousam = new CreateRoom("Mousam");
