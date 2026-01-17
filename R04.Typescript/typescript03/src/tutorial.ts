let someVaule: never = 0;

type Theme = "light" | "dark";
console.log(Theme);

function checkTheme(tema: Theme): void {
    if (tema === "light") {
        console.log("el tema es claro");
        return;
    }
    if (tema === "dark") {
        console.log("el tema es oscuro");
        return;
    }
}

enum Color {
    Red,
    Blue,
}

function getColorName(x: Color) {
    switch (x) {
        case Color.Red:
            return "red";

        case Color.Blue:
            return "blue";

        default:
            let unexpectedColor: never = x;
            throw new Error("unexpected color value", x);
    }
}
