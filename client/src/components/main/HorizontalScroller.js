import './HorizontalScroller.css';
import { useState, useEffect } from 'react'


export default function Scroller() {
  

  const [games, setGames] = useState([])

  useEffect(() => {
      async function fetchGames() {
          try {
              const response = await fetch('/apiv2/steamgames');
              if (response.ok) {
                  const games = await response.json();
                  setGames(games)
              } else {
                  console.log("Error")
              }
          } catch (error) {
              console.log('There was an error', error);
          }
      }
      fetchGames()
  }, [])

  const gameList = games.map(game =>
      <li key={game.title}>Game: {game.title}</li>
  );

 


  return <div className="Scroller" >
    <h2>Scroller</h2>    
    <ul>
          {gameList}
      </ul>
  </div>
}
