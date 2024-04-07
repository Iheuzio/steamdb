import './SearchResults.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function SearchResults({ results, setPage }) {
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;

            if (currentHeight + 1 >= scrollHeight) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);    
    }, []);


    return <>
        <div className="SearchResults">
            { results.map((result, i) => <SearchResult key={i} result={result} />) }
        </div>
    </>
}

function SearchResult({ result }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const defaultImageUrl = 'https://shlomytestcontainer.blob.core.windows.net/imageblobtest/default.png';

    const apiLink = result.steam_api.match(/\d+/g);

    return (
        <div className="SearchResult">
            <div className="LinkContainer">
                <Link to={`/details?game=${apiLink}`} className="Link"> {result.title} </Link>
            </div>
            <div className="img-container">
                {imageError ? (
                    <img src={defaultImageUrl} alt="game icon" />
                ) : (   
                    <img src={result.image_url} alt="game icon" onError={handleImageError} />
                )}
                <div className="overlay">
                    <div className="details">
                        <div><b>Positive reviews:</b> {result.positive_reviews} </div>
                        <div><b>All time peak:</b> {result.peak} </div>
                        <div><b>Genre:</b> {result.primary_genre} </div>
                        <div><b>Publisher:</b> {result.publisher} </div>
                        <div><b>Release date:</b> {result.release_date.split("T")[0]} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}