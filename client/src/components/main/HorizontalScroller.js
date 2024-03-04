import './HorizontalScroller.css';
import { useState, useEffect } from 'react'


export default function HorizontalScroller() {
    return <div>
        <h1 class="mt-12 mb-4 font-semibold  text-xl">Horizontal Silder</h1>
        <div class="slider">
        <div class="slide-track2">
            <img class="slide bg-red-500" src="https://clan.akamai.steamstatic.com/images/41316928/f7f5587c77587cc8ae5eb50e39defcbcc3acaa88.jpg"/>
            <img class="slide bg-purple-500"/>
            <img class="slide bg-blue-500"/>
            <img class="slide bg-green-500"/>
            <img class="slide bg-pink-500"/>
            <img class="slide bg-red-500"/>
            <img class="slide bg-purple-500"/>
            <img class="slide bg-blue-500"/>
            <img class="slide bg-green-500"/>
            <img class="slide bg-pink-500"/>
            <img class="slide bg-red-500"/>
            <img class="slide bg-purple-500"/>
            <img class="slide bg-blue-500"/>
            <img class="slide bg-green-500"/>
            <img class="slide bg-pink-500"/>
            
        </div>
        </div>
    </div>
}

// export default function Scroller() {
  

//   const [games, setGames] = useState([])

//   useEffect(() => {
//       async function fetchGames() {
//           try {
//               const response = await fetch('/apiv2/steamgames');
//               if (response.ok) {
//                   const games = await response.json();
//                   setGames(games)
//               } else {
//                   console.log("Error")
//               }
//           } catch (error) {
//               console.log('There was an error', error);
//           }
//       }
//       fetchGames()
//   }, [])

//   const gameList = games.map(game =>
//       <li key={game.title}>Game: {game.title}</li>
//   );

 


//   return <div className="Scroller" >
//     <h2>Scroller</h2>    
//     <ul>
//           {gameList}
//       </ul>
//   </div>
// }
