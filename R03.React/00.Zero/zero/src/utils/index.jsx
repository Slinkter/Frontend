import axios from "axios";
const productionUrl = "https://api.example.com/"; // Replace with your production URL

const customFetch = axios.create({
    baseURL: productionUrl,
});

const formatPrice = (number) => {
    const dollarAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format((number / 100).toFixed(2));

    return dollarAmount;
};

const generateAmountOptions = (amount) => {};

export { customFetch, formatPrice, generateAmountOptions };
