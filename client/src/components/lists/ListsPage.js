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
                    setUserID(data.user.id);
                }
            })
            .then(() => {
                // fetch from /localapi/steamgames for the games to populate the list of games
                fetch('/localapi/steamgames')
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            setGames(data);
                            setResults(data);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
        defaultFilters();
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
            console.log(userGameList);
            setUserGames(userGameList.games);
        } else {
            setUserGames([]);
        }
    } catch (e) {
        console.log(e)
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

        const defaultGames = games.slice(0, 5);
        setResults(defaultGames);
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
        }).slice(0, 5);

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