import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormGroup, Input, Table, Button } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';

export const ViewAllHolidays = () => {

    const history = useHistory();

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    const { holiday, getAllHolidays, updateCheckBox } = useContext(HolidayContext);

    useEffect(() => {
        getAllHolidays()
    }, []);

    const newDate = new Date().toISOString().split('T')[0];

    const checkBoxChange = (e) => {
        updateCheckBox(e.target.id)
    }

    return (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <i class="fas fa-plus"
                    onClick={() =>
                        history.push(
                            `/holiday/holidayform`
                        )
                    }></i>
                <h2>Holidays</h2>
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
                                    {dateFormatter(h.date) < newDate ? <td>
                                        <FormGroup check>
                                            <Input type="checkbox" disabled={true} hidden={true} id={h.id} value={h.id} />{'Past Event'}
                                        </FormGroup>
                                    </td> :
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
                                    <td>
                                        <i class="fas fa-info-circle"
                                            value={h.id}
                                            onClick={() =>
                                                history.push(
                                                    `/holiday/details/${h.id}`
                                                )
                                            }></i>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}