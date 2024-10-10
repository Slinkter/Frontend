interface BookTutorial {
    readonly isbn: number;
    title: string;
    author: string;
    genre?: string;
    printAuthor(): void;
    printTitlte(msg: string): string;
}

const deepWork: BookTutorial = {
    isbn: 123,
    title: "Deep Work",
    author: "call newPort",
    genre: "self-help",
    printAuthor() {
        console.log(this.author);
    },
    printTitlte(msg) {
        return `${this.title} ${msg}`;
    },
};

deepWork.printAuthor();
const rpta123 = deepWork.printTitlte("is  an awesome book");

console.log(rpta123);
