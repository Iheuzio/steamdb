import { useState, useEffect } from 'react';


//Accepts a prop for the gameLink and fetches the header image from the steamapi
//returns an image tag
function GameHeader({gameURL, title, shortDesc}){

    const[headerURL, setHeaderURL] = useState('');

    useEffect(() => {

        async function fetchGameHeader(){
            try{
                const response = await fetch(`steamapi/${gameURL}`);
                if(response.ok){
                    const header = await response.json();
                    setHeaderURL(header[gameURL]['data']['header_image']);
                  }else {
                    alert('Error: Problem fetching header image from steam api');
                  }
                } catch(error){
                  alert(error); //TODO: If not image found -- set to default static image
                }
        }
        fetchGameHeader();
    }, [gameURL]);

    return (
        <>
            <img id='header-image' src={headerURL} alt='game header image' />
            <h1>{title}</h1>
            <p>{shortDesc}</p>
        </>
        
    )

}

function GameScore({peak, positiveReviews, negativeReviews}){

    let reviewClass = '';
    let averageScore = (Number(positiveReviews) / (Number(positiveReviews) + Number(negativeReviews)) * 100);
    averageScore = averageScore.toFixed(2);
    if(averageScore < 35) {reviewClass = 'neg-reviews'} else 
    if(averageScore > 35 && averageScore < 70) {reviewClass = 'mid-reviews'} else
    {reviewClass = 'pos-reviews'};

    return (
        <>
            <h2>Reviews</h2>
            <p>Positive: {positiveReviews}</p>
            <p>Negative: {negativeReviews}</p>
            <p className={reviewClass}> {averageScore}% </p>
            <p>Peak Players: {peak}</p>
        </>
    )

}

function GameDetailedInfo({publisher, genre, releaseDate}){
    return (
        <>
            <h2>More Info</h2>
            <ul id='game-details-ul'>
                <li>Release Date: {releaseDate}</li>
                <li>Publisher: {publisher}</li>
                <li>Genre: {genre}</li>
            </ul>
        </>
    )
}

export {
    GameHeader,
    GameDetailedInfo,
    GameScore
}