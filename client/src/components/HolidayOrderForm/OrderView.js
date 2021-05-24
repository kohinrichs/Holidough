import React, { useState, useContext, useEffect } from 'react';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Table } from 'reactstrap';

export const OrderView = ({ order }) => {

    const { getHolidayById } = useContext(HolidayContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext);

    const [orderItems, setOrderItems] = useState([]);
    const [holiday, setHoliday] = useState();

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
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
            <div className="orderHeader">
                <h4>Order for {holiday.name} | {dateFormatter(holiday.date)}</h4>
                {
                    order.isCanceled === false ? <h4>{order.userProfile.lastName}, {order.userProfile.firstName}</h4> : <h4><strong>CANCELED</strong> - {order.userProfile.lastName}, {order.userProfile.firstName}</h4>
                }
                <h5>PickUp Details: {order.pickUpDateTime}</h5>
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
                                    <td>${oi.item.price}</td>
                                    <td>${oi.quantity * oi.item.price}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <h6 className="orderSubtotal">Order Subtotal: $

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

