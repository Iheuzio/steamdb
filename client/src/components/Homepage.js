import './Homepage.css';
import Scroller from './HorizontalScroller';  
import Graph from './GameGraph';
import GameReview from './GameReview';

//import { useState } from 'react';

export default function Homepage() {
  //const [inputs, setInputs] = useState({});




  return <div className="Home" >
    <Scroller />
    
    <Graph />
    <GameReview />
  </div>
}
