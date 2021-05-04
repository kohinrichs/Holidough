import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { List, Label, Input, Table, Button } from 'reactstrap';
import { OrderContext } from '../../providers/OrderProvider';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';

export const OrderDetails = () => {

    // This is the orderId
    const { id } = useParams();

    const { getOrderById } = useContext(OrderContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext);
    const { holiday, getAllHolidays } = useContext(HolidayContext);

    const [order, setOrder] = useState();
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        getOrderById(id)
            .then(setOrder)
            .then(() => {
                getAllHolidays();
            })
    }, []);

    useEffect(() => {
        getOrderItemsByOrderId(id)
            .then(setOrderItems)
    }, []);

    let currentHoliday = order ? holiday.find(h => h.id === order.holidayId) : null

    return order && currentHoliday ? (
        <>
            <div>
                <h2>Order for {currentHoliday.name} {currentHoliday.date}</h2>
                <h2>Name: {order.userProfile.lastName}, {order.userProfile.firstName}</h2>
                <h4>PickUp Details: {order.pickUpDateTime}</h4>
            </div>
            <div>
                <List type="unstyled">
                    {
                        orderItems.map((oi) => {
                            return <li key={oi.id}>{oi.item.name}</li>
                        })
                    }
                </List>
            </div>
        </>
    ) : null
}