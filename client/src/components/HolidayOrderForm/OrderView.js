import React, { useState, useContext, useEffect } from 'react';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';
import { List } from 'reactstrap';

export const OrderView = ({ order }) => {

    const { getHolidayById } = useContext(HolidayContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext);

    const [orderItems, setOrderItems] = useState([]);
    const [holiday, setHoliday] = useState();

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    let holidayId = parseInt(order.holidayId)
    let orderId = parseInt(order.id)

    useEffect(() => {
        getHolidayById(holidayId)
            .then(setHoliday)
    }, []);

    useEffect(() => {
        getOrderItemsByOrderId(orderId)
            .then(setOrderItems)
    }, []);


    return holiday ? (
        <>
            <div>
                <h2>Order for {holiday.name} ({dateFormatter(holiday.date)})</h2>
                {
                    order.isCanceled === false ? <h2>Name: {order.userProfile.lastName}, {order.userProfile.firstName}</h2> : <h2>CANCELED - Name: {order.userProfile.lastName}, {order.userProfile.firstName}</h2>
                }
                <h4>PickUp Details: {order.pickUpDateTime}</h4>
            </div>
            <div>
                <List type="unstyled">
                    {
                        orderItems.map((oi) => {
                            return <li key={oi.id}>x{oi.quantity} {oi.item.name} - ${oi.item.price} (each)</li>
                        })
                    }
                </List>
            </div>
        </>
    ) : null
}