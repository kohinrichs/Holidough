import React from 'react';
import { useHistory, } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';


export const HelloHolidayCard = ({ holiday }) => {

    const history = useHistory();

    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    return (

        <Card>
            <CardBody>
                <strong>{holiday.name} {dateFormatter(holiday.date)}</strong>

                <Button
                    onClick={
                        e => {
                            e.preventDefault()
                            history.push(`/orderform/${holiday.id}`)
                        }}>Place Order</Button>
            </CardBody>
        </Card>

    );
};