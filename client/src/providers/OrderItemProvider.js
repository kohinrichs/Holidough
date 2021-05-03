import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const OrderItemContext = React.createContext();

export const OrderItemProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [orderItem, setOrderItem] = useState([]);

    const getOrderItemsByOrderId = (orderId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/orderItem/order/${orderId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    return (
        <OrderItemContext.Provider
            value={{
                orderItem,
                getOrderItemsByOrderId
            }}
        >
            {props.children}
        </OrderItemContext.Provider>
    );
};