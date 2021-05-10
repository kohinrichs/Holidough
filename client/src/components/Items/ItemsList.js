import React, { useState, useContext, useEffect } from 'react';
import { ItemContext } from '../../providers/ItemProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { ItemCard } from './ItemCard';

export const ItemsList = () => {

    const { getAllItems } = useContext(ItemContext);
    const { getAllCategories } = useContext(CategoryContext);

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, []);

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, []);

    return (
        <>
            <div>
                <h2>Items</h2>
                {
                    categories.map((c) => {
                        return <div key={c.id}>
                            <h4>{c.name}</h4>
                            <div>
                                {
                                    items.filter(item => item.categoryId === c.id).map(i => {
                                        return <ItemCard key={i.id} item={i} />;
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    );
}

