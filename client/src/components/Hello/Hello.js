import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Jumbotron, Container } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HelloHolidayCard } from './HelloHolidayCard';
import { OrderView } from '../HolidayOrderForm/OrderView';
import { OrderContext } from '../../providers/OrderProvider';

const Hello = () => {

    const { holiday, getAllAvailableHolidays } = useContext(HolidayContext);
    const { getOrdersByUserProfileId } = useContext(OrderContext);

    const [order, setOrder] = useState([]);

    useEffect(() => {
        getAllAvailableHolidays()
    }, []);

    useEffect(() => {
        getOrdersByUserProfileId()
            .then(setOrder)
    }, []);

    let availableHolidayArray = order.map((o) => {
        return holiday.filter(h => h.id !== o.holidayId)
    })

    let availableHolidays = availableHolidayArray[0]

    console.log("Holidays", holiday)
    console.log("Current orders", order)
    console.log("array", availableHolidayArray)
    console.log("This should be the buttons", availableHolidays)

    return availableHolidays ? (
        <>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-3">Thank you for your order!</h1>
                    <p className="lead">Have a question or need to make a change? Email us at holidays@bakery.com or call the shop during store hours (123.456.6789) </p>
                </Container>
            </Jumbotron>
            <div>
                {
                    availableHolidays.map(h => {
                        return <HelloHolidayCard key={h.id} holiday={h} />;
                    })
                }
            </div>
            <div>
                {
                    order.map((o) => {
                        return <OrderView key={o.id} order={o} />;
                    })
                }
            </div>
        </>
    ) : null
}

export default Hello;