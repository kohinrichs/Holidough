import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PickUpDayContext = React.createContext();

export const PickUpDayProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token

    const [pickUpDay, setPickUpDay] = useState();

    const getAllPickUpDays = () => {
        return getToken()
            .then((token) =>
                fetch('/api/pickupday', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
    };

    return (
        <PickUpDayContext.Provider
            value={{
                pickUpDay,
                getAllPickUpDays
            }}
        >
            {props.children}
        </PickUpDayContext.Provider>
    );
};