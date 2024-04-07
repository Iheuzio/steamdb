import './SearchResults.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function SearchResults({ results, handleAddGame, addedGames }) {
    return (
        <table className="SearchResultsList">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release date</th>
                    <th>Peak players</th>
                    <th>Rating</th>
                    <th>Primary genre</th>
                    <th>Developer</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {results.map(result => (
                    <SearchResult
                        key={result._id}
                        result={result}
                        handleAddGame={handleAddGame}
                        addedGames={addedGames}
                    />
                ))}
            </tbody>
        </table>
    );
}

function SearchResult({ result, handleAddGame, addedGames }) {
    const [isGameAdded, setIsGameAdded] = useState(false);

    useEffect(() => {
        const gameExists = Array.isArray(addedGames) && addedGames.some(game => game._id === result._id);
        setIsGameAdded(gameExists);
    }, [addedGames, result._id]);

    const handleClick = () => {
        handleAddGame(result);
        setIsGameAdded(true);
    };

    const apiLink = result.steam_api.match(/\d+/g);
    const defaultImageUrl = 'https://shlomytestcontainer.blob.core.windows.net/imageblobtest/default.png';
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <tr>
            <td>
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
            </td>
            <td>{result.release_date.split("T")[0]}</td>
            <td>{result.peak}</td>
            <td>{Math.round(result.positive_reviews / (result.positive_reviews + result.negative_reviews) * 100)}%</td>
            <td>{result.primary_genre}</td>
            <td>{result.developer}</td>
            <td>
                <button onClick={handleClick} disabled={isGameAdded}>
                    {isGameAdded ? 'Added' : 'Add'}
                </button>
            </td>
        </tr>
    );
}