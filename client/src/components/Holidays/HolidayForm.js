import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { CategoryContext } from '../../providers/CategoryProvider'
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { PickUpDayContext } from '../../providers/PickUpDayProvider';
import { PickUpTimeContext } from '../../providers/PickUpTimeProvider';

const HolidayForm = () => {

    const { addHoliday } = useContext(HolidayContext);
    // const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    // const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getAllPickUpDays } = useContext(PickUpDayContext);
    const { getAllPickUpTimes } = useContext(PickUpTimeContext);
    // const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);


    const [holiday, setHoliday] = useState();
    const [categories, setCategories] = useState([]);
    const [pickUpDays, setPickUpDays] = useState([]);
    const [pickUpTimes, setPickUpTimes] = useState([]);

    const [holidayItem, setHolidayItem] = useState([]);
    const [holidayPickUpDays, setHolidayPickUpDays] = useState([]);
    const [holidayPickUpTimes, setHolidayPickUpTimes] = useState([]);

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState(
        dateFormatter(new Date().toISOString()));

    // const [holidayPickUpDayDay, setHolidayPickUpDayDay] = useState();
    // const [holidayPickUpTimeTime, setHolidayPickUpTimeTime] = useState();

    const history = useHistory();

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getAllPickUpDays()
            .then(setPickUpDays)
    }, []);

    useEffect(() => {
        getAllPickUpTimes()
            .then(setPickUpTimes)
    }, []);

    const clearForm = () => {
        // setTitle('');
        // setImageLocation('');
        // setContent('');
        // setCategoryId(1);
        // setPublishDateTime(dateFormatter(new Date().toISOString()));
        // setCurrentPost();
        history.push('/holidays');
    };

    // let newUnfilteredOrderItems = [...orderItems]

    // const quantityForOrderItem = (itemId, quantity) => {

    //     let itemToEdit = newUnfilteredOrderItems.find(o => parseInt(o.itemId) === (parseInt(itemId)))

    //     if (itemToEdit) {
    //         let itemIndex = newUnfilteredOrderItems.findIndex((i => i.itemId === itemId));

    //         newUnfilteredOrderItems[itemIndex].quantity = quantity

    //         setOrderItems(newUnfilteredOrderItems);

    //         console.log(newUnfilteredOrderItems)

    //     } else {
    //         let newOrderItem = { ...orderItem }

    //         newOrderItem.itemId = itemId;
    //         newOrderItem.quantity = quantity;

    //         newUnfilteredOrderItems.push(newOrderItem);

    //         setOrderItems(newUnfilteredOrderItems);

    //         console.log(newUnfilteredOrderItems)
    //     }
    // }

    const handleClickSaveButton = (evt) => {

        evt.preventDefault()

        // if (holidayPickUpDayDay === undefined || holidayPickUpTimeTime === undefined) {
        //     window.alert("Please select a pickup day and time.")
        // } else if (newUnfilteredOrderItems.length === 0) {
        //     window.alert("Please add an item to your order.")
        // } else {
        //     const order = {
        //         holidayId: parseInt(id),
        //         pickUpDateTime: `${holidayPickUpDayDay} ${holidayPickUpTimeTime}`
        //     };

        //     let orderItems = newUnfilteredOrderItems.filter((i) => i.quantity !== "0")

        //     addOrder(order, orderItems).then(() => {
        //         history.push('/vieworders');
        //     })
        // }
    }

    // For Select - https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react

    // need array of Ids from the multi-select > add or remove ids > worth just getting a library
    console.log(holidayPickUpDays)

    return categories && pickUpDays && pickUpTimes ? (
        <Form className="container col-md-8">
            <h2>Add A New Holiday</h2>
            <FormGroup>
                <Label for="name">Holiday Name</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Holiday Name"
                    autoComplete="off"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                />
            </FormGroup>
            <FormGroup>
                <Label for="date">Holiday Date</Label>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                    value={date}
                />
            </FormGroup>
            <FormGroup>
                <Label for="holidayPickUpDayIds">PickUp Days</Label>
                <Input
                    type="select"
                    multiple
                    name="holidayPickUpDays"
                    id="holidayPickUpDays"
                    onChange={(e) => {
                        let holidayPickUpDaysArray = Array.from(e.target.selectedOptions, option => option.value);
                        setHolidayPickUpDays(holidayPickUpDaysArray);
                    }}
                >
                    {pickUpDays.map((pd) => {
                        return (
                            <option key={pd.id} value={pd.id} selected={false}>
                                {pd.day}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="holidayPickUpTimeIds">PickUp Times</Label>
                <Input
                    type="select"
                    multiple
                    name="holidayPickUpTimes"
                    id="holidayPickUpTimes"
                    onChange={(e) => {
                        let holidayPickUpTimesArray = Array.from(e.target.selectedOptions, option => option.value);
                        setHolidayPickUpTimes(holidayPickUpTimesArray);
                    }}
                >
                    {pickUpTimes.map((pt) => {
                        return (
                            <option key={pt.id} value={pt.id}>
                                {pt.time}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            {/* <div>
                {
                    categories.map((c) => {
                        return <div key={c.id}>
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
            </div> */}
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

export default HolidayForm;