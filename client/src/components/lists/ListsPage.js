// SearchPage.js
import './SearchPage.css';
import './ListPage.css';
import { games } from '../games';
import { useEffect, useState } from 'react';
import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';
import Toolbar from '../navigation/ToolBar';
import UserGameList from './UserGameList';

export default function ListsPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/account')
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/auth/steam';
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setUser(data.user.displayName);
                }
            })
            .catch(error => console.error('Error:', error));
        defaultFilters();
        loadUserGames();
    }, []);

    const [results, setResults] = useState(games);
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All' });
    const [userGames, setUserGames] = useState([]);

    const loadUserGames = () => {
        const storedGames = JSON.parse(localStorage.getItem('userGames'));
        if (storedGames) {
            setUserGames(storedGames);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        localStorage.setItem('userGames', JSON.stringify(userGames));
    }, [userGames]);

    const updateFilters = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'query') {
            value = value.toLowerCase();
        }

        const updatedFilters = { ...filters, [name]: value };

        handleOptionChange(e, updatedFilters);
        setFilters(updatedFilters);
    };

    const defaultFilters = () => {
        const updatedFilters = { ...filters, query: '' };
        setFilters(updatedFilters);

        const defaultGames = games.slice(0, 5);
        setResults(defaultGames);
    }

    const handleOptionChange = (e, filters) => {
        e.preventDefault();

        const filteredGames = games.filter(game => {
            if (filters.genre === 'All') {
                return game[filters.field].toLowerCase().includes(filters.query);
            } else {
                return (
                    game[filters.field].toLowerCase().includes(filters.query) &&
                    game.primary_genre.includes(filters.genre)
                );
            }
        }).slice(0, 5);

        setResults(filteredGames);
    };

    const handleAddGame = (game) => {
        setUserGames([...userGames, game]);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <NavBar />
            <Toolbar />
            <div className="ListPage">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h2 className='ListHeader'>{user}'s Explorer</h2>
            <div className="SearchPage">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    {sidebarOpen ? '<' : '>'}
                </button>
                <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <GenreFilters updateFilters={updateFilters} />
                </div>
                <Search
                    results={results}
                    setResults={setResults}
                    filters={filters}
                    setFilters={setFilters}
                    filterFields={filterFields}
                    updateFilters={updateFilters}
                    handleAddGame={handleAddGame}
                    addedGames={userGames}
                />
                <UserGameList userGames={userGames} setUserGames={setUserGames} username={user} />
            </div>
                    </>
                )}
            </div>
        </>
    );
}