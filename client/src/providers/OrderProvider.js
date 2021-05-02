import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const OrderContext = React.createContext();

export const OrderProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [order, setOrder] = useState([]);

    const history = useHistory();

    const getAllOrdersByHolidayId = (holidayId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/order/holiday/${holidayId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const getOrderById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/order/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const addOrder = (order) => {
        return getToken().then((token) =>
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })
        );
    };

    return (
        <OrderContext.Provider
            value={{
                order,
                getAllOrdersByHolidayId,
                getOrderById,
                addOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
};