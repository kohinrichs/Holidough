import React, { useState, useContext, useEffect } from 'react';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Table, List } from 'reactstrap';

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
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems.map((oi) => {
                                return <tr key={oi.id}>
                                    <td>x {oi.quantity}</td>
                                    <td>{oi.item.name}</td>
                                    <td>{oi.item.price}</td>
                                    <td>{oi.quantity * oi.item.price}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <h6>Order Subtotal: $

                    {
                        orderItems.map((oi) => {
                            let orderTotal = (oi.quantity * oi.item.price)
                            return orderTotal
                        }).reduce((a, b) => a + b, 0)
                    }

                     + tax </h6>
            </div>
        </>
    ) : null
}

