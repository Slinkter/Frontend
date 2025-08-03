import React from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import OrdersList from "../components/OrdersList";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";

const orderQuery = (params, user) => {
    return { queryKey: [], queryFn: () => customFetch.get() };
};

export const loader =
    (store, queryClient) =>
    async ({ request }) => {
        const user = store.getState().userState.user;
        if (!user) {
            toast.warn("you must logged in to view orders");
            return redirect("/login");
        }
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        try {
            const response = await queryClient.ensureQueryData(
                orderQuery(params, user)
            );

            return { orders: response.data.data, meta: response.data.meta };
        } catch (error) {
            console.log(error);
            const errorMessage = error?.response?.data?.error?.message || "";
            toast.error(errorMessage);
            if (error?.response?.status === 401 || 403)
                return redirect("/login");
            return null;
        }
    };

const Orders = () => {
    const { meta } = useLoaderData();

    if (meta.pagination.total < 1) {
        return <SectionTitle text="please make an order" />;
    }

    return (
        <div>
            <SectionTitle text="your orders" />
            <OrdersList />
            <ComplexPaginationContainer />
        </div>
    );
};

export default Orders;
