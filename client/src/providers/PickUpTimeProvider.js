import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PickUpTimeContext = React.createContext();

export const PickUpTimeProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token

    const [pickUpTime, setPickUpTime] = useState();

    const getAllPickUpTimes = () => {
        return getToken()
            .then((token) =>
                fetch('/api/pickuptime', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
    };

    return (
        <PickUpTimeContext.Provider
            value={{
                pickUpTime,
                getAllPickUpTimes
            }}
        >
            {props.children}
        </PickUpTimeContext.Provider>
    );
};