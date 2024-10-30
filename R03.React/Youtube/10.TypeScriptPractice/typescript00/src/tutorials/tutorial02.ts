let tax: number | string = 10
console.log(tax)
tax = 100
console.log(tax)
tax = "$10"
console.log(tax)

let requestStatus: "pending" | "success" | "error" = "pending"
requestStatus = "success"
requestStatus = "error"
console.log(requestStatus);

//requestStatus = "random"