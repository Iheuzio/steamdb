import './Homepage.css';
import Scroller from './HorizontalScroller'; 

import NavBar from '../navigation/NavBar';

export default function Homepage() {
  
  return <div className="Home" >
    <NavBar />
    <Scroller />
  </div>
}
