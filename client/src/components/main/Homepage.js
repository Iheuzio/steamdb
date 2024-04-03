import './Homepage.css';
import Scroller from './HorizontalScroller';
import TopGameList from './TopGamesList';
import RandomGameList from './RandomGamesList';
import NavBar from '../navigation/NavBar';

import { useState, useEffect } from 'react';

export default function Homepage() {
  const [setRandomGames, setResults] = useState([])
  const [setTopFifty, setTopGames] = useState([])

  useEffect(() => {

    async function fetchRandomFifty() {
      try {
        const response = await fetch('/localapi/randomFifty');
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
    fetchRandomFifty()
  }, [])

  useEffect(() => {
    async function fetchTopFifty() {
      try {
        const response = await fetch('/localapi/topFifty');
        if (response.ok) {
          const topGames = await response.json();
          setTopGames(topGames)
        } else {
          console.log("Error")
        }
      } catch (error) {
        console.log('There was an error', error);
      }
    }
    fetchTopFifty();
  }, [])

  return <div className="Home" >
    <NavBar />
    <Scroller results={setTopFifty} />
    <TopGameList results={setTopFifty} />
    <RandomGameList results={setRandomGames} />
  </div>
}
