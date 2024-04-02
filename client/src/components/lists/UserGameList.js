import './UserGameList.css';
import { saveUserGameList } from './apiFunctions';

const UserGameList = ({ userGames, setUserGames, username, userID }) => {
  const deleteGame = (gameId) => {
    const newGames = userGames.games.filter((game) => game._id !== gameId);
    setUserGames({ ...userGames, games: newGames });
  };

  const saveList = async () => {
    try {
      console.log(`${userID} : ${JSON.stringify(userGames.games)}`);
      const savedList = await saveUserGameList(userID, userGames.games);
      if (savedList) {
        console.log('List saved successfully');
      } else {
        console.error('Error saving list');
      }
    } catch (e) {
      console.error('Error saving list:', e);
    }
  };

  return (
    <div className="UserGameList">
      <h2>{username}'s Game List</h2>
      {userGames.games.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <ul>
          {userGames.games.map((game) => (
            <li key={game._id}>
              {game.title}
              <button onClick={() => deleteGame(game._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div className='ListButtons'>
        <button onClick={() => setUserGames({ ...userGames, games: [] })}>Clear List</button>
        <button onClick={() => saveList()}>Save List</button>
      </div>
    </div>
  );
};

export default UserGameList;