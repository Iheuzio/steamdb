import './GenreFilters.css';

export default function GenreFilters({ filters, updateFilters }) {
    const genres = ['All', 'Action', 'Casual', 'Indie', 'RPG', 'Strategy', 'Adventure', 'Free to Play', 'Simulation'];
    
    
    return <div value='test' className="GenreFilters">
        { genres.map(genre => <GenreFilter key={genre} genre={genre} filters={filters} updateFilters={updateFilters}/> ) }
    </div>
}

function GenreFilter({ genre, filters, updateFilters }) {
    const backgroundColor = filters.genre === genre ? '#007bff' : '#f5f5f5';
    const color = filters.genre === genre ? 'white' : 'black';

    return <input className="GenreFilter"
                  name="genre"
                  defaultValue={genre}
                  onClick={e => updateFilters(e)}
                  style={{ color: color, backgroundColor: backgroundColor }}
                  readOnly />
}