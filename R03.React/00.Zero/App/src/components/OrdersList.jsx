import React from "react";
import { useLoaderData } from "react-router-dom";
import day from "dayjs";

const OrdersList = () => {
    const { orders, meta } = useLoaderData();

    return (
        <div>
            <h4>total orders : {meta.pagination.total}</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Products</th>
                            <th>Cost</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const id = order.id;
                            const {
                                name,
                                address,
                                numItemsInCart,
                                orderTotal,
                                createdAt,
                            } = order.attributes;
                            const date = day(createdAt).format(
                                "hh:mm a - MMM Do,YYY"
                            );
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>{address}</td>
                                    <td>{numItemsInCart}</td>
                                    <td>{orderTotal}</td>
                                    <td className="">{date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;
