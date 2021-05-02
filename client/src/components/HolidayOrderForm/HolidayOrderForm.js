import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { HolidayItemCard } from "./HolidayItemCard";


const HolidayOrderForm = () => {
    const { id } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);

    const [holiday, setHoliday] = useState();
    const [holidayItem, setHolidayItem] = useState([]);
    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);
    const [holidayPickUpTime, setHolidayPickUpTime] = useState([]);

    const [holidayPickUpDayId, setHolidayPickUpDayId] = useState();
    const [holidayPickUpTimeId, setHolidayPickUpTimeId] = useState();

    const history = useHistory();

    useEffect(() => {
        getHolidayById(id)
            .then(setHoliday)
    }, []);

    useEffect(() => {
        getHolidayPickUpDayByHolidayId(parseInt(id))
            .then(setHolidayPickUpDay)
    }, []);

    useEffect(() => {
        getHolidayPickUpTimeByHolidayId(parseInt(id))
            .then(setHolidayPickUpTime)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(parseInt(id))
            .then(setHolidayItem)
    }, []);

    const clearForm = () => {
        // setTitle('');
        // setImageLocation('');
        // setContent('');
        // setCategoryId(1);
        // setPublishDateTime(dateFormatter(new Date().toISOString()));
        // setCurrentPost();
        history.push('/');
    };

    const handleClickSaveButton = (evt) => { }

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
            <FormGroup>
                <Label for="holidayPickUpTimeId">PickUp Time</Label>
                <Input
                    type="select"
                    name="holidayPickUpTimeId"
                    id="holidayPickUpTimeId"
                    value={holidayPickUpTimeId}
                    onChange={(e) => {
                        setHolidayPickUpTimeId(e.target.value);
                    }}
                >
                    <option>Select A PickUp Time</option>
                    {holidayPickUpTime.map((hpt) => {
                        return (
                            <option key={hpt.id} value={hpt.id}>
                                {hpt.pickUpTimeTime.time}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            <div>
                {
                    holidayItem.map((hi) => {
                        return <HolidayItemCard key={hi.id} holidayItem={hi} />;
                    })
                }
            </div>
            <Button onClick={handleClickSaveButton} color="success">
                Submit
            </Button>
            <Button
                onClick={clearForm}
                color="danger"
                style={{ marginLeft: '10px' }}
            >
                Cancel
            </Button>
        </Form >
    ) : null;

};

export default HolidayOrderForm;