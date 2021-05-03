import React from 'react';
import { Card, CardBody } from 'reactstrap';


export const OrderItemCard = ({ orderItem }) => {

    return (
        <Card>
            <CardBody>
                <strong>{orderItem.item.name}</strong>
                <p>{orderItem.item.description}</p>
                <p>Quantity Ordered: {orderItem.quantity}</p>
                <p>${orderItem.item.price}</p>
            </CardBody>
        </Card>
    );
};