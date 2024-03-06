import './Homepage.css';
import Scroller from './HorizontalScroller'; 
import TopGameList from './TopGamesList';
import RandomGameList from './RandomGamesList';

import NavBar from '../navigation/NavBar';

import { useState, useEffect } from 'react'; 

export default function Homepage() {
  const [results, setResults] = useState({});
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
      async function fetchGameDetails(){
          try{
              const response = await fetch(`/localapi/steamgames/`);
              if(response.ok){
                  const gameDetails = await response.json();
                  setResults(gameDetails);
                  setBusy(false);
                }else {
                  setResults({});
                  setBusy(false);
                }
              } catch(error){
                alert(error);
              }
      }

      fetchGameDetails();
  });

  
  return <div className="Home" >
    <NavBar />
    <Scroller />
    <TopGameList results={results}
                setResults={setResults}/>
    <RandomGameList />
  </div>
}
