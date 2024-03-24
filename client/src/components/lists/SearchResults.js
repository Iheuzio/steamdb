// SearchResults.js
import './SearchResults.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SearchResults({ results, handleAddGame, addedGames }) {
    return (
        <table className="SearchResults">
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
                        key={result.id}
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
    const api = result.link.match(/\d+/g);
    const [isGameAdded, setIsGameAdded] = useState(false);

    useEffect(() => {
        const gameExists = addedGames.some(game => game.id === result.id);
        setIsGameAdded(gameExists);
    }, [addedGames, result.id]);

    const handleClick = () => {
        handleAddGame(result);
        setIsGameAdded(true);
    };

    return (
        <tr>
            <td>
                <Link to={`/details?game=${api}`}> {result.game} </Link>
            </td>
            <td>{result.release}</td>
            <td>{result.peak_players}</td>
            <td>{result.rating}</td>
            <td>{result.primary_genre}</td>
            <td>{result.developer}</td>
            <td>
                <button onClick={handleClick} disabled={isGameAdded}>Add</button>
            </td>
        </tr>
    );
}