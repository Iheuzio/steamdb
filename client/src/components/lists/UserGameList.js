import './UserGameList.css';

const UserGameList = ({ userGames, setUserGames, username }) => {

  const deleteGame = (index) => {
    const newGames = [...userGames];
    newGames.splice(index, 1);
    setUserGames(newGames);
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
        <button onClick={() => console.log('saved list')}>Save List</button>
      </div>
    </div>
  );
};

export default UserGameList;