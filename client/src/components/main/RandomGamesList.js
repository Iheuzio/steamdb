import './RandomGamesList.css';
import {Link} from 'react-router-dom';   // Import the Link component

export default function RandomGameList() {
    
    return <table className="RandomGameList">
    <thead>
    <Link to={'/search'}>
        <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Release date</td>
            <td>Primary genre</td>
        </tr>
        </Link>
        <Link to={'/search'}>
        <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Release date</td>
            <td>Primary genre</td>
        </tr>
        </Link>
    </thead>
    <tbody>
        {/* { results.map(result => <SearchResult key={result.id} result={result} />) } */}
    </tbody>
</table>
}

