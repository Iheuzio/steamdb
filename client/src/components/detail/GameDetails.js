import { useLocation } from 'react-router-dom';
import { useState, useEffect} from 'react';

import './GameDetails.css'

import NavBar from '../navigation/NavBar';
import { GameHeader, GameScore, GameDetailedInfo } from './GameInfo';

import { ReviewForm } from '../review/ReviewForm';
import { TopReviews } from '../review/HelpfulReviews';

export default function GameDetails() {

    const location = useLocation();
    const gameURL = new URLSearchParams(location.search).get('game');

    const[game, setGame] = useState({});
    const[description, setDescription] = useState('');
    const [isBusy, setBusy] = useState(true);
    const [lang, setLang] =  useState(localStorage.getItem('i18nextLng'));

    console.log(lang);

    const handleLang = (language) => {
        setLang(language);
    }
    
    useEffect(() => {
        async function fetchGameDetails(){
            try{
                const response = await fetch(`/localapi/steamgames/${gameURL}`);
                if(response.ok){
                    const gameDetails = await response.json();
                    setGame(gameDetails);
                    setDescription(gameDetails.description);
                    setBusy(false);
                  }else {
                    setGame({});
                    setBusy(false);
                  }
                } catch(error){
                  alert(error);
                }
        }
        fetchGameDetails();
    }, [gameURL]);

    //this useEffect translates the short Description value in the game 
    //to the current stored language value in currentLang
    useEffect(() => {
        function translateDescription(){
            console.log(lang);
        }
        translateDescription();
    }, [lang]);

    //Check if API is done fetching -- only render when its done
    if(isBusy) { return <NavBar />}

    if(Object.keys(game).length === 0){
        return (
        <>
            <NavBar />
            <h1>Nothing seems to be here...blame the lack of seeding</h1>
        </>
        )
    }

    return (
        <>
            <NavBar setLang={handleLang}/>
            <div id='detail-content'>
                <div id='game-details'>
                    <section id='left-details'>
                        <GameHeader id='game-header' gameURL={gameURL} title={game.title} shortDesc={description} />
                    </section>
                    <section id='right-details'>
                        <GameDetailedInfo id='game-detailed-info' publisher={game.publisher}
                        genre={game.primary_genre}
                        releaseDate={game.release_date} />
                        <GameScore peak={game.peak}
                        positiveReviews={game.positive_reviews}
                        negativeReviews={game.negative_reviews} />
                    </section>
                </div>
                <br/>
                <hr class="rounded"></hr>
                <section id='game-review-section'>
                    <ReviewForm game={gameURL} />
                    <TopReviews gameID={gameURL} />
                </section>
            </div>
        </>
    );
};