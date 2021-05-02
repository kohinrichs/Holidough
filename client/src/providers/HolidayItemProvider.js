import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const HolidayItemContext = React.createContext();

export const HolidayItemProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [holidayItem, setHolidayItem] = useState([]);

    const history = useHistory();

    const getHolidayItemsByHolidayId = (holidayId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/holidayitem/getbyholidayid/${holidayId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    return (
        <HolidayItemContext.Provider
            value={{
                holidayItem,
                getHolidayItemsByHolidayId
            }}
        >
            {props.children}
        </HolidayItemContext.Provider>
    );
};