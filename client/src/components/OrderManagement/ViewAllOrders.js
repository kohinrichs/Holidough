import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { OrderContext } from "../../providers/OrderProvider";
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';


export const ViewAllOrders = () => {

    const history = useHistory();

    const { holiday, getAllHolidays } = useContext(HolidayContext);
    const { getAllOrdersByHolidayId } = useContext(OrderContext);

    const [orders, setOrders] = useState([]);
    const [holidayId, setHolidayId] = useState();

    useEffect(() => {
        getAllHolidays()
    }, []);

    // get all orders on page load 

    // useEffect(() => {
    //     getAllOrdersByHolidayId(1)
    //         .then(setOrders)
    // }, []);

    // useEffect(() => {
    //     getOrderItemsByOrderId(orderId)
    //         .then(setOrderItems)
    // }, []);

    // select should default to get the orders for the next upcoming holiday

    return (
        <>
            <FormGroup>
                <Label for="holiday">View Orders By Holiday</Label>
                <Input
                    type="select"
                    name="holiday"
                    id="holiday"
                    value={holiday.name}
                    onChange={(e) => {
                        getAllOrdersByHolidayId(parseInt(e.target.value))
                            .then(setOrders)
                    }}
                >
                    <option value="0">Select A Holiday</option>
                    {holiday.map((h) => {
                        return (
                            <option key={h.id} value={h.id}>
                                {h.name}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <Table hover bordered>
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>PickUp Day + Time</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(o => {
                            return <tr key={o.id}>
                                <td>{o.userProfile.lastName}</td>
                                <td>{o.userProfile.firstName}</td>
                                <td>{o.pickUpDateTime}</td>
                                <td>
                                    <Button
                                        value={o.id}
                                        onClick={() =>
                                            history.push(
                                                `/order/details/${o.id}`
                                            )
                                        }
                                    >Details</Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}