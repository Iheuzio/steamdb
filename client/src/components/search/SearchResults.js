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
        <img src={sources[Math.floor(Math.random()*sources.length)]} alt="game icon"/>
    </div>
}