import './SearchPage.css';

import { games } from '../games';
import { useState } from 'react';

import Search from './Search';
import GenreFilters from './GenreFilters';

export default function SearchPage() {
    const [results, setResults] = useState(games)
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All'});

    const updateFilters = (e) => {
        let name = e.target.name;
        const value = e.target.value;
        
        if (name === 'query') {
            name = name.toLowerCase();
        }

        const updatedFilters = {...filters, [name]: value};
        
        handleOptionChange(e, updatedFilters);
        setFilters(updatedFilters);    
    }

    const handleOptionChange = (e, filters) => {
        e.preventDefault();

        const filteredGames = games.filter(game => {
            if (filters.genre === 'All') {
                return game[filters.field].toLowerCase().includes(filters.query)
            } else {
                return game[filters.field].toLowerCase().includes(filters.query) && game.primary_genre.includes(filters.genre);
            }
        });

        setResults(filteredGames);
    }
    
    return <div className="SearchPage">
        <Search results={results}
                setResults={setResults}
                filters={filters}
                setFilters={setFilters}
                filterFields={filterFields}
                updateFilters={updateFilters} />    
        <GenreFilters updateFilters={updateFilters} />
    </div>
}