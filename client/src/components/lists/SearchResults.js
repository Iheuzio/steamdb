import './SearchResults.css';
import { Link } from 'react-router-dom';

export default function SearchResults({ results, handleAddGame }) {
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
                    />
                ))}
            </tbody>
        </table>
    );
}

function SearchResult({ result, handleAddGame }) {
    //REGEX to retrieve the api number from result.link
    const api = result.link.match(/\d+/g);

    const handleClick = () => {
        handleAddGame(result);
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
                <button onClick={handleClick}>Add</button>
            </td>
        </tr>
    );
}