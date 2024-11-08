// type alias , usa pascalCase
// optionals propertis
// Union types
// Intersection types

type HeroId = `${string}-${string}-${string}-${string}-${string}`
type HeroPowerScale = "local" | "planetary" | "galactic" | "universal" | "multiversal"
let amm: number | string // union de tipo
amm = 1
amm = "hola"
//amm = true

type Hero = {
    readonly id?: HeroId
    isActive?: boolean
    powerScale?: HeroPowerScale
    name: string,
    age: number,
}

let hero: Hero = {
    name: "thor",
    age: 1000
}

function createHero(hero: Hero): Hero {
    const { name, age } = hero
    return { id: crypto.randomUUID(), name, age, isActive: true }
}
// 56:57
const thor2 = createHero({ name: "pepe", age: 31 })
thor2.powerScale = "multiversal"


type Hexadecimalcolor = `#${string}`
const color1: Hexadecimalcolor = "#0033ff"
const color2: Hexadecimalcolor = "#000000"
























