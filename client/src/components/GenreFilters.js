import './GenreFilters.css';

export default function GenreFilters() {
    const genres = ['All', 'Action', 'Casual', 'Indie', 'RPG', 'Strategy', 'Adventure', 'Free to Play', 'Simulation'];

    return <div className="GenreFilters">
        { genres.map(genre => <GenreFilter key={genre} genre={genre} /> ) }
    </div>
}

function GenreFilter({ genre }) {
    return <div className="GenreFilter">{ genre }</div>
}