import './GenreFilters.css';

export default function GenreFilters({ selectedGenres, setSelectedGenres }) {
    const genres = ['All', 'Action', 'Casual', 'Indie', 'RPG', 'Strategy', 'Adventure', 'Free', 'Simulation'];
    
    const handleGenreSelect = (e) => {
        e.preventDefault();

        const genre = e.target.value;

        if (genre === 'All') {
            setSelectedGenres(['All']);
        } else {
            if (selectedGenres.includes(genre)) {
                const updatedGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);

                if (updatedGenres.length === 0) {
                    setSelectedGenres(['All']);
                } else {
                    setSelectedGenres(updatedGenres);
                }
            } else {
                const updatedGenres = [...selectedGenres, genre].filter(selectedGenre => selectedGenre !== 'All');
                setSelectedGenres(updatedGenres);       
            }
        }
    };

    return <div value='test' className="GenreFilters">
        { genres.map(genre => <GenreFilter
            key={genre}
            genre={genre}
            selectedGenres={selectedGenres}
            handleGenreSelect={handleGenreSelect} /> ) }
    </div>
}

function GenreFilter({ genre, selectedGenres, handleGenreSelect }) {
    const genreIsSelected = selectedGenres.includes(genre);
    const backgroundColor = genreIsSelected ? '#007bff' : '#f5f5f5';
    const color = genreIsSelected ? 'white' : 'black';

    return <input className="GenreFilter"
                  name="genre"
                  defaultValue={genre}
                  onClick={e => handleGenreSelect(e)}
                  style={{ color: color, backgroundColor: backgroundColor }}
                  readOnly />
}