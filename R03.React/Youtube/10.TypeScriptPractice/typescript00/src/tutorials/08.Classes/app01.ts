class BookClass {
    public readonly titile: string;
    public author: string;
    private checkedOut: boolean = false;
    //
    constructor(title: string, author: string) {
        this.titile = title;
        this.author = author;
    }

    public checkOut() {
        this.checkedOut = true;
    }
    public isCheckedOut() {
        return this.checkedOut;
    }
    private toggleCheckedOutStatus() {
        return !this.checkedOut;
    }
}

const deepWorkClass = new BookClass("Deep work", "Norma Zamora");
console.log(deepWorkClass);
deepWorkClass.checkOut();
console.log(deepWorkClass);

console.log(deepWorkClass.isCheckedOut());
deepWorkClass.toggleCheckedOutStatus();
console.log(deepWorkClass);
