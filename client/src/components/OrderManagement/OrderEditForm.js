import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HolidayContext } from '../../providers/HolidayProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { OrderContext } from '../../providers/OrderProvider';
import { CategoryContext } from '../../providers/CategoryProvider'
import { OrderItemCard } from "./OrderItemCard";
import { OrderItemContext } from '../../providers/OrderItemProvider';

// Need to set values of the form to the current order and orderItems
const OrderEditForm = () => {

    // OrderId
    const { id, holidayId } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);
    const { getOrderById, addOrder } = useContext(OrderContext);
    const { getOrderItemsByOrderId } = useContext(OrderItemContext)


    const [holiday, setHoliday] = useState();
    const [categories, setCategories] = useState([]);

    const [holidayItem, setHolidayItem] = useState([]);

    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);
    const [holidayPickUpTime, setHolidayPickUpTime] = useState([]);

    const [holidayPickUpDayDay, setHolidayPickUpDayDay] = useState();
    const [holidayPickUpTimeTime, setHolidayPickUpTimeTime] = useState();

    const [orderItem, setOrderItem] = useState();
    const [orderItems, setOrderItems] = useState([]);

    const [order, setOrder] = useState();

    const [currentOrder, setCurrentOrder] = useState();
    const [currentOrderItems, setCurrentOrderItems] = useState();

    const history = useHistory();

    useEffect(() => {
        getOrderById(id)
            .then(setOrder)
    }, []);

    useEffect(() => {
        getOrderItemsByOrderId(id)
            .then(setOrderItems)
    }, []);

    useEffect(() => {
        getHolidayById(parseInt(holidayId))
            .then(setHoliday)
    }, []);

    useEffect(() => {
        getHolidayPickUpDayByHolidayId(parseInt(holidayId))
            .then(setHolidayPickUpDay)
    }, []);

    useEffect(() => {
        getHolidayPickUpTimeByHolidayId(parseInt(holidayId))
            .then(setHolidayPickUpTime)
    }, []);

    // setHolidayPickUpDayDay(OrderDateTimeArray[0])
    // setHolidayPickUpTimeTime(OrderDateTimeArray[1])

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(parseInt(holidayId))
            .then(setHolidayItem)
    }, []);

    const clearForm = () => {
        // setTitle('');
        // setImageLocation('');
        // setContent('');
        // setCategoryId(1);
        // setPublishDateTime(dateFormatter(new Date().toISOString()));
        // setCurrentPost();
        history.push(`/order/details/${id}`);
    };

    console.log(orderItems);
    console.log(holidayItem)

    let newUnfilteredOrderItems = [...orderItems]

    const quantityForOrderItem = (itemId, quantity) => {

        let itemToEdit = newUnfilteredOrderItems.find(o => parseInt(o.itemId) === (parseInt(itemId)))

        if (itemToEdit) {
            debugger
            let itemIndex = newUnfilteredOrderItems.findIndex((i => i.itemId === parseInt(itemId)));

            newUnfilteredOrderItems[itemIndex].quantity = quantity

            setOrderItems(newUnfilteredOrderItems);

            console.log(newUnfilteredOrderItems)

        } else {
            let newOrderItem = { ...orderItem }

            newOrderItem.itemId = itemId;
            newOrderItem.quantity = quantity;

            newUnfilteredOrderItems.push(newOrderItem);

            setOrderItems(newUnfilteredOrderItems);

            console.log(newUnfilteredOrderItems)
        }
    }

    const handleClickSaveButton = (evt) => {

        evt.preventDefault()

        if (holidayPickUpDayDay === undefined || holidayPickUpTimeTime === undefined) {
            window.alert("Please select a pickup day and time.")
        } else if (newUnfilteredOrderItems.length === 0) {
            window.alert("Please add an item to your order.")
        } else {
            const order = {
                holidayId: parseInt(holidayId),
                pickUpDateTime: `${holidayPickUpDayDay} ${holidayPickUpTimeTime}`
            };

            let orderItems = newUnfilteredOrderItems.filter((i) => i.quantity !== "0")

            addOrder(order, orderItems).then(() => {
                history.push('/vieworders');
            })
        }
    }

    console.log(orderItem)

    // Need to compare holidayItems to orderItems to set the quantity of the holiday items on render 
    // update state of the HolidayItems with the  

    // pass in orderITem that matches so you can use the orderItem quantity to set the default value of the select

    return holiday && order ? (
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
                        return <div key={c.id}>
                            <h4>{c.name}</h4>
                            <div>
                                {
                                    holidayItem.filter(item => item.item.categoryId === c.id).map(hi => {
                                        return <OrderItemCard key={hi.id} holidayItem={hi} orderItems={orderItems} handleSelect={quantityForOrderItem} />;
                                    })
                                }
                            </div>
                        </div>
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

export default OrderEditForm;