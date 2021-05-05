import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const HolidayContext = React.createContext();

export const HolidayProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [holiday, setHoliday] = useState([]);

    const history = useHistory();

    const getAllHolidays = () => {
        return getToken()
            .then((token) =>
                fetch('/api/holiday', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setHoliday);
    };

    const getAllAvailableHolidays = () => {
        return getToken()
            .then((token) =>
                fetch('/api/holiday/available', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setHoliday);
    };

    const getHolidayById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/holiday/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    return (
        <HolidayContext.Provider
            value={{
                holiday,
                getAllHolidays,
                getAllAvailableHolidays,
                getHolidayById
            }}
        >
            {props.children}
        </HolidayContext.Provider>
    );
};