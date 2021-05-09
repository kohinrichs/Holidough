import React from 'react';
import { useHistory, } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export const ItemCard = ({ item }) => {
    return (
        <Card>
            <CardBody>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <p>${item.price}</p>
            </CardBody>
        </Card>
    );
};