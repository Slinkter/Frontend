let tax: number | string = 10; // union type
tax = 100;
tax = "1000";
/* */
let status: "pending" | "success" | "error" = "pending";
status = "success";
console.log(status);
