const fizzbuzz = (num) => {
    if (typeof num !== "number")
        throw new Error("parameter provider must be a number");
    if (Number.isNaN(num))
        throw new Error("parameter provider must be a number");

    /*     
    if (num === 3) return "fizz";
    if (num === 6) return "fizz";
    if (num === 9) return "fizz";
    if (num === 12) return "fizz"; 
    */
    /*  if (num % 15 === 0) return "fizzbuzz";
    if (num % 5 === 0) return "buzz";
    if (num % 3 === 0) return "fizz";
 */

    const multiples = { 3: "fizz", 5: "buzz" };
    let output = "";

    Object.entries(multiples).forEach(([x, y]) => {
        if (num % x === 0) output += y;
    });

    return output === "" ? num : output;
};

export { fizzbuzz };
