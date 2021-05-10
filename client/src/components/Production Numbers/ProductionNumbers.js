import React, { useState, useContext, useEffect } from 'react';
import { FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { OrderContext } from "../../providers/OrderProvider";
import { HolidayContext } from '../../providers/HolidayProvider';

export const ProductionNumbers = () => {

    const { holiday, getAllHolidays } = useContext(HolidayContext);
    const { getAllOrdersByHolidayId } = useContext(OrderContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllHolidays()
    }, []);

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    return (
        <>
            <FormGroup>
                <Label for="holiday">View Production Numbers By Holiday</Label>
                <Input
                    type="select"
                    name="holiday"
                    id="holiday"
                    value={holiday.name}
                    onChange={(e) => {
                        getAllOrdersByHolidayId(parseInt(e.target.value))
                            .then(setOrders)

                        // in the controller, get all items => need to receive back a list of itemIds and quantities 
                    }}
                >
                    <option value="0">Select A Holiday</option>
                    {holiday.map((h) => {
                        return (
                            <option key={h.id} value={h.id}>
                                {h.name} - {dateFormatter(h.date)}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/* {
                orders.length > 0 ? <Table hover bordered>
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
                                    {
                                        o.isCanceled === false ? <td>{o.userProfile.lastName}</td> : < td >CANCELED {o.userProfile.lastName}</td>
                                    }
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
                </Table> : "There are no orders for this holiday."
            } */}
        </>
    );
}