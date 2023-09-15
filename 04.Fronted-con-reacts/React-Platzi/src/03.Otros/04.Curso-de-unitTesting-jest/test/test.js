const cities = ["buenos aires", "bogota", "lima", "la paz", "guadalajara"];

const randomString = () => {
    const strings = cities[Math.floor(Math.random() * cities.length)];
    return strings;
};

const reverseString2 = (str) => {
    return new Promise((resolve, reject) => {
        if (!str) {
            reject(Error("Error"));
        }
        resolve(str.split("").reverse().join(""));
    });
};

module.exports = randomString;
