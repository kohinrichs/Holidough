import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';


export const ViewAllHolidays = () => {

    const history = useHistory();

    const { holiday, getAllHolidays } = useContext(HolidayContext);

    useEffect(() => {
        getAllHolidays()
    }, []);

    return (
        <>
            <Table hover bordered>
                <thead>
                    <tr>
                        <th>Holidays</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        holiday.map(h => {
                            return <tr key={h.id}>
                                <td>{h.name} {h.date}
                                    <Button
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