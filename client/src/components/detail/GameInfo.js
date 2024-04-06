import { useState, useEffect } from 'react';
import noHeader from '../../static-images/no-header.png'
import { useTranslation } from 'react-i18next';

//Accepts a prop for the gameLink and fetches the header image from the steamapi
//returns an image tag
function GameHeader({gameURL, title, shortDesc}){

    const {t} = useTranslation();

    const[headerURL, setHeaderURL] = useState('');

    useEffect(() => {

        async function fetchGameHeader(){
            try{
                const response = await fetch(`steamapi/${gameURL}`);
                if(response.ok){
                    const header = await response.json();
                    try{
                        setHeaderURL(header[gameURL]['data']['header_image']);
                    }
                    catch{
                        setHeaderURL(noHeader);
                    }
                  }else {
                    alert('Error: Problem fetching header image from steam api');
                  }
                } catch(error){
                  alert(error);
                }
        }
        fetchGameHeader();
    }, [gameURL]);

    return (
        <>
            <img id='header-image' src={headerURL} alt='game header' />
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