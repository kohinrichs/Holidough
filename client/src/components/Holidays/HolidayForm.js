import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { PickUpDayContext } from '../../providers/PickUpDayProvider';
import { PickUpTimeContext } from '../../providers/PickUpTimeProvider';
import { ItemContext } from '../../providers/ItemProvider';

const HolidayForm = () => {

    const history = useHistory();

    const { holiday, getAllHolidays, addHoliday } = useContext(HolidayContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getAllPickUpDays } = useContext(PickUpDayContext);
    const { getAllPickUpTimes } = useContext(PickUpTimeContext);
    const { getAllItems } = useContext(ItemContext);

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [pickUpDays, setPickUpDays] = useState([]);
    const [pickUpTimes, setPickUpTimes] = useState([]);

    const [holidayPickUpDays, setHolidayPickUpDays] = useState([]);
    const [holidayPickUpTimes, setHolidayPickUpTimes] = useState([]);

    const [bread, setBread] = useState([]);
    const [other, setOther] = useState([]);
    const [pastry, setPastry] = useState([]);
    const [savory, setSavory] = useState([]);

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState(
        dateFormatter(new Date().toISOString()));

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

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, []);

    useEffect(() => {
        getAllHolidays()
    }, []);

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

        const newDate = new Date().toISOString().split('T')[0];

        // need to prevent submission if no days / times are selected
        if (name === "" || date === "" || holidayPickUpDays === [], holidayPickUpTimes === []) {
            window.alert("Please name the holiday and select a date, pickUp Day(s), and pickUp Time(s)")
        } else if (holidayItems.length === 0) {
            window.alert("Please add items to the holiday list.")
        } else if (date < newDate) {
            window.alert("Please select a date in the future.")
        } else if (holiday.find(h => dateFormatter(h.date) === date)) {
            window.alert("It looks like you already have a holiday for this date. Please select another date.")
        } else {
            const holiday = {
                name,
                date
            };

            addHoliday(holiday, holidayPickUpDays, holidayPickUpTimes, holidayItems).then(() => {
                history.push('/holidays');
            })
        }
    }

    // For Select - https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react

    return categories && pickUpDays && pickUpTimes && items ? (
        <>
            <i className="fas fa-angle-double-left ml-4 backButton"
                onClick={() => {
                    history.push(`/holidays`)
                }}></i>

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
                    <Label for="holidayPickUpDayIds">PickUp Days (Use ctrl or cmd to select multiple.)</Label>
                    <Input
                        type="select"
                        multiple
                        name="holidayPickUpDays"
                        id="holidayPickUpDays"
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
                <Button onClick={handleClickSaveButton} color="outline-success">
                    Submit
            </Button>
            </Form >
        </>
    ) : null;

};

export default HolidayForm;

// This is to dynamically render the categories, but I can't get the selects to work properly - Come back to at some point.
{/* <div>
{
    categories.map((c) => {
        return <div key={c.id}>
            <h4>{c.name}</h4>
            <div>
                {
                    <FormGroup>
                        <Input
                            type="select"
                            multiple
                            name="holidayItems"
                            id="holidayItems"
                            selectedOptions={holidayItems}
                            onChange={makeHolidayItemsList}
                        >

                            {items.filter(item => item.categoryId === c.id).map(i => {
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
    })
}
</div> */}


