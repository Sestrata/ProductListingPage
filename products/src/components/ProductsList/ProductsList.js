import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ProductsList = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
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

    const [sortBy, setSortBy] = useState('nameAsc');

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const renderStars = (rating) => {
        const maxRating = 5;
        const starArray = [];

        for (let i = 0; i < maxRating; i++) {
            if (i < rating) {
                starArray.push(<span key={i} className="star filled"><i className="fas fa-star"></i></span>);
            } else {
                starArray.push(<span key={i} className="star"><i className="far fa-star"></i></span>);
            }
        }

        return starArray;
    };

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

    useEffect(() => {
        let sortedDataCopy = [...data];

        if (sortBy === 'nameAsc') {
            sortedDataCopy.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'nameDesc') {
            sortedDataCopy.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === 'priceAsc') {
            sortedDataCopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'priceDesc') {
            sortedDataCopy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        setSortedData(sortedDataCopy);
    }, [data, sortBy]);

    return (
        <section className="main-container">
            <section className="filter">
                <h3>FILTER</h3>
            </section>

            <section className="productsList">
                <section className="small-container">
                    <div className="categoryName">
                        <h2>{categoryName}</h2>
                        <h5>{sortedData.length} products</h5>
                    </div>

                    <div className="sort-container">
                        <h4 className="sort">SORT BY:</h4>
                        <select onChange={handleSortChange} value={sortBy}>
                            <option value="nameAsc">Name A-Z</option>
                            <option value="nameDesc">Name Z-A</option>
                            <option value="priceAsc">Price Low-High</option>
                            <option value="priceDesc">Price High-Low</option>
                        </select>
                    </div>
                </section>

                <section className="grid">
                    {sortedData.map(x =>
                        <div key={x.id} className="grid-item">
                            <img src={x.img} alt="img" />
                            <section className="moreInfo">
                                <h3>{x.name}</h3>
                                <p>{x.description}</p>
                                <h4>{parseFloat(x.price).toFixed(2)} euro</h4>
                                <h4>{x.discountPrice}</h4>
                                <div className="rating">
                                    {renderStars(x.rating)}
                                </div>
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