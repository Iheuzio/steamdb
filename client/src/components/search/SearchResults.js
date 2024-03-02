import './SearchResults.css';
import { Link } from 'react-router-dom';

export default function SearchResults({ results }) {
    return <table className="SearchResults">
        <thead>
            <tr>
                <th>Title</th>
                <th>Release date</th>
                <th>Peak players</th>
                <th>Rating</th>
                <th>Primary genre</th>
                <th>Developer</th>
            </tr>
        </thead>
        <tbody>
            { results.map(result => <SearchResult key={result.id} result={result} />) }
        </tbody>
    </table>
}

function SearchResult({ result }) {
    return <tr>
        <td>
            <Link to={`/details?game=${result.game}`}> {result.game} </Link>
        </td>
        <td>{ result.release }</td>
        <td>{ result.peak_players }</td>
        <td>{ result.rating }</td>
        <td>{ result.primary_genre }</td>
        <td>{ result.developer }</td>
    </tr>
}