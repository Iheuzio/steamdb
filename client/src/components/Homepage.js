import './Homepage.css';
import Scroller from './HorizontalScroller';  
import Graph from './GameGraph';
import GameReview from './GameReview';



export default function Homepage() {
  




  return <div className="Home" >
    <Scroller />
    
    <Graph />
    <GameReview />
  </div>
}
