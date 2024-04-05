import './RandomGamesList.css';
import {Link} from 'react-router-dom';   // Import the Link component

export default function RandomGameList({results}) {
    return <table className="RandomGameList">
        <caption>Random Games</caption>
    <thead>
        {/* <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Release date</th>
            <th>Primary genre</th>
        </tr> */}
    </thead>
    <tbody>
        { results.map(result => <SearchResult key={result.id} result={result} />) } 
    </tbody>
</table>
}

function SearchResult({ result }) {

    //REGEX to retreive the api number from result.link
    const api = result.steam_api.match(/\d+/g);

    return <tr>
        {/* for mockup, delete after */}
        <td> <img src={ result.image_url} alt='image' width="100%" height="100%" /></td>
        <td>
            <Link to={`/details?game=${api}`}> {result.title} </Link>
        </td>
        <td>{ result.release_date.split('T')[0] }</td>
        <td>{ result.peak }</td>
        <td>{ result.positive_reviews }</td>
    </tr>
}