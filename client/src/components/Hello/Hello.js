import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Jumbotron, Container } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HelloHolidayCard } from './HelloHolidayCard';
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

    useEffect(() => {
        getOrdersByUserProfileId()
            .then(setOrder)
    }, []);


    // orders is all the orders placed by the logged in user.

    // Check to see if order.holidayId = holiday.id
    // let placedOrders = order.map((o) => {
    //     holiday.filter((h) => h.id !== o.holidayId)
    //     return o
    // })

    // check to see if they need to place an order for an available holiday
    let availableHolidays = holiday.filter((h => h.id === o.holidayId).map
        order.map((o) => o.holidayId !== h.id)
    }
return h
    )

// let availableHolidays = holiday.filter((h) => {
//     order.map((o) => o.holidayId !== h.id)
// }
// return h
// )

{
    holidayItem.filter(item => item.item.categoryId === c.id).map(hi => {
        return <OrderItemCard key={hi.id} holidayItem={hi} orderItems={orderItems} handleSelect={quantityForOrderItem} />;
    })
}

console.log(availableHolidays)

// need to render a button if there's an available holiday and they don't have an order or a list of what their
// order is if they do have an order

// filter through available holidays and either display a button or and order. 

// show all past orders
return availableHolidays ? (
    //    placedOrders.length > 0 ? 
    <>
        <Jumbotron fluid>
            <Container fluid>
                <h1 className="display-3">Thank you for your order!</h1>
                <p className="lead">Have a question or need to make a change? Email us at holidays@bakery.com or call the shop during store hours (123.456.6789) </p>
            </Container>
        </Jumbotron>
        {/* <div>
                  {availableHolidays.length !== 0 ? (
                       availableHolidays.map((h) => {
                           return <HelloHolidayCard key={h.id} holiday={h} />;
                       })
                   ) : (
                       <h3> We're not taking holiday orders right now.</h3>
                   )}
               </div> */}
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