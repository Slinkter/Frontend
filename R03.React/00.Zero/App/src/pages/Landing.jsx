import Hero from "../components/Hero";
import { customFetch } from "../utils";
import ProductsGrid from "../components/ProductsGrid";
const url = "/products?featured=true";

const featuredProductsQuery = {
    queryKey: ["featuredProducts"],
    queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    const products = response.data.data;
    return { products };
};

const Landing = () => {
    return (
        <div>
            <Hero />

            <ProductsGrid />
        </div>
    );
};

export default Landing;
