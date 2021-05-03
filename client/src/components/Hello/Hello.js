import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Jumbotron, Container } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HelloHolidayCard} from './HelloHolidayCard';
import { OrderView } from '../HolidayOrderForm/OrderView';
import { OrderContext } from '../../providers/OrderProvider';

const Hello = () => {

    // To conditionally render > render one way if the user doesn't have orders for the available holidays. render
    // another way if the user has an order for the available holiday.

    const { holiday, getAllAvailableHolidays } = useContext(HolidayContext);
    const { getOrdersByUserProfileId } = useContext(OrderContext);

    const [order, setOrder] = useState([]);

    useEffect(() => {
        getAllAvailableHolidays()
    }, []);

    useEffect (() => {
        getOrdersByUserProfileId()
        .then(setOrder)
    }, []);

    // Check to see if order.holidayId = holiday.id
    let placedOrders = order.map((o) => {
       holiday.filter((h) => h.id === o.holidayId)
       return o
})

    console.log(placedOrders)
    console.log(order)

    return (
           placedOrders.length > 0 ? 
           <>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-3">Thank you for your order!</h1>
                    <p className="lead">Have a question or need to make a change? Email us at holidays@bakery.com or call the shop during store hours (123.456.6789) </p>
                </Container>
            </Jumbotron>
               <div>
                   {
                       order.map((o) => {
                           return <OrderView key={o.id} order={o} />;
                       })
                   }
               </div>
           </>
           : 
           <>
               <div>
                   {holiday.length !== 0 ? (
                       holiday.map((h) => {
                           return <HelloHolidayCard key={h.id} holiday={h} />;
                       })
                   ) : (
                       <h3> We're not taking holiday orders right now.</h3>
                   )}
               </div>
           </>
           );
}

export default Hello;