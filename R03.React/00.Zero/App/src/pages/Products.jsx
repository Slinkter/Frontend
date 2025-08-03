import React from "react";
import { customFetch } from "../utils";
import Filters from "../components/Filters";
import ProductsContainer from "../components/ProductsContainer";
import PaginationContainer from "../components/PaginationContainer";

const url = "/products";

const allProductsQuery = (queryParams) => {
    const { search, category, company, sort, price, shipping, page } =
        queryParams;

    return {
        queryKey: [
            "products",
            search ?? "",
            category ?? "all",
            company ?? "all",
            sort ?? 10000,
            shipping ?? false,
            page ?? 1,
        ],
        queryFn: () => customFetch(url, { params: queryParams }),
    };
};

export const loader =
    (queryClient) =>
    async ({ request }) => {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        const response = await queryClient.ensureQueryData(
            allProductsQuery(params)
        );
        const products = response.data.data;
        const meta = response.data.meta;
        return { products, meta, params };
    };

const Products = () => {
    return (
        <div>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
        </div>
    );
};

export default Products;
