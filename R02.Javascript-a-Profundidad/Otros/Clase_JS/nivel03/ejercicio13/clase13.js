AnchoTotal = screen.width;
AlturaTotal = screen.height;

AnchoDisponible = screen.availWidth;
AlturaDisponible = screen.availHeight;

Resolucion = screen.pixelDepth;
Profundidad = screen.colorDepth;

console.log(` hidth :    ${AnchoTotal}`);
console.log(` height :    ${AlturaTotal}`);

console.log(` availWidth :    ${AnchoDisponible}`);
console.log(` availHeight :    ${AlturaDisponible}`);

console.log(` pixelDepth :    ${Resolucion}`);
console.log(` colorDepth :    ${Profundidad}`);