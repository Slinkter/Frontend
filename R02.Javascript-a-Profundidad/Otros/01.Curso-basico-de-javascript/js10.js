/* Coercion */
// Coercion explicita
4 + "7";
4 * "7";
2 + true;
var a = 4 + "7";
var b = 4 * "7";
typeof a;
typeof b;
// Coercion implicita
var c = String(a);
var d = Number(c);
typeof c;
typeof d;
