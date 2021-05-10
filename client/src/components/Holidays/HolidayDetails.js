import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { List, Button } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HolidayItemContext } from '../../providers/HolidayItemProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { HolidayPickUpDayContext } from '../../providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeContext } from '../../providers/HolidayPickUpTimeProvider';
import { OrderContext } from '../../providers/OrderProvider';

export const HolidayDetails = () => {

    // This is the holidayId
    const { id } = useParams();
    const history = useHistory();

    const { getHolidayById, deleteHoliday } = useContext(HolidayContext);
    const { getHolidayItemsByHolidayId } = useContext(HolidayItemContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getHolidayPickUpDayByHolidayId } = useContext(HolidayPickUpDayContext);
    const { getHolidayPickUpTimeByHolidayId } = useContext(HolidayPickUpTimeContext);
    const { getAllOrdersByHolidayId } = useContext(OrderContext);

    const [categories, setCategories] = useState([]);
    const [holidayPickUpDays, setHolidayPickUpDays] = useState([]);
    const [holidayPickUpTimes, setHolidayPickUpTimes] = useState([]);
    const [holiday, setHoliday] = useState();
    const [holidayItems, setHolidayItems] = useState([]);
    const [orders, setOrders] = useState([]);

    const dateFormatter = (date) => {
        const [yyyymmdd] = date.split('T');
        return yyyymmdd;
    };

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getHolidayPickUpDayByHolidayId(id)
            .then(setHolidayPickUpDays)
    }, []);

    useEffect(() => {
        getHolidayPickUpTimeByHolidayId(id)
            .then(setHolidayPickUpTimes)
    }, []);

    useEffect(() => {
        getHolidayById(id)
            .then(setHoliday)
    }, []);

    useEffect(() => {
        getHolidayItemsByHolidayId(id)
            .then(setHolidayItems)
    }, []);

    useEffect(() => {
        getAllOrdersByHolidayId(id)
            .then(setOrders)
    }, []);

    const handleDelete = () => {
        if (orders.find(o => o.holidayId === parseInt(id))) {
            window.alert("Oh no! This holiday has orders associated with it. You can't delete it.")
        } else if (window.confirm('Are you sure?')) {
            deleteHoliday(id)
                .then(() => {
                    history.push("/holidays")
                })
        }
    }

    return holiday && categories && holidayPickUpDays && holidayPickUpTimes ? (
        <>
            <Button
                onClick={() => {
                    history.push(`/holidays`)
                }}>Go Back</Button>

            <div>
                <h2>{holiday.name} {dateFormatter(holiday.date)}</h2>
                <h4>Holiday PickUp Days</h4>
                <List type="unstyled">
                    {
                        holidayPickUpDays.map((hpd => {
                            return <li key={hpd.pickUpDayId}>{hpd.pickUpDayName.day}</li>
                        }))
                    }
                </List>

                <h4>Holiday PickUp Times</h4>
                <List type="unstyled">
                    {
                        holidayPickUpTimes.map((hpt => {
                            return <li key={hpt.pickUpTimeId}>{hpt.pickUpTimeTime.time}</li>
                        }))
                    }
                </List>
            </div>
            <div>
                {
                    categories.map((c) => {
                        return <div key={c.id}>
                            <h4>{c.name}</h4>

                            <List type="unstyled">
                                <div>
                                    {
                                        holidayItems.filter(item => item.item.categoryId === c.id).map(hi => {
                                            return <li key={hi.id}>{hi.item.name}</li>
                                        })
                                    }
                                </div>
                            </List>

                        </div>
                    })
                }
            </div>
            <Button
                onClick={handleDelete}>Delete Holiday</Button>

            <Button
                onClick={() => {
                    history.push(`/holiday/edit/${id}`)
                }}>Edit Holiday</Button>
        </>
    ) : null
}

