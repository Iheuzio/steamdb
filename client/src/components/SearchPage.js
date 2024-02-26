import './SearchPage.css';

import { games } from './games';
import { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default function SearchPage() {
    const [results, setResults] = useState(games)

    const handleOptionChange = (e, filters) => {
        e.preventDefault();

        const filteredGames = games.filter(game => game[filters.field].includes(filters.query));
        setResults(filteredGames);
    }

    return <div className="SearchPage">
        <SearchForm handleSubmit={handleOptionChange} />
        <SearchResults results={results} />
    </div>
}