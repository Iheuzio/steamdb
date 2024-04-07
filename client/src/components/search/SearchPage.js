import './SearchPage.css';

import { useEffect, useState } from 'react';

import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const filterFields = ['title', 'publisher', 'developer', 'peak', 'release_date'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', operator: 'lt'});
    const [selectedGenres, setSelectedGenres] = useState(['All']);

    useEffect(() => {
        fetchGames(setResults, filters);
    }, []);

    const updateFilters = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        
        if (name === 'query') {
            value = value.toLowerCase();
        }

        const updatedFilters = {...filters, [name]: value};
    
        setFilters(updatedFilters);    
    }

    const handleSubmit = async (e, filters) => {
        e.preventDefault();
        
        await fetchGames(setResults, filters, formatFilters(filters));
    }
    
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    let resultsToDisplay = results;

    if (!selectedGenres.includes('All')) {
        resultsToDisplay = results.filter(result => selectedGenres.includes(result.primary_genre));
    }

    return (
    <>
        <NavBar />
        <div className="SearchPage">
            <button className="toggle-sidebar" onClick={toggleSidebar}>
                {sidebarOpen ? '<' : '>'}
            </button>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <GenreFilters selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
            </div>
            <Search results={resultsToDisplay}
                setResults={setResults}
                filters={filters}
                setFilters={setFilters}
                filterFields={filterFields}
                updateFilters={updateFilters}
                handleSubmit={handleSubmit} />    
        </div>
    </>
    )
}

async function fetchGames(setResults, filters, parameters = '') {
    let type = 'string';
    
    switch (filters.field) {
        case 'release_date': type = 'date'; break;
        case 'peak': type = 'number'; break;
        default: break;
    }

    const response = await fetch(`/localapi/search/${type}?${parameters}`);
    const json = await response.json();

    if (!response.ok) {
        setResults([]);
    } else {
        setResults(json);
    }
}

function formatFilters(filters) {
    let formatted = '';

    for (const key of Object.keys(filters)) {
        formatted += `${key}=${filters[key]}&`;
    }

    return formatted;
}