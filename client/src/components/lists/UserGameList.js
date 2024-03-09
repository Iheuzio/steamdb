import React, { useEffect } from 'react';

const UserGameList = ({ userGames, setUserGames, username }) => {
  useEffect(() => {
    // Load user games from local storage on component mount
    const storedGames = JSON.parse(localStorage.getItem('userGames'));
    if (storedGames) {
      setUserGames(storedGames);
    }
  }, []);

  useEffect(() => {
    // Save user games to local storage whenever userGames changes
    localStorage.setItem('userGames', JSON.stringify(userGames));
  }, [userGames]);

  const deleteGame = (index) => {
    const newGames = [...userGames];
    newGames.splice(index, 1);
    setUserGames(newGames);
  };

  return (
    <div>
      <h2>{username}'s Game List</h2>
      {userGames.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <ul>
          {userGames.map((game, index) => (
            <li key={index}>
              {game.game}
              <button onClick={() => deleteGame(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setUserGames([])}>Clear List</button>
      <button onClick={() => console.log('saved list')}>Save List</button>
    </div>
  );
};

export default UserGameList;