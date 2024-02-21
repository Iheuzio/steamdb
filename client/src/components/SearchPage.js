import { games } from './games';
import { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default function SearchPage() {
    const [results, setResults] = useState(games)

    const handleSubmit = (e, query) => {
        e.preventDefault();
        
        const filteredGames = games.filter(game => game.game.includes(query));
        setResults(filteredGames);
    }

    return <div>
        <SearchForm handleSubmit={handleSubmit} />
        <SearchResults results={results} />
    </div>
}