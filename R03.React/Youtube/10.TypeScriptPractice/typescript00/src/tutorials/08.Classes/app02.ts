class BookClass02 {
    private checkedOut: boolean = false;
    constructor(
        readonly title: string,
        public author: string,
        private someValue: number
    ) {}
    public getSomeValue() {
        return this.someValue;
    }
}

const deeepWoork = new BookClass02("Deep Work", "Norma Zeballos", 2);
console.log(deeepWoork.getSomeValue());
