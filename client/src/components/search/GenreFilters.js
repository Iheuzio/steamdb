import './GenreFilters.css';

export default function GenreFilters({ updateFilters }) {
    const genres = ['All', 'Action', 'Casual', 'Indie', 'RPG', 'Strategy', 'Adventure', 'Free to Play', 'Simulation'];

    return <div value='test' className="GenreFilters">
        { genres.map(genre => <GenreFilter key={genre} genre={genre} updateFilters={updateFilters} /> ) }
    </div>
}

function GenreFilter({ genre, updateFilters }) {
    return <input className="GenreFilter"
                  name="genre"
                  defaultValue={genre}
                  onClick={e => updateFilters(e)}
                  readOnly />
}