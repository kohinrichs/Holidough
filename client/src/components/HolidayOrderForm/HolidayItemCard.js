import React from 'react';
import { useHistory, } from 'react-router-dom';
import { Card, CardBody, FormGroup, Label, Input } from 'reactstrap';


export const HolidayItemCard = ({ holidayItem }) => {

    // Need to turn the things in the selects into stateObjects that will be saved as order items
    // on save, need to send array of itemIds along with the orderId to the DB to be saved
    // Need to save Order, and then use orderId to save the OrderItems
    // Need call back function to send ItemId and Quantity to HolidayOrderForm 
    // onchange needs to send item Id and quantity to state in HolidayOrderForm
    const history = useHistory();

    // Need to add the rest of the card info and a select for number 
    return (
        <Card>
            <CardBody>
                <strong>{holidayItem.item.name}</strong>
                <p>{holidayItem.item.description}</p>
                <p>${holidayItem.item.price}</p>
                <FormGroup>
                    {/* <Label for="holidayItemQuantity"></Label> */}
                    <Input
                        type="select"
                        name="holidayItemQuantity"
                    // id={holidayItem.id}
                    // value={value}
                    // onChange={(e) => {
                    //     setOrderItemQuantity(e.target.value);
                    // }}
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
        </Card>
    );
};