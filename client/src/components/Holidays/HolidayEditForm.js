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
import { ItemContext } from '../../providers/ItemProvider';

const HolidayEditForm = () => {

    const { id } = useParams();
    const history = useHistory();

    const { getHolidayById, updateHoliday } = useContext(HolidayContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getAllPickUpDays } = useContext(PickUpDayContext);
    const { getAllPickUpTimes } = useContext(PickUpTimeContext);
    const { getAllItems } = useContext(ItemContext);

    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);

    const [holiday, setHoliday] = useState();
    const [categories, setCategories] = useState([]);
    const [pickUpDays, setPickUpDays] = useState([]);
    const [pickUpTimes, setPickUpTimes] = useState([]);
    const [items, setItems] = useState([]);

    // <---------------------------------------------------------------------------->
    const [holidayPickUpDays, setHolidayPickUpDays] = useState([]);

    const [initialHolidayPickUpDays, setInitialHolidayPickUpDays] = useState([]);
    const [holidayPickUpDayIds, setHolidayPickUpDayIds] = useState([]);

    // <---------------------------------------------------------------------------->
    const [holidayPickUpTimes, setHolidayPickUpTimes] = useState([]);

    const [initialHolidayPickUpTimes, setInitialHolidayPickUpTimes] = useState([]);
    const [holidayPickUpTimeIds, setHolidayPickUpTimeIds] = useState([]);

    // <---------------------------------------------------------------------------->
    const [holidayItems, setHolidayItems] = useState([]);

    const [initialHolidayItems, setInitialHolidayItems] = useState([]);

    const [bread, setBread] = useState([]);
    const [other, setOther] = useState([]);
    const [pastry, setPastry] = useState([]);
    const [savory, setSavory] = useState([]);

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState(
        dateFormatter(new Date().toISOString()));

    useEffect(() => {
        getHolidayById(id)
            .then(setHoliday)
    }, []);

    let holidayName = holiday ? holiday.name : "";
    let holidayDate = holiday ? holiday.date : " ";

    useEffect(() => {
        setName(holidayName)
        setDate(holidayDate)
    }, [holiday]);

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getAllPickUpDays()
            .then(setPickUpDays)
    }, []);

    // <---------------------------------------------------------------------------->
    useEffect(() => {
        getHolidayPickUpDayByHolidayId(id)
            .then(setInitialHolidayPickUpDays)
    }, []);

    useEffect(() => {
        let holidayPickUpDayIds = []

        initialHolidayPickUpDays.forEach(h => holidayPickUpDayIds.push(h.pickUpDayId))

        setHolidayPickUpDays(holidayPickUpDayIds)
    }, [initialHolidayPickUpDays]);

    // <---------------------------------------------------------------------------->
    useEffect(() => {
        getAllPickUpTimes()
            .then(setPickUpTimes)
    }, []);

    useEffect(() => {
        getHolidayPickUpTimeByHolidayId(id)
            .then(setInitialHolidayPickUpTimes)
    }, []);

    useEffect(() => {
        let holidayPickUpTimeIds = []

        initialHolidayPickUpTimes.forEach(h => holidayPickUpTimeIds.push(h.pickUpTimeId))

        setHolidayPickUpTimes(holidayPickUpTimeIds)
    }, [initialHolidayPickUpTimes]);

    // <---------------------------------------------------------------------------->

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(id)
            .then(setInitialHolidayItems)
    }, []);

    useEffect(() => {

        let breadIds = initialHolidayItems.filter(item => item.item.categoryId === 1).map(i => {
            return i.itemId
        })

        let pastryIds = initialHolidayItems.filter(item => item.item.categoryId === 2).map(i => {
            return i.itemId
        })

        let otherIds = initialHolidayItems.filter(item => item.item.categoryId === 4).map(i => {
            return i.itemId
        })

        let savoryIds = initialHolidayItems.filter(item => item.item.categoryId === 3).map(i => {
            return i.itemId
        })

        setBread(breadIds);
        setOther(otherIds);
        setPastry(pastryIds);
        setSavory(savoryIds);

    }, [initialHolidayItems]);

    // <---------------------------------------------------------------------------->

    const breadHolidayItems = (e) => {
        let breadList = Array.from(e.target.selectedOptions, option => option.value);
        setBread(breadList);
    }

    const otherHolidayItems = (e) => {
        let otherList = Array.from(e.target.selectedOptions, option => option.value);
        setOther(otherList);
    }

    const pastryHolidayItems = (e) => {
        let pastryList = Array.from(e.target.selectedOptions, option => option.value);
        setPastry(pastryList);
    }

    const savoryHolidayItems = (e) => {
        let savoryList = Array.from(e.target.selectedOptions, option => option.value);
        setSavory(savoryList);
    }

    const handleClickSaveButton = (evt) => {

        evt.preventDefault()

        let holidayItems = [...bread, ...other, ...pastry, ...savory]

        // need to prevent submission if no days / times are selected
        if (name === "" || date === "" || holidayPickUpDays === [], holidayPickUpTimes === []) {
            window.alert("Please name the holiday and select a date, pickUp Day(s), and pickUp Time(s)")
        } else if (holidayItems.length === 0) {
            window.alert("Please add items to the holiday list.")
        } else {
            let holiday = {
                id,
                name: name,
                date: date
            };

            updateHoliday(holiday, holidayPickUpDays, holidayPickUpTimes, holidayItems).then(() => {
                history.push('/holidays');
            })
        }
    }

    // For Select - https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react

    return holiday && categories && pickUpDays && pickUpTimes && items ? (
        <Form className="container col-md-8">
            <h2>Edit {holiday.name} {dateFormatter(holiday.date)}</h2>
            <FormGroup>
                <Label for="name">Holiday Name</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={holiday.name}
                    autoComplete="off"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="date">Holiday Date</Label>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={dateFormatter(holiday.date)}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="holidayPickUpDayIds">PickUp Days (Use ctrl or cmd to select multiple.)</Label>
                <Input
                    type="select"
                    multiple
                    name="holidayPickUpDays"
                    id="holidayPickUpDays"
                    value={holidayPickUpDays}
                    onChange={(e) => {
                        let holidayPickUpDays = Array.from(e.target.selectedOptions, o => o.value);
                        setHolidayPickUpDays(holidayPickUpDays);
                    }}
                >
                    {pickUpDays.map((pd) => {
                        return (
                            <option key={pd.id} value={pd.id}>
                                {pd.day}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="holidayPickUpTimeIds">PickUp Times (Use ctrl or cmd to select multiple.)</Label>
                <Input
                    type="select"
                    multiple
                    name="holidayPickUpTimes"
                    id="holidayPickUpTimes"
                    value={holidayPickUpTimes}
                    onChange={(e) => {
                        let holidayPickUpTimes = Array.from(e.target.selectedOptions, o => o.value);
                        setHolidayPickUpTimes(holidayPickUpTimes);
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
            <div>
                <h4>Bread</h4>
                <h6>(Use ctrl or cmd to select multiple.)</h6>
                <div>
                    {
                        <FormGroup>
                            <Input
                                type="select"
                                multiple
                                name="holidayItemsBread"
                                id="holidayItemsBread"
                                value={bread}
                                onChange={breadHolidayItems}
                            >
                                {items.filter(item => item.categoryId === 1).map(i => {
                                    return (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    }
                </div>
            </div>
            <div>
                <h4>Other</h4>
                <h6>(Use ctrl or cmd to select multiple.)</h6>
                <div>
                    {
                        <FormGroup>
                            <Input
                                type="select"
                                multiple
                                name="holidayItemsOther"
                                id="holidayItemsOther"
                                value={other}
                                onChange={otherHolidayItems}
                            >
                                {items.filter(item => item.categoryId === 4).map(i => {
                                    return (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    }
                </div>
            </div>
            <div>
                <h4>Pastry</h4>
                <h6>(Use ctrl or cmd to select multiple.)</h6>
                <div>
                    {
                        <FormGroup>
                            <Input
                                type="select"
                                multiple
                                name="holidayItemsPastry"
                                id="holidayItemsPastry"
                                value={pastry}
                                onChange={pastryHolidayItems}
                            >
                                {items.filter(item => item.categoryId === 2).map(i => {
                                    return (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    }
                </div>
            </div>
            <div>
                <h4>Savory</h4>
                <h6>(Use ctrl or cmd to select multiple.)</h6>
                <div>
                    {
                        <FormGroup>
                            <Input
                                type="select"
                                multiple
                                name="holidayItemsSavory"
                                id="holidayItemsSavory"
                                value={savory}
                                onChange={savoryHolidayItems}
                            >

                                {items.filter(item => item.categoryId === 3).map(i => {
                                    return (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    }
                </div>
            </div>
            <Button onClick={handleClickSaveButton} color="success">
                Submit
            </Button>
            <Button
                color="danger"
                style={{ marginLeft: '10px' }}
                onClick={(e) => {
                    e.preventDefault();

                    history.push(`/holidays`)

                }}>Go Back</Button>
        </Form >
    ) : null;

};

export default HolidayEditForm;


