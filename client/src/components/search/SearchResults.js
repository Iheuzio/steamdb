import './SearchResults.css';
import { Link } from 'react-router-dom';

export default function SearchResults({ results }) {
    return <div className="SearchResults">
        { results.map(result => <SearchResult key={result.id} result={result} />) }
    </div>
}

function SearchResult({ result }) {
    // dummy images
    const sources = [
        "https://cdn.akamai.steamstatic.com/steam/apps/2231450/header.jpg?t=1674756021",
        "https://cdn.akamai.steamstatic.com/steam/apps/1817230/header.jpg?t=1706198637",
        "https://cdn.akamai.steamstatic.com/steam/apps/1201270/header.jpg?t=1704699294",
        "https://cdn.akamai.steamstatic.com/steam/apps/2171690/header.jpg?t=1700764126",
        "https://cdn.akamai.steamstatic.com/steam/apps/1765350/header.jpg?t=1679056781"
    ];

    const api = result.link.match(/\d+/g);

    return <div className="SearchResult">
        <div className="LinkContainer">
            <Link to={`/details?game=${api}`} className="Link"> {result.game} </Link>
        </div>
        <div className="img-container">
            <img src={sources[Math.floor(Math.random()*sources.length)]} alt="game icon"/>
            <div className="overlay">
                <div className="details">
                    <div><b>Game:</b> { result.game } </div>
                    <div><b>Rating:</b> { result.rating } </div>
                    <div><b>All time peak:</b> { result.all_time_peak } </div>
                    <div><b>Genres:</b> { result.store_genres } </div>
                    <div><b>Publisher:</b> { result.publisher } </div>
                </div>
            </div>
        </div>
    </div>
}