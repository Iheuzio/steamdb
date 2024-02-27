import './SearchPage.css';

import { games } from './games';
import { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import GenreFilters from './GenreFilters';

export default function SearchPage() {
    const [results, setResults] = useState(games)

    const handleOptionChange = (e, filters) => {
        e.preventDefault();

        const filteredGames = games.filter(game => game[filters.field].includes(filters.query));
        setResults(filteredGames);
    }

    return <div className="SearchPage">
        <div className="SearchFormResults">
            <SearchForm handleOptionChange={handleOptionChange} />
            <SearchResults results={results} />
        </div>
        
        <GenreFilters />
    </div>
}