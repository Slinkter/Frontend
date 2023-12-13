/* Coercion */

4 + "7";
4 * "7";
2 + true;
// explicita
var a = 4 + "7";
var b = 4 * "7";
typeof a;
typeof b;
// implicita
var c = String(a);
var d = Number(c);
typeof c;
typeof d;
