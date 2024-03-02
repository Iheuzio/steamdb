import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../navigation/NavBar';

export default function GameDetails() {

    const location = useLocation();
    const gameURL = new URLSearchParams(location.search).get('game');

    const[game, setGame] = useState({});

    useEffect(() => {

        async function fetchGameDetails(){
            try{
                const response = await fetch(`/localapi/steamgames/${gameURL}`);
                if(response.ok){
                    const gameDetails = await response.json();
                    setGame(gameDetails);
                  }else {
                    alert('Error: Problem fetching game info from API');
                  }
                } catch(error){
                  alert(error);
                }
        }

        fetchGameDetails();
    }, [gameURL]);

    console.log(game);

    return (
        <>
        <NavBar />
        <h1> Something here: {gameURL}</h1>
        <p>{game.title}</p>
        </>
    );
};