import './SearchResults.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function SearchResults({ results, handleAddGame, addedGames }) {
    return (
        <div className='SearchRList'>
            {results.map(result => (
                <SearchResult
                    key={result._id}
                    result={result}
                    handleAddGame={handleAddGame}
                    addedGames={addedGames}
                />
            ))}
        </div>
    );
}

function SearchResult({ result, handleAddGame, addedGames }) {
    const [isGameAdded, setIsGameAdded] = useState(false);
    const apiLink = result.steam_api && result.steam_api.match(/\d+/g);
    const defaultImageUrl = 'https://shlomytestcontainer.blob.core.windows.net/imageblobtest/default.png';
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const gameExists = Array.isArray(addedGames) && addedGames.some(game => game._id === result._id);
        setIsGameAdded(gameExists);
    }, [addedGames, result._id]);

    const handleClick = () => {
        if (!isGameAdded) {
            handleAddGame(result);
            setIsGameAdded(true);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="containerThing">
            <div className="LinkContainer">
                {apiLink ? (
                    <Link to={`/details?game=${apiLink}`} className="Link">
                        {result.title}
                    </Link>
                ) : (
                    <span>{result.title}</span>
                )}
            </div>
            <div className="img-container">
                {imageError ? (
                    <img src={defaultImageUrl} alt="game icon" />
                ) : (
                    <img src={result.image_url} alt="game icon" onError={handleImageError} />
                )}
                <div
                    className="overlay"
                    onClick={handleClick}
                    style={{ pointerEvents: isGameAdded ? 'none' : 'auto', opacity: isGameAdded ? 0.5 : 1 }}
                >
                    <div className="details">
                        <div>
                            <b>Rating:</b> {Math.round((result.positive_reviews / (result.positive_reviews + result.negative_reviews)) * 100)}%
                        </div>
                        <div>
                            <b>All time peak:</b> {result.peak}
                        </div>
                        <div>
                            <b>Genre:</b> {result.primary_genre}
                        </div>
                        <div>
                            <b>Publisher:</b> {result.publisher}
                        </div>
                        <div>
                            <b>Release date:</b> {result.release_date.split("T")[0]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}