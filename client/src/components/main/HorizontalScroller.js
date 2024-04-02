import './HorizontalScroller.css';
import {Link} from 'react-router-dom';   // Import the Link component

export default function HorizontalScroller({results}) {
    return <div>
        <h1 class="mt-12 mb-4 font-semibold  text-xl">Horizontal Game Slider</h1>
        <div class="slider">
        <div class="slide-track2">
            {/* { Array.from({ length: 50 }, (_, index) => <ImageSet key={index} />) } */}
            { results.map(result => <SearchResult key={result.id} result={result} />) } 

        </div>
        </div>
    </div>
}

function ImageSet() {
    return <>
        <img class="slide bg-red-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg?t=1707955699"/>
        <img class="slide bg-purple-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1698860631"/>
        <img class="slide bg-blue-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg?t=1705604554"/>
        <img class="slide bg-green-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/899770/header.jpg?t=1709060046"/>
        <img class="slide bg-pink-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_sm_120.jpg?t=1709086268"/>
    </>
}

function SearchResult({ result }) {
    //REGEX to retrieve the api number from result.link
    const api = result.steam_api.match(/\d+/g);

    return <div>
        <Link to={`/details?game=${api}`}>
        <a> <img src={ result.image_url}  class="slide bg-pink-500" alt='image' width="50px" /></a>
        </Link>
    </div>
}
