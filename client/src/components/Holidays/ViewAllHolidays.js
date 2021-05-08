import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';


export const ViewAllHolidays = () => {

    const history = useHistory();

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    const { holiday, getAllHolidays, updateCheckBox } = useContext(HolidayContext);

    useEffect(() => {
        getAllHolidays()
    }, []);

    const checkBoxChange = (e) => {
        updateCheckBox(e.target.id)
    }

    return (
        <>
            <Button
                onClick={() =>
                    history.push(
                        `/holiday/holidayform`
                    )
                }
            >Add A New Holiday</Button>
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>Taking Orders</th>
                        <th>Holidays</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        holiday.map(h => {
                            return <tr key={h.id}>
                                {
                                    h.isAvailable === false ? <td>
                                        <FormGroup check>
                                            <Input type="checkbox" id={h.id} value={h.id} onChange={checkBoxChange} />{' '}
                                        </FormGroup>
                                    </td> : <td>
                                        <FormGroup check>
                                            <Input type="checkbox" id={h.id} value={h.id} defaultChecked onChange={checkBoxChange} />{' '}
                                        </FormGroup>
                                    </td>
                                }
                                <td>{h.name} {dateFormatter(h.date)}</td>
                                <td><Button
                                    value={h.id}
                                    onClick={() =>
                                        history.push(
                                            `/holiday/details/${h.id}`
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