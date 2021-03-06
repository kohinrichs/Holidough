import React from 'react';
import { Card, CardBody, FormGroup, Input } from 'reactstrap';

export const OrderItemCard = ({ holidayItem, orderItems, handleSelect }) => {

    let orderItemQuantity = orderItems.find(item => item.itemId === holidayItem.item.id)

    return (
        <Card>
            < CardBody >
                <strong>{holidayItem.item.name}</strong>
                <p>{holidayItem.item.description}</p>
                <p>${holidayItem.item.price}</p>
                <FormGroup>
                    <Input
                        type="select"
                        name="orderItemQuantity"
                        id={holidayItem.item.id}
                        defaultValue={orderItemQuantity?.quantity}
                        onChange={(e) => {
                            handleSelect(`${holidayItem.item.id}`, e.target.value);
                        }}
                    >
                        <option value="0">Select A Quantity</option>
                        <option value="1" >1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                            );
                    </Input>
                </FormGroup>
            </CardBody>
        </Card >
    );
}
