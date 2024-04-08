import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

//Accepts a prop for the imageURL, title, and shortDescription and returns them formatted

function GameHeader({imageURL, title, engDesc, lang}){

    const [shortDesc, setShortDesc] = useState(engDesc);

    //this useEffect translates the short Description value in the game 
    //to the current stored language value in Lang using the swift-translate
    //link: https://rapidapi.com/myl117/api/swift-translate
    useEffect(() => {

        //check if lang is en, if so, don't run the translation and
        // just serve the engslish translation
        if(lang === 'en') {
            setShortDesc(engDesc);
            return;
        }

        async function translateDescription(){
            const options = {
            method: 'POST',
            url: 'https://swift-translate.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'd07db34971msh5890022cd98e8fep17f8e3jsnb9517efc6725',
                'X-RapidAPI-Host': 'swift-translate.p.rapidapi.com'
            },
            data: {
                text: engDesc,
                sourceLang: 'en',
                targetLang: lang
            }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data.translatedText);
                setShortDesc(response.data.translatedText);
            } catch (error) {
                console.error(error);
            }
        }
        translateDescription();
    }, [engDesc, lang]);

    return (
        <>
            <img id='header-image' src={imageURL} alt='game header' />
            <h1>{title}</h1>
            <p>{shortDesc}</p>
        </>
        
    )

}

function GameScore({peak, positiveReviews, negativeReviews}){

    const {t} = useTranslation();

    let reviewClass = '';
    let averageScore = (Number(positiveReviews) / (Number(positiveReviews) + Number(negativeReviews)) * 100);
    averageScore = averageScore.toFixed(2);
    if(averageScore < 35) {reviewClass = 'neg-reviews'} else 
    if(averageScore > 35 && averageScore < 70) {reviewClass = 'mid-reviews'} else
    {reviewClass = 'pos-reviews'};

    return (
        <div id='info-reviews'>
            <h2>{t("detail.reviews")}</h2>
            <div id='game-stats'>
                <div>
                    <p className={reviewClass}> {averageScore}% </p>
                    <p className='greenText'>{positiveReviews}</p>
                    <p className='redText'>{negativeReviews}</p>
                    
                </div>
                <div>
                    <p>{t("detail.peak-players")} {peak}</p>
                </div>
            </div>
        </div>
    )

}

function GameDetailedInfo({publisher, genre, releaseDate}){

    const {t} = useTranslation();

    releaseDate = releaseDate.substring(0,10);

    return (
        <div id='more-info'>
            <h2>{t("detail.more-info")}</h2>
            <ul id='game-details-ul'>
                <li>{t("detail.release-date")} {releaseDate}</li>
                <li>{t("detail.publisher")} {publisher}</li>
                <li>{t("detail.genre")} {genre}</li>
            </ul>
        </div>
    )
}

export {
    GameHeader,
    GameDetailedInfo,
    GameScore
}