import React, { useContext, useEffect, useState } from 'react';
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

    // https://javascript.plainenglish.io/7-methods-for-comparing-arrays-in-javascript-88f10c071897
    // let ab = b.filter(o => !a.find(o2 => o.id === o2.id));

    let availableHolidays = holiday.filter(h => !order.find(h2 => h.id === h2.holidayId));

    return availableHolidays ? (
        <>
            <Container className="col-sm-6 col-lg-10 justify-content-center mainContainer">
                <Jumbotron fluid>
                    <Container fluid>
                        <h3 className="display-3">Hello!</h3>
                        <p className="lead">Place an order or view your current/previous orders.</p>
                        <p className="lead">Have a question or need to make a change? Email us at holidays@bakery.com or call the shop during store hours (123.456.6789) </p>
                    </Container>
                </Jumbotron>
                <div className="helloHolidayCard">
                    {

                        availableHolidays.map(h => {
                            return <HelloHolidayCard key={h.id} holiday={h} />;
                        })
                    }
                </div>
                <div>
                    <h2><strong>Orders</strong></h2>
                    {
                        order.map((o) => {
                            return <OrderView key={o.id} order={o} />;
                        })
                    }
                </div>
            </Container>
        </>
    ) : null
}

export default Hello;