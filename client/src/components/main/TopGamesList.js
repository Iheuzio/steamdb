import './TopGamesList.css';
import {Link} from 'react-router-dom';   // Import the Link component

export default function TopGameList({results}) {
    return <table className="TopGameList">
        <caption>Top Games</caption>
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
    const api = result.link.match(/\d+/g);

    return <tr>
        {/* for mockup, delete after */}
        <td> <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_sm_120.jpg?t=1709086268" width="50px" /></td>
        <td>
            <Link to={`/details?game=${api}`}> {result.game} </Link>
        </td>
        <td>{ result.release }</td>
        <td>{ result.peak_players }</td>
        <td>{ result.rating }</td>
        {/* <td>{ result.primary_genre }</td>
        <td>{ result.developer }</td> */}
    </tr>
}