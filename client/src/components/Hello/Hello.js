import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';
import { HolidayContext } from '../../providers/HolidayProvider';
import { HelloHolidayCard} from './HelloHolidayCard';

const Hello = () => {
    const { holiday, getAllAvailableHolidays } = useContext(HolidayContext);

    useEffect(() => {
        getAllAvailableHolidays();
    }, []);

    return (
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