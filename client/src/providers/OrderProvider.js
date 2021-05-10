import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const OrderContext = React.createContext();

export const OrderProvider = (props) => {

    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [order, setOrder] = useState([]);

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

    const getOrdersByUserProfileId = () => {
        return getToken()
            .then((token) =>
                fetch(`/api/order/userProfileId`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const getItemQuantitiesByHolidayId = (holidayId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/order/productionnumbers/${holidayId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const addOrder = (order, orderItems) => {
        return getToken().then((token) =>
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order, orderItems }),
            })
        );
    };

    const updateOrder = (order, orderItems) => {
        return getToken().then((token) =>
            fetch('/api/order', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order, orderItems }),
            })
        );
    };

    const cancelOrder = (id) => {
        return getToken().then((token) =>
            fetch(`/api/order/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <OrderContext.Provider
            value={{
                order,
                getAllOrdersByHolidayId,
                getOrderById,
                getOrdersByUserProfileId,
                getItemQuantitiesByHolidayId,
                addOrder,
                updateOrder,
                cancelOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
};