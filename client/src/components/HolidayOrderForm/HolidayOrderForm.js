import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { HolidayItemCard } from "./HolidayItemCard";
import { OrderContext } from '../../providers/OrderProvider';


const HolidayOrderForm = () => {

    const { id } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);
    const { addOrder } = useContext(OrderContext);

    const [holiday, setHoliday] = useState();
    const [holidayItem, setHolidayItem] = useState([]);
    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);
    const [holidayPickUpTime, setHolidayPickUpTime] = useState([]);

    const [holidayPickUpDayDay, setHolidayPickUpDayDay] = useState();
    const [holidayPickUpTimeTime, setHolidayPickUpTimeTime] = useState();

    const [orderItem, setOrderItem] = useState();

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

    const [arrayOfOrderItems, setArrayOfOrderItems] = useState([])

    let newArrayOfOrderItems = [...arrayOfOrderItems]

    const quantityForOrderItem = (itemId, quantity) => {

        let itemToEdit = newArrayOfOrderItems.find(o => parseInt(o.itemId) === (parseInt(itemId)))

        if (itemToEdit) {
            let itemIndex = newArrayOfOrderItems.findIndex((i => i.itemId === itemId));

            newArrayOfOrderItems[itemIndex].quantity = quantity

            setArrayOfOrderItems(newArrayOfOrderItems);
        } else {
            let newOrderItem = { ...orderItem }

            newOrderItem.itemId = itemId;
            newOrderItem.quantity = quantity;

            newArrayOfOrderItems.push(newOrderItem);

            setArrayOfOrderItems(newArrayOfOrderItems);
        }
    }

    const handleClickSaveButton = (evt) => {
        const order = {
            holidayId: parseInt(id),
            pickUpDateTime: `${holidayPickUpDayDay} ${holidayPickUpTimeTime}`
        };

        addOrder(order).then(() => {
            history.push('/');
        })
    }

    return holiday ? (
        <Form className="container col-md-8">
            <h2>Order For: {holiday.name} {holiday.date}</h2>
            <FormGroup>
                <Label for="holidayPickUpDayId">PickUp Day</Label>
                <Input
                    type="select"
                    name="holidayPickUpDayDay"
                    id="holidayPickUpDayDay"
                    value={holidayPickUpDayDay}
                    onChange={(e) => {
                        setHolidayPickUpDayDay(e.target.value);
                    }}
                >
                    <option>Select A PickUp Day</option>
                    {holidayPickUpDay.map((hpd) => {
                        return (
                            <option key={hpd.id} value={hpd.pickUpDayName.day}>
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
                    name="holidayPickUpTimeTime"
                    id="holidayPickUpTimeTime"
                    value={holidayPickUpTimeTime}
                    onChange={(e) => {
                        setHolidayPickUpTimeTime(e.target.value);
                    }}
                >
                    <option>Select A PickUp Time</option>
                    {holidayPickUpTime.map((hpt) => {
                        return (
                            <option key={hpt.id} value={hpt.pickUpTimeTime.time}>
                                {hpt.pickUpTimeTime.time}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            <div>
                {
                    holidayItem.map((hi) => {
                        return <HolidayItemCard key={hi.id} holidayItem={hi} handleSelect={quantityForOrderItem} />;
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