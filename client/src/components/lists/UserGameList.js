import './UserGameList.css';
import { saveUserGameList } from './apiFunctions';

const UserGameList = ({ userGames, handleDeleteGame, username, userID, setUserGames }) => {
  console.log(userGames)
  const saveList = async () => {
    try {
      console.log(`${userID} : ${JSON.stringify(userGames)}`);
      const savedList = await saveUserGameList(userID, userGames);
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
      {userGames.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <ul>
          {Array.isArray(userGames) && (userGames[0]?.title ? userGames : userGames.slice(1)).map((game) => (
            <li key={game._id}>
              {game.title}
              {game.title && <button onClick={() => handleDeleteGame(game._id)}>Delete</button>}
            </li>
          ))}
        </ul>
      )}
      <div className='ListButtons'>
        <button onClick={() => setUserGames([])}>Clear List</button>
        <button onClick={() => saveList()}>Save List</button>
      </div>
    </div>
  );
};

export default UserGameList;