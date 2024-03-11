import './Homepage.css';
import Scroller from './HorizontalScroller'; 
import TopGameList from './TopGamesList';
import RandomGameList from './RandomGamesList';

import NavBar from '../navigation/NavBar';

import { useState } from 'react'; 



import { games } from '../games';

export default function Homepage() {
  //const [results, setResults] = useState([])
  const [games1, setResults] = useState(games)
  

  
  return <div className="Home" >
    <NavBar />
    <Scroller />
    <TopGameList results={games1}/>
    <RandomGameList results={games1}/>
  </div>
}
