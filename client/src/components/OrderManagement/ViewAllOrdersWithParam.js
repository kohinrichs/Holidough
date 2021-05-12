import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Col, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { OrderContext } from "../../providers/OrderProvider";
import { HolidayContext } from '../../providers/HolidayProvider';
import "./OrderManagement.css"

export const ViewAllOrdersWithParam = () => {

    const history = useHistory();

    // holidayId
    const { holidayId } = useParams();

    const { holiday, getAllHolidays } = useContext(HolidayContext);
    const { getAllOrdersByHolidayId } = useContext(OrderContext);

    const [orders, setOrders] = useState([]);
    const [currentHoliday, setCurrentHoliday] = useState();

    useEffect(() => {
        getAllHolidays()
    }, []);

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    useEffect(() => {
        setCurrentHoliday(parseInt(holidayId))

    }, [holidayId]);

    useEffect(() => {
        getAllOrdersByHolidayId(parseInt(holidayId))
            .then(setOrders)
    }, [holidayId])

    return (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <div className="ordersHeader">
                    <h2>View Orders By Holiday</h2>
                    <Col xs="6">
                        <FormGroup>
                            <Input
                                type="select"
                                name="holiday"
                                id="holiday"
                                value={currentHoliday}
                                onChange={(e) => {
                                    setCurrentHoliday(parseInt(e.target.value))
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
                    </Col>
                </div>

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
                                            o.isCanceled === false ? <td>{o.userProfile.lastName}</td> : < td ><strong>CANCELED</strong> - {o.userProfile.lastName}</td>
                                        }
                                        <td>{o.userProfile.firstName}</td>
                                        <td>{o.pickUpDateTime}</td>
                                        <td className="detailsButton">
                                            <i class="fas fa-info-circle"
                                                value={o.id}
                                                onClick={() =>
                                                    history.push(
                                                        `/order/details/${o.id}`
                                                    )
                                                }></i>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table> : "There are no orders for this holiday."
                }
            </Container>
        </>
    )
}