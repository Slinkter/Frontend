https://github.com/platzi/curso-javascript/tree/main

## Clase 7/79

```JS

// Paso por valor

let x = 1
let y = 'Hola'
let z = null

let a = x
let b = y
let c = z

console.log(x, y, z, a, b, c)

a = 12
b = 'Platzi'
c = undefined

// Paso por referencia

let frutas = ['manzana']
frutas.push('pera')
console.log(frutas)

let panes = ['ðŸ¥']
let copiaDePanes = panes
panes.push('ðŸ¥–')
console.log(panes, copiaDePanes)

```

## Clase 8/79

```JS
let frutas={naranja:'ðŸŠ'}
let vegetales=frutas
vegetales.naranja='ðŸ¥¦'
console.log(frutas)
let ropa={blusa:'ðŸ‘š'}
ropa.pantalon='ðŸ‘–'
console.log(ropa)
```

## Clase 9/79

```JS
const primeraOpcion='Comillas simples'
const segundaOpcion="Comillas simples"
const terceraOpcion=`Comillas simples`
const direccion='Calle falsa 123'
const ciudad='Springfield'
const direccionCompleta='Mi direcciÃ³n completa es '+direccion+ciudad
console.log(direccionCompleta)
const direccionCompletaConEspacio='Mi direcciÃ³n completa es '+direccion+' '+ciudad
console.log(direccionCompletaConEspacio)
const nombre='Estefany'
const pais='ðŸ‡¨ðŸ‡´'
const presentacion=`Hola, soy ${nombre} de ${pais}`
console.log(presentacion)
const primeraParte='Me encanta'
const segundaParte='la gente de'
const terceraParte='ðŸ‡²ðŸ‡½'
const pensamiento=[primeraParte,segundaParte,terceraParte]
console.log(pensamiento.join(' ðŸŒ¯ '))
const hobbie1='correr'
const hobbie2='leer'
const hobbie3='estudiar'
const hobbies='Mis hobbies son: '.concat(hobbie1,', ',hobbie2,', ',hobbie3,'.')
console.log(hobbies)
const escapeAlternativo="I'm Software Engineer"
const escapeBarraInvertida='I\'m Software Engineer'
const escapeComillaInvertida=`I'm Software Engineer`
const poema='Las rosas son rojas,\n'+
'Las violetas son azules,\n'+
'Caracter inesperado,\n'+
'En la lÃ­nea 86.'
console.log(poema)
const poema2='Las rosas son rojas,\n\
Las violetas son azules,\n\
Caracter inesperado,\n\
En la lÃ­nea 86.'
console.log(poema2)
const poema3=`Las rosas son rojas,
Las violetas son azules,
Caracter inesperado,
En la lÃ­nea 86.`
console.log(poema3)
```

## Clase 10/79

```JS
const primeraOpcion='Comillas simples'
const segundaOpcion="Comillas simples"
const terceraOpcion=`Comillas simples`
const direccion='Calle falsa 123'
const ciudad='Springfield'
const direccionCompleta='Mi direcciÃ³n completa es '+direccion+ciudad
console.log(direccionCompleta)
const direccionCompletaConEspacio='Mi direcciÃ³n completa es '+direccion+' '+ciudad
console.log(direccionCompletaConEspacio)
const nombre='Estefany'
const pais='ðŸ‡¨ðŸ‡´'
const presentacion=`Hola, soy ${nombre} de ${pais}`
console.log(presentacion)
const primeraParte='Me encanta'
const segundaParte='la gente de'
const terceraParte='ðŸ‡²ðŸ‡½'
const pensamiento=[primeraParte,segundaParte,terceraParte]
console.log(pensamiento.join(' ðŸŒ¯ '))
const hobbie1='correr'
const hobbie2='leer'
const hobbie3='estudiar'
const hobbies='Mis hobbies son: '.concat(hobbie1,', ',hobbie2,', ',hobbie3,'.')
console.log(hobbies)
const escapeAlternativo="I'm Software Engineer"
const escapeBarraInvertida='I\'m Software Engineer'
const escapeComillaInvertida=`I'm Software Engineer`
const poema='Las rosas son rojas,\n'+
'Las violetas son azules,\n'+
'Caracter inesperado,\n'+
'En la lÃ­nea 86.'
console.log(poema)
const poema2='Las rosas son rojas,\n\
Las violetas son azules,\n\
Caracter inesperado,\n\
En la lÃ­nea 86.'
console.log(poema2)
const poema3=`Las rosas son rojas,
Las violetas son azules,
Caracter inesperado,
En la lÃ­nea 86.`
console.log(poema3)
```

## Clase 11/79

```JS
// 1. Tipo entero y decimal
const entero = 42
const decimal = 3.14
console.log(typeof entero, typeof decimal)

// 2. NotaciÃ³n cientÃ­fica
const cientifico = 5e3

// 3. Infinitos y NaN
const infinito = Infinity
const noEsUnNumero = NaN

// Operaciones aritmÃ©ticas

// 1. Suma, Resta, MutiplicaciÃ³n y DivisiÃ³n
const suma = 3 + 4
const resta = 4 - 4
const mutiplicacion = 4 * 7
const division = 16 / 2

// 2. MÃ³dulo y ExponenciaciÃ³n
const modulo = 15 % 8
const exponenciacion = 2 ** 3

// PrecisiÃ³n
const resultado = 0.1 + 0.2
console.log(resultado)
console.log(resultado.toFixed(1))
console.log(resultado === 0.3)

// Operaciones Avanzadas
const raizCuadrada = Math.sqrt(16)
const valorAbsoluto = Math.abs(-7)
const aleatorio = Math.random()
console.log(raizCuadrada)
console.log(valorAbsoluto)
console.log(aleatorio)
```

## Clase 12/79

```JS

```
