console.log("challenge06");
interface Computer {
    readonly id: number;
    brand: string;
    ram: number;
    storage?: number;
    upgradeRam(increase: number): number;
}
const laptop123: Computer = {
    id: 1,
    brand: "HP",
    ram: 8,
    upgradeRam(amount) {
        this.ram += amount;
        return this.ram;
    },
};
laptop123.storage = 256;

console.log(laptop123.upgradeRam(4));
console.log(laptop123);
