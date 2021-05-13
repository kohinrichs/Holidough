import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { HolidayItemCard } from "./HolidayItemCard";
import { OrderContext } from '../../providers/OrderProvider';
import { CategoryContext } from '../../providers/CategoryProvider'


const HolidayOrderForm = () => {

    const { id } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);
    const { getOrdersByUserProfileId, addOrder } = useContext(OrderContext);


    const [holiday, setHoliday] = useState();
    const [categories, setCategories] = useState([]);
    const [holidayItem, setHolidayItem] = useState([]);
    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);
    const [holidayPickUpTime, setHolidayPickUpTime] = useState([]);

    const [holidayPickUpDayDay, setHolidayPickUpDayDay] = useState();
    const [holidayPickUpTimeTime, setHolidayPickUpTimeTime] = useState();

    const [orderItem] = useState();

    const [orderItems, setOrderItems] = useState([]);

    const [customerOrders, setCustomerOrders] = useState([]);

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
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(parseInt(id))
            .then(setHolidayItem)
    }, []);

    useEffect(() => {
        getOrdersByUserProfileId()
            .then(setCustomerOrders)
    }, []);


    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    let newUnfilteredOrderItems = [...orderItems]

    const quantityForOrderItem = (itemId, quantity) => {

        let itemToEdit = newUnfilteredOrderItems.find(o => parseInt(o.itemId) === (parseInt(itemId)))

        if (itemToEdit) {
            let itemIndex = newUnfilteredOrderItems.findIndex((i => i.itemId === itemId));

            newUnfilteredOrderItems[itemIndex].quantity = quantity

            setOrderItems(newUnfilteredOrderItems);

        } else {
            let newOrderItem = { ...orderItem }

            newOrderItem.itemId = itemId;
            newOrderItem.quantity = quantity;

            newUnfilteredOrderItems.push(newOrderItem);

            setOrderItems(newUnfilteredOrderItems);

        }
    }

    const handleClickSaveButton = (evt) => {

        evt.preventDefault()

        if (holidayPickUpDayDay === undefined || holidayPickUpTimeTime === undefined) {
            window.alert("Please select a pickup day and time.")
        } else if (newUnfilteredOrderItems.length === 0) {
            window.alert("Please add an item to your order.")
        } else if (customerOrders.find(co => co.holidayId === parseInt(id))) {
            window.alert("It looks like you already have an order for this holiday. If you'd like to make a change to your order, please give us a call or send an email to holidays@holidays.com. Thank you!")
        } else {
            const order = {
                holidayId: parseInt(id),
                pickUpDateTime: `${holidayPickUpDayDay} ${holidayPickUpTimeTime}`
            };

            let orderItems = newUnfilteredOrderItems.filter((i) => i.quantity !== "0")

            addOrder(order, orderItems).then(() => {
                history.push('/');
            })
        }
    }

    return holiday ? (
        <>
            <i className="fas fa-angle-double-left ml-4 backButton"
                onClick={() => {
                    history.push('/')
                }}></i>

            <Form className="container col-md-8">
                <h2>Order For: {holiday.name} {dateFormatter(holiday.date)}</h2>
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
                        <option value="0">Select A PickUp Day</option>
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
                        <option value="0">Select A PickUp Time</option>
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
                        categories.map((c) => {
                            return <div className="orderCards" key={c.id}>
                                <h4>{c.name}</h4>
                                <div>
                                    {
                                        holidayItem.filter(item => item.item.categoryId === c.id).map(hi => {
                                            return <HolidayItemCard key={hi.id} holidayItem={hi} handleSelect={quantityForOrderItem} />;
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
                <Button onClick={handleClickSaveButton} color="outline-success">
                    Submit
            </Button>
            </Form >
        </>
    ) : null;

};

export default HolidayOrderForm;