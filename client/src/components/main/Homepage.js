import './Homepage.css';
import Scroller from './HorizontalScroller'; 
import TopGameList from './TopGamesList';
import RandomGameList from './RandomGamesList';

import NavBar from '../navigation/NavBar';

import { useState } from 'react'; 

export default function Homepage() {
  const [setAllGames, setResults] = useState([])
  
  async function fetchGames() {
    try {
      const response = await fetch('/localapi/steamgames');
      if (response.ok) {
        const games = await response.json();
        setResults(games)
      } else {
        console.log("Error")
      }
    } catch (error) {
      console.log('There was an error', error);
    }
  }

  fetchGames();
  
  return <div className="Home" >
    <NavBar />
    <Scroller results={setAllGames} />
    <TopGameList results={setAllGames}/>
    <RandomGameList results={setAllGames}/>
  </div>
}
