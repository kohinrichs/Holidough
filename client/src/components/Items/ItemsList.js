import React, { useState, useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import { ItemContext } from '../../providers/ItemProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { ItemCard } from './ItemCard';
import "./Item.css"

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
            <Container className="col-sm-6 col-lg-10 justify-content-center">
                <div>
                    <div className="itemHeader">
                        <h2>Items</h2>
                    </div>
                    {
                        categories.map((c) => {
                            return <div className="category" key={c.id}>
                                <h4>{c.name}</h4>
                                <div className="itemCards">
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
            </Container>
        </>
    );
}

