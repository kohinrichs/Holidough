import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { OrderContext } from "../../providers/OrderProvider";
import { HolidayContext } from '../../providers/HolidayProvider';
import { CategoryContext } from '../../providers/CategoryProvider';

export const ProductionNumbers = () => {

    const { holiday, getAllHolidays } = useContext(HolidayContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getItemQuantitiesByHolidayId } = useContext(OrderContext);

    const [quantities, setQuantities] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllHolidays()
    }, []);

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    return (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <Label for="holiday"><h2>View Production Numbers By Holiday</h2></Label>
                <Col xs="6">
                    <FormGroup>
                        <Input
                            type="select"
                            name="holiday"
                            id="holiday"
                            value={holiday.name}
                            onChange={(e) => {
                                getItemQuantitiesByHolidayId(parseInt(e.target.value))
                                    .then(setQuantities)
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

                <div>
                    {quantities.length > 0 ?
                        (categories.map((c) => {
                            return <div key={c.id}>
                                <h4>{c.name}</h4>
                                <div>
                                    {
                                        quantities.length > 0 ? <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>Item Name</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    quantities.filter(q => q.item.categoryId === c.id).map(q => {
                                                        return <tr key={q.itemId}>
                                                            <td>{q.item.name}</td>
                                                            <td>{q.itemQuantityNumber}</td>
                                                        </tr>
                                                    })
                                                }

                                            </tbody>
                                        </Table> : "There are no orders for this category yet."
                                    }
                                </div>
                            </div>
                        })) : "There are no orders for this holiday yet."
                    }
                </div>
            </Container>
        </>
    )
}