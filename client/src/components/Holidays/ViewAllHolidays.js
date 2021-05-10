import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, Input, Table, Button } from 'reactstrap';
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

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;

    const checkBoxChange = (e) => {
        if (e.target.value < newdate) {
            window.alert("It looks like this holiday already happened, so we can't take anymore orders.")
        } else {
            updateCheckBox(e.target.id)
        }
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
                                            <Input type="checkbox" id={h.id} value={dateFormatter(h.date)} onChange={checkBoxChange} />{' '}
                                        </FormGroup>
                                    </td> : <td>
                                        <FormGroup check>
                                            <Input type="checkbox" id={h.id} value={dateFormatter(h.date)} defaultChecked onChange={checkBoxChange} />{' '}
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