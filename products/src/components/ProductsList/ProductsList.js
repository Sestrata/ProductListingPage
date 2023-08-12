import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ProductsList = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const location = useLocation();
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState('nameAsc');

    const [visibleItems, setVisibleItems] = useState(20);
    const [showLoadMore, setShowLoadMore] = useState(true);

    const handleLoadMore = () => {
        const newVisibleItems = visibleItems + 20;
        setVisibleItems(newVisibleItems);

        if (newVisibleItems >= sortedData.length) {
            setShowLoadMore(false);
        };
    };

    let category = 'all';
    if (location.pathname === '/forWomen') {
        category = 'women';
    } else if (location.pathname === '/forMen') {
        category = 'men';
    } else if (location.pathname === '/forKids') {
        category = 'kids';
    };

    let categoryName = '';
    if (category === 'women') {
        categoryName = 'FOR WOMEN';
    } else if (category === 'men') {
        categoryName = 'FOR MEN';
    } else if (category === 'kids') {
        categoryName = 'FOR KIDS';
    } else {
        categoryName = 'ALL PRODUCTS';
    };

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
        };
        return starArray;
    };

    const applyFilters = () => {
        let filteredData = data;

        if (selectedColor) {
            filteredData = filteredData.filter(item => item.color === selectedColor);
        };

        if (selectedRating > 0) {
            filteredData = filteredData.filter(item => item.rating >= selectedRating);
        };
        setData(filteredData);
    };

    useEffect(() => {
        setSortBy('nameAsc');
        setSelectedColor('');
        setSelectedRating(0);
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
        };
        setSortedData(sortedDataCopy);
    }, [data, sortBy]);

    return (
        <section className="main-container">
            <div className="categoryName">
                <h2>{categoryName}</h2>
                <h5>{sortedData.length} products</h5>
            </div>

            <section className="small-container">
                <section className="filter">
                    <h3>FILTER</h3>
                    <div className="filter_color">
                        <label>Color: </label>
                        <select
                            value={selectedColor}
                            onChange={event => setSelectedColor(event.target.value)}
                        >
                            <option value="">All</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="pink">Pink</option>
                            <option value="grey">Grey</option>
                            <option value="yellow">Yellow</option>
                            <option value="orange">Orange</option>
                            <option value="white">White</option>
                        </select>
                    </div>
                    <div className="filter_rating">
                        <label>Rating: </label>
                        <select
                            value={selectedRating}
                            onChange={event => setSelectedRating(parseInt(event.target.value))}
                        >
                            <option value={0}>All</option>
                            <option value={1}>1 star and above</option>
                            <option value={2}>2 stars and above</option>
                            <option value={3}>3 stars and above</option>
                            <option value={4}>4 stars and above</option>
                            <option value={5}>5 stars</option>
                        </select>
                    </div>
                    <button onClick={applyFilters}>Apply Filters</button>
                </section>

                <section className="productsList">
                    <div className="sort-container">
                        <h4 className="sort">SORT BY:</h4>
                        <select onChange={handleSortChange} value={sortBy}>
                            <option value="nameAsc">Name A-Z</option>
                            <option value="nameDesc">Name Z-A</option>
                            <option value="priceAsc">Price Low-High</option>
                            <option value="priceDesc">Price High-Low</option>
                        </select>
                    </div>

                    <section className="grid">
                        {sortedData.slice(0, visibleItems).map(x =>
                            <div key={x.id} className="grid-item">
                                <img src={x.img} alt="img" />
                                <section className="moreInfo">
                                    <h3>{x.name}</h3>
                                    <p>{x.description}</p>
                                    {x.discountprice ? (
                                        <div>
                                            <h4><del>{parseFloat(x.price).toFixed(2)} euro</del></h4>
                                            <h4 className="discountPrice">{parseFloat(x.discountprice).toFixed(2)} euro</h4>
                                        </div>
                                    ) : (
                                        <h4>{parseFloat(x.price).toFixed(2)} euro</h4>
                                    )}
                                    <div className="rating">
                                        {renderStars(x.rating)}
                                    </div>
                                    <button onClick={() => { alert('Product added to cart') }}>Add to Cart</button>
                                </section>
                            </div>
                        )}
                    </section>
                    {showLoadMore && <button className="btn" onClick={handleLoadMore}>Load More</button>}
                </section>
            </section>
        </section>
    );
};