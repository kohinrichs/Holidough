import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Jumbotron, Container } from 'reactstrap';
import { OrderContext } from '../../providers/OrderProvider';
import { OrderItemContext } from '../../providers/OrderItemProvider';


const OrderView = (props) => {

    // Either need to getOrderById (If we can get the just made id) or get order by CurrentUser and HolidayId
    const { order, getHolidayById } = useContext(OrderContext);
    const { orderItem, getOrderItemsByOrderId } = useContext(OrderItemContext);

    useEffect = () => {
        // need to get order and then use orderId to get order items
    }

    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-3">Thank you for your order!</h1>
                    <p className="lead">Have a question or need to make a change? Email us at holidays@bakery.com or call the shop during store hours (123.456.6789) </p>
                </Container>
            </Jumbotron>

            <div>
                <h2>Order for {order.holiday.name} {order.holiday.date} </h2>
                <h4>PickUp Details: {order.pickUpDateTime}</h4>
            </div>
            <div>
                {
                    orderItem.map((oi) => {
                        return <OrderItemCard key={oi.id} holidayItem={oi} />;
                    })
                }
            </div>

            {/* <div>
                A card for the order total - pretax - could this be something that comes from the DB?
            </div> */}
        </div>
    );

}

export default OrderView;
