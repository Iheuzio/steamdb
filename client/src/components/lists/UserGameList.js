import './UserGameList.css';
import { saveUserGameList } from './apiFunctions';

const UserGameList = ({ userGames, setUserGames, username, userID }) => {

  const deleteGame = (index) => {
    const newGames = [...userGames];
    newGames.splice(index, 1);
    setUserGames(newGames);
  };

  const saveList = async () => {
    try {
      console.log(`${userID} : ${userGames}`)
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
          {userGames.map((game, index) => (
            <li key={index}>
              {game.game}
              <button onClick={() => deleteGame(index)}>Delete</button>
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