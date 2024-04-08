// SearchPage.js
import './SearchPage.css';
import './ListPage.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';
import Toolbar from '../navigation/ToolBar';
import UserGameList from './UserGameList';
import { fetchUserGameList  } from './apiFunctions';

export default function ListsPage() {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [results, setResults] = useState(games);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/account');
                if (response.status === 401) {
                    window.location.href = '/auth/steam';
                } else {
                    const data = await response.json();
                    if (data) {
                        setUser(data.user.displayName);
                        setUserID(data.user.id);
                    }
                }
                const gameResponse = await fetch('/localapi/steamgames');
                const gameData = await gameResponse.json();
                if (gameData) {
                    setGames(gameData);
                    setResults(gameData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            defaultFilters();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userID) {
            loadUserGames();
        }
    }, [userID]);

const filterFields = ['title', 'publisher', 'developer'];
const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All' });
const [userGames, setUserGames] = useState([]);

const loadUserGames = async () => {
    try {
        const userGameList = await fetchUserGameList(userID);
        if (userGameList) {
            setUserGames(userGameList.games);
        } else {
            setUserGames([]);
        }
    } catch (e) {
        console.error(e)
        const storedGames = JSON.parse(localStorage.getItem('userGames'));
        if (storedGames) {
            setUserGames(storedGames);
        }
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
    }

    const handleOptionChange = (e, filters) => {
        e.preventDefault();

        const filteredGames = games.filter(game => {
            const gameField = game[filters.field];
            if (gameField) {
                if (filters.genre === 'All') {
                    return gameField.toLowerCase().includes(filters.query);
                } else {
                    return (
                        gameField.toLowerCase().includes(filters.query) &&
                        game.primary_genre.includes(filters.genre)
                    );
                }
            }
            return false;
        })

        setResults(filteredGames);
    };

    const handleAddGame = (game) => {
        setUserGames([...userGames, game]);
    };

    const handleDeleteGame = (gameId) => {
        const newGames = userGames.filter((game) => game._id !== gameId);
        setUserGames(newGames);
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
                <UserGameList userGames={userGames} handleDeleteGame={handleDeleteGame} username={user} userID={userID} setUserGames={setUserGames} />
            </div>
                    </>
                )}
            </div>
        </>
    );
}