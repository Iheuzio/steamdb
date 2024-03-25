import './SearchPage.css';

import { useEffect, useState } from 'react';

import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';

export default function SearchPage() {
    const [results, setResults] = useState([])
    const filterFields = ['title', 'publisher', 'developer', 'peak', 'release_date'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All', operator: 'lt'});

    useEffect(() => {
        fetchGames(setResults);
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

    const handleOptionChange = async (e, filters) => {
        e.preventDefault();
        
        await fetchGames(setResults, formatFilters(filters));
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
                <GenreFilters filters={filters} updateFilters={updateFilters} />
            </div>
            <Search results={results}
                setResults={setResults}
                filters={filters}
                setFilters={setFilters}
                filterFields={filterFields}
                updateFilters={updateFilters} />    
        </div>
    </>
    )
}

async function fetchGames(setResults, filters = '') {
    console.log(`/localapi/steamgames${filters}`);
    const response = await fetch(`/localapi/steamgames${filters}`);
    const json = await response.json();

    if (!response.ok) {
        //alert(json.error);
        setResults([]);
    } else {
        setResults(json);
    }
}

function formatFilters(filters) {
    let formatted = '?';

    for (const key of Object.keys(filters)) {
        formatted += `${key}=${filters[key]}&`;
    }

    return formatted;
}