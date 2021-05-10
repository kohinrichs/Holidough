import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { OrderContext } from '../../providers/OrderProvider';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';

export const OrderDetails = () => {

    // This is the orderId
    const { id } = useParams();
    const history = useHistory();

    const { getOrderById, cancelOrder } = useContext(OrderContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext);
    const { holiday, getAllHolidays } = useContext(HolidayContext);

    const [order, setOrder] = useState();
    const [orderItems, setOrderItems] = useState([]);

    const [holidayName, setHolidayName] = useState();
    const [holidayDate, setHolidayDate] = useState();

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

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

    let currentHoliday = order ? holiday.find(h => h.id === order.holidayId) : " "

    useEffect(() => {
        let currentHolidayName = currentHoliday ? currentHoliday.name : " "
        let currentHolidayDate = currentHoliday ? currentHoliday.date : " "

        setHolidayName({ currentHolidayName })
        setHolidayDate({ currentHolidayDate })

    }, [currentHoliday]);


    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel this order? It will still be visible on your order list, but will not appear in production numbers.')) {
            cancelOrder(id)
                .then(() => {
                    history.push("/orders")
                })
        }
    }

    return order && currentHoliday ? (
        <>
            <Button
                onClick={
                    () => {

                        history.push(`/orders/${currentHoliday.id}`)
                    }
                }>Go Back</Button>
            <div>
                <h2>Order for {currentHoliday.name} {dateFormatter(currentHoliday.date)}</h2>
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
            <Button
                onClick={handleCancel}>Cancel Order</Button>

            <Button
                onClick={() => {
                    history.push(`/order/edit/${order.id}/${currentHoliday.id}`)
                }}>Edit Order</Button>
        </>
    ) : null
}