class BookClass02 {
    private checkedOut: boolean = false;

    constructor(
        readonly title: string,
        public author: string,
        private someValue: number
    ) { }


    get info() {
        return `${this.title} by ${this.author}`
    }

    private set checkOut(checkedOut: boolean) {
        this.checkOut = checkedOut
    }

    get checkOut() {
        return this.checkedOut
    }

    public get someInfo() {
        this.checkOut = true
        return `${this.title} by ${this.author}`
    }


    public getSomeValue() {
        this.someValue;

    }
}

const deeepWoork = new BookClass02("Deep Work", "Norma Zeballos", 2);
console.log(deeepWoork.getSomeValue());
