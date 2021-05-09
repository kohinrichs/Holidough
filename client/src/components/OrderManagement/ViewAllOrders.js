import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { OrderContext } from "../../providers/OrderProvider";
import { OrderItemContext } from '../../providers/OrderItemProvider';
import { HolidayContext } from '../../providers/HolidayProvider';


export const ViewAllOrders = ({ selectHolidayName, selectHolidayDate }) => {

    const history = useHistory();

    // holidayId
    const { id } = useParams();

    const { holiday, getAllHolidays } = useContext(HolidayContext);
    const { getAllOrdersByHolidayId } = useContext(OrderContext);

    const [orders, setOrders] = useState([]);
    const [holidayId, setHolidayId] = useState();

    const [holidayName, setHolidayName] = useState();
    const [holidayDate, setHolidayDate] = useState();

    useEffect(() => {
        getAllHolidays()
    }, []);

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    // need to pass holiday name from 
    // useEffect(() => {
    //     let name = holiday.find(h => h.id === id)
    //     setHolidayName(name)

    //     console.log(name)
    // }, [id]);

    const setSelect = (selectHolidayName, selectHolidayDate) => {
        setHolidayName(selectHolidayName);
        setHolidayDate(selectHolidayDate);
    }


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
                                {h.name} - {dateFormatter(h.date)}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {
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
            }
        </>
    );
}