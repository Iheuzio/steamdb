import './SearchPage.css';
import { games } from '../games';
import { useEffect, useState } from 'react';
import Search from './Search';
import GenreFilters from './GenreFilters';
import NavBar from '../navigation/NavBar';
import Toolbar from '../navigation/ToolBar';
import UserGameList from './UserGameList';

export default function SearchPage() {
    // fetch user first to see if they are logged in:
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetch('/account')
            .then(res => res.json())
            .then(user => setUser(user));
    }, []);

    const [results, setResults] = useState(games);
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: '', genre: 'All' });
    const [userGames, setUserGames] = useState([]); // Store user's games

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
        setUserGames([...userGames, game]); // Add the selected game to the user's list
    };

    return (
      <>
          <NavBar />
          <Toolbar />
          <div className="SearchPage">
              <Search
                  results={results}
                  setResults={setResults}
                  filters={filters}
                  setFilters={setFilters}
                  filterFields={filterFields}
                  updateFilters={updateFilters}
                  handleAddGame={handleAddGame}
              />
              <GenreFilters updateFilters={updateFilters} />
              <UserGameList userGames={userGames} setUserGames={setUserGames} userName={user}/> 
          </div>
      </>
  );
}