import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const HolidayPickUpTimeContext = React.createContext();

export const HolidayPickUpTimeProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [holidayPickUpTime, setHolidayPickUpTime] = useState([]);

    const history = useHistory();

    const getHolidayPickUpTimeByHolidayId = (holidayId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/holidaypickuptime/${holidayId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    return (
        <HolidayPickUpTimeContext.Provider
            value={{
                holidayPickUpTime,
                getHolidayPickUpTimeByHolidayId
            }}
        >
            {props.children}
        </HolidayPickUpTimeContext.Provider>
    );
};