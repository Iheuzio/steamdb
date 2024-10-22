import './SearchPage.css';

import { useEffect, useState } from 'react';

import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const filterFieldsToDisplay = ['Title', 'Publisher', 'Developer', 'Peak', 'Release Date'];
    const filterFields = ['title', 'publisher', 'developer', 'peak', 'release_date'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', operator: 'lt'});
    const [selectedGenres, setSelectedGenres] = useState(['All']);
    const [page, setPage] = useState(0);
    
    useEffect(() => {
        fetchGames(setResults, filters, true, formatParameters(filters, page));
    }, [page]);

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
        setPage(0);

        await fetchGames(setResults, filters, false, formatParameters(filters, 0));
    }
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <ToastContainer 
                position="top-center"
            />

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
                filterFieldsToDisplay={filterFieldsToDisplay}
                updateFilters={updateFilters}
                handleSubmit={handleSubmit}
                setPage={setPage}
                />
        </div>
    </>
    )
}

async function fetchGames(setResults, filters, sameQuery = false, parameters = '') {
    const displayError = (error) => toast.error(error);

    let type = 'string';
    
    switch (filters.field) {
        case 'release_date': type = 'date'; break;
        case 'peak': type = 'number'; break;
        default: break;
    }

    const response = await fetch(`/localapi/search/${type}?${parameters}`);
    const json = await response.json();

    if (!response.ok) {
        if (!sameQuery) {
            setResults([]);
            displayError(json.error);
        } else {
            if (response.status !== 404) {
                displayError(json.error);
            }
        }
    } else {
        if (sameQuery) {
            setResults(results => [...results, ...json]);
        } else {
            setResults(json);
        }
    }
}

function formatParameters(filters, page) {
    let formatted = '';

    for (const key of Object.keys(filters)) {
        formatted += `${key}=${filters[key]}&`;
    }

    formatted += `page=${page}`;

    return formatted;
}