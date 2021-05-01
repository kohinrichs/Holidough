import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';


const HolidayOrderForm = () => {
    const { id } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);

    const [holiday, setHoliday] = useState();
    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);
    const [holidayPickUpDayId, setHolidayPickUpDayId] = useState();

    const history = useHistory();

    useEffect(() => {
        getHolidayById(id)
            .then(setHoliday)
    }, []);

    useEffect(() => {
        getHolidayPickUpDayByHolidayId(parseInt(id))
            .then(setHolidayPickUpDay)
    }, []);

    return holiday ? (
        <Form className="container col-md-8">
            <h2>Order For: {holiday.name} {holiday.date}</h2>
            <FormGroup>
                <Label for="holidayPickUpDayId">PickUp Day</Label>
                <Input
                    type="select"
                    name="holidayPickUpDayId"
                    id="holidayPickUpDayId"
                    value={holidayPickUpDayId}
                    onChange={(e) => {
                        setHolidayPickUpDayId(e.target.value);
                    }}
                >
                    <option>Select A PickUp Day</option>
                    {holidayPickUpDay.map((hpd) => {
                        return (
                            <option key={hpd.id} value={hpd.id}>
                                {hpd.pickUpDayName.day}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
        </Form >
    ) : null;

};

export default HolidayOrderForm;