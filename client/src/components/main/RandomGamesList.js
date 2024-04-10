import './RandomGamesList.css';
import {Link} from 'react-router-dom';   // Import the Link component
import {useState} from 'react';           // Import the useState hook

export default function RandomGameList({results}) {
    return <table className="RandomGameList">
        <caption className='caption' >Random Games</caption>
    <thead>
    </thead>
    <tbody>
        { results.map(result => <SearchResult key={result.id} result={result} />) } 
    </tbody>
</table>
}

function SearchResult({ result }) {
    const api = result.steam_api.match(/\d+/g);
    const [imageError, setImageError] = useState(false);

    const defaultImageUrl = 'https://shlomytestcontainer.blob.core.windows.net/imageblobtest/default.png';

    const handleImageError = () => {
        setImageError(true);
    };

    return <tr>
        <td>
            {imageError ? (
                <img src={ defaultImageUrl} alt='image'/>
            ) : (
                <img src={ result.image_url} alt='image' onError={handleImageError}/>
            )}
            
        </td>
        <td>
            <Link to={`/details?game=${api}`}> {result.title} </Link>
        </td>
        <td>{ result.release_date.split('T')[0] }</td>
        <td>{ result.peak }</td>
        <td>{ result.positive_reviews }</td>
    </tr>
}