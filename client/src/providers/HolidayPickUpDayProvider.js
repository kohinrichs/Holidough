import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const HolidayPickUpDayContext = React.createContext();

export const HolidayPickUpDayProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [holidayPickUpDay, setHolidayPickUpDay] = useState([]);

    const history = useHistory();

    const getHolidayPickUpDayByHolidayId = (holidayId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/holidaypickupday/${holidayId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    return (
        <HolidayPickUpDayContext.Provider
            value={{
                holidayPickUpDay,
                getHolidayPickUpDayByHolidayId
            }}
        >
            {props.children}
        </HolidayPickUpDayContext.Provider>
    );
};