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

const OrderEditForm = () => {

    // OrderId
    const { id, holidayId } = useParams();

    const { getHolidayById } = useContext(HolidayContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);
    const { getOrderById, updateOrder } = useContext(OrderContext);
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

    const history = useHistory();

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

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

    useEffect(() => {
        let dTPieces = order ? order.pickUpDateTime.split(" ") : " "

        let tPiece = order ? dTPieces[1] + " " + (dTPieces[2] + " " + dTPieces[3]) : " "

        setHolidayPickUpDayDay(dTPieces[0])
        setHolidayPickUpTimeTime(tPiece)
    }, [order]);

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(parseInt(holidayId))
            .then(setHolidayItem)
    }, []);

    let newUnfilteredOrderItems = [...orderItems]

    const quantityForOrderItem = (itemId, quantity) => {

        let itemToEdit = newUnfilteredOrderItems.find(o => parseInt(o.itemId) === parseInt(itemId))

        if (itemToEdit) {

            let itemIndex = newUnfilteredOrderItems.findIndex(i => parseInt(i.itemId) === parseInt(itemId));

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
                id: parseInt(id),
                pickUpDateTime: `${holidayPickUpDayDay} ${holidayPickUpTimeTime}`
            };

            let orderItems = newUnfilteredOrderItems.filter((i) => i.quantity !== "0")

            updateOrder(order, orderItems).then(() => {
                history.push(`/order/details/${id}`);
            })
        }
    }

    return holiday && order ? (
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
            <Button
                onClick={(() => {
                    history.push(`/order/details/${id}`)
                })}
                color="danger"
                style={{ marginLeft: '10px' }}
            >
                Cancel
            </Button>
            <Button onClick={handleClickSaveButton} color="success">
                Submit
            </Button>
        </Form >
    ) : null;

};

export default OrderEditForm;