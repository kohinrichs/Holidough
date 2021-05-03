import React, { useState, useContext, useEffect } from 'react';
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';
import { OrderItemCard } from './OrderItemCard';

export const OrderView = ({ order }) => {

    const { holiday, getHolidayById } = useContext(HolidayContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext);

    const [orderItems, setOrderItems] = useState([]);

    let holidayId = parseInt(order.holidayId)
    let orderId = parseInt(order.id)

    useEffect(() => {
        getHolidayById(holidayId)
    }, []);

    useEffect(() => {
        getOrderItemsByOrderId(orderId)
            .then(setOrderItems)
    }, []);

    return (
        <div>
            <div>
                <h2>Order for {holiday[0].name} {holiday[0].date}</h2>
                <h4>PickUp Details: {order.pickUpDateTime}</h4>
            </div>
            <div>
                {
                    orderItems.map((oi) => {
                        return <OrderItemCard key={oi.id} orderItem={oi} />;
                    })
                }
            </div>

            {/* <div>
                A card for the order total - pretax - could this be something that comes from the DB?
            </div> */}
        </div>
    );

}