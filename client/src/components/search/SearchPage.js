import './SearchPage.css';

import { games } from '../games';
import { useEffect, useState } from 'react';

import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';

export default function SearchPage() {
    const [results, setResults] = useState([])
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All'});

    useEffect(() => {
        async function fetchGames() {
            const response = await fetch('/localapi/steamgames');
            const json = await response.json();

            if (!response.ok) {
                alert(json.error);
                setResults([]);
            } else {
                setResults(json);
            }
        }

        fetchGames();
    }, []);

    const updateFilters = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        
        if (name === 'query') {
            value = value.toLowerCase();
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
    
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
    <>
        <NavBar />
        <div className="SearchPage">
            <button className="toggle-sidebar" onClick={toggleSidebar}>
                {sidebarOpen ? '<' : '>'}
            </button>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <GenreFilters updateFilters={updateFilters} />
            </div>
            <Search results={results}
                setResults={setResults}
                filters={filters}
                setFilters={setFilters}
                filterFields={filterFields}
                updateFilters={updateFilters} />    
            {/* <GenreFilters updateFilters={updateFilters} /> */}
        </div>
    </>
    )
}