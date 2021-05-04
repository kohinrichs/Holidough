import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token

    const [category, setCategory] = useState();

    const getAllCategories = () => {
        return getToken()
            .then((token) =>
                fetch('/api/category', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
    };

    return (
        <CategoryContext.Provider
            value={{
                category,
                getAllCategories
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};