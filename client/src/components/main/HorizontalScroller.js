/* eslint-disable jsx-a11y/img-redundant-alt */
import './HorizontalScroller.css';
import {Link} from 'react-router-dom';   // Import the Link component

export default function HorizontalScroller({results}) {
    return <div>
        <h1 class="mt-12 mb-4 font-semibold  text-xl">Weekly Top 50</h1>
        <div class="slider">
        <div class="slide-track2">
            { results.map(result => <SearchResult key={result.id} result={result} />) } 
        </div>
        </div>
    </div>
}

function SearchResult({ result }) {
    const api = result.steam_api.match(/\d+/g);

    return <div>
        <Link to={`/details?game=${api}`}>
        <img src={ result.image_url}  className="slide bg-pink-500" alt='image' width="50px" />
        </Link>
    </div>
}
