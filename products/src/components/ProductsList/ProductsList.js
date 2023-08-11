import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ProductsList = () => {
    const [data, setData] = useState([]);
    const location = useLocation();

    let category = 'all';
    if (location.pathname === '/forWomen') {
        category = 'women';
    } else if (location.pathname === '/forMen') {
        category = 'men';
    } else if (location.pathname === '/forKids') {
        category = 'kids';
    }

    let categoryName = '';
    if (category === 'women') {
        categoryName = 'FOR WOMEN';
    } else if (category === 'men') {
        categoryName = 'FOR MEN';
    } else if (category === 'kids') {
        categoryName = 'FOR KIDS';
    } else {
        categoryName = 'ALL PRODUCTS';
    }

    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(jsonData => {
                if (category === 'all') {
                    setData(jsonData);
                } else {
                    const filtered = jsonData.filter(item => item.section === category);
                    setData(filtered);
                }
            });
    }, [category]);

    return (
        <section className="main-container">
            <section className="filter">
                <h3>FILTER</h3>
            </section>

            <section className="productsList">

                <section className="small-container">
                    <div className="categoryName">
                        <h3>{categoryName}</h3>
                        <h5>{data.length} products</h5>
                    </div>
                    <h3 className="sort">SORT BY:</h3>
                </section>

                <section className="grid">
                    {data.map(x =>
                        <div key={x.id} className="grid-item">
                            <img src={x.img} alt="img" />
                            <section className="moreInfo">
                                <h3>{x.name}</h3>
                                <p>{x.description}</p>
                                <h4>{parseFloat(x.price).toFixed(2)} euro</h4>
                                <h4>{x.discountPrice}</h4>
                                <h4>{x.rating}</h4>
                                <button>Add to Cart</button>
                            </section>
                        </div>
                    )}
                </section>

            </section>

            <button className="btn">Load More</button>
        </section>
    );
};