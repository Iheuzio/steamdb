import './SearchResults.css';
import { Link } from 'react-router-dom';

export default function SearchResults({ results }) {
    return <div className="SearchResults">
        { results.map(result => <SearchResult key={result.id} result={result} />) }
    </div>
}

function SearchResult({ result }) {
    console.log(result);
    return <div className="SearchResult">
        <div className="LinkContainer">
            <Link to={`/details?game=${result.steam_api}`} className="Link"> {result.title} </Link>
        </div>
        <div className="img-container">
            <img src={result.image_url} alt="game icon"/>
            <div className="overlay">
                <div className="details">
                    <div><b>Positive reviews:</b> { result.positive_reviews } </div>
                    <div><b>All time peak:</b> { result.peak } </div>
                    <div><b>Genre:</b> { result.primary_genre } </div>
                    <div><b>Publisher:</b> { result.publisher } </div>
                </div>
            </div>
        </div>
    </div>
}