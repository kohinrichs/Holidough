import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ItemContext = React.createContext();

export const ItemProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token

    const [item, setItems] = useState();

    const getAllItems = () => {
        return getToken()
            .then((token) =>
                fetch('/api/item', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
    };

    return (
        <ItemContext.Provider
            value={{
                item,
                getAllItems
            }}
        >
            {props.children}
        </ItemContext.Provider>
    );
};