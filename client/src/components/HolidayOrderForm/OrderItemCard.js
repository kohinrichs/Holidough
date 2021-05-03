import React from 'react';
import { Card, CardBody } from 'reactstrap';


export const HolidayItemCard = ({ orderItem }) => {

    return (
        <Card>
            <CardBody>
                <strong>{orderItem.item.name}</strong>
                <p>{orderItem.item.description}</p>
                <p>{holidayItem.quantity}</p>
                <p>${holidayItem.item.price}</p>
            </CardBody>
        </Card>
    );
};