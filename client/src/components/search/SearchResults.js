import './SearchResults.css';
import { Link } from 'react-router-dom';

export default function SearchResults({ results }) {
    return <div className="SearchResults">
        { results.map(result => <SearchResult key={result.id} result={result} />) }
    </div>
}

function SearchResult({ result }) {
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

    // //REGEX to retreive the api number from result.link
    // const api = result.link.match(/\d+/g);

    // return <tr>
    //     <td>
    //         <Link to={`/details?game=${api}`}> {result.game} </Link>
    //     </td>
    //     <td>{ result.release }</td>
    //     <td>{ result.peak_players }</td>
    //     <td>{ result.rating }</td>
    //     <td>{ result.primary_genre }</td>
    //     <td>{ result.developer }</td>
    // </tr>
}