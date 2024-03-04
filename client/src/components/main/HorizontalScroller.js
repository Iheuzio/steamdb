import './HorizontalScroller.css';

export default function HorizontalScroller() {
    
    return <div>
        <h1 class="mt-12 mb-4 font-semibold  text-xl">Horizontal Game Slider</h1>
        <div class="slider">
        <div class="slide-track2">
            { Array.from({ length: 20 }, (_, index) => <ImageSet key={index} />) }
        </div>
        </div>
    </div>
}

function ImageSet() {
    return <>
        <img class="slide bg-red-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg?t=1707955699"/>
        <img class="slide bg-purple-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1698860631"/>
        <img class="slide bg-blue-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg?t=1705604554"/>
        <img class="slide bg-green-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/899770/header.jpg?t=1709060046"/>
        <img class="slide bg-pink-500" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_sm_120.jpg?t=1709086268"/>
    </>
}

// function TempScroller() {
  

//   const [games, setGames] = useState([])

//   useEffect(() => {
//       async function fetchGames() {
//           try {
//               const response = await fetch('/localapi/steamgames');
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
//   console.log(games);
//   const gameList = games.map(game =>
//       <li key={game.title}>Game: {game.title}</li>
//   );
// }
 


//   return <div className="Scroller" >
//     <h2>Scroller</h2>    
//     <ul>
//           {gameList}
//       </ul>
//   </div>
// }
