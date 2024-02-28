import './Homepage.css';
import Scroller from './HorizontalScroller';  
import Graph from '../game_details/GameGraph';
import GameReview from '../game_details/GameReview';



export default function Homepage() {
  




  return <div className="Home" >
    <Scroller />
    
    <Graph />
    <GameReview />
  </div>
}
