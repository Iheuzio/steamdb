import { useState, useEffect } from 'react';
import noHeader from '../../static-images/no-header.png'

//Accepts a prop for the imageURL, title, and shortDescription and returns them formatted

function GameHeader({imageURL, title, shortDesc}){

    return (
        <>
            <img id='header-image' src={imageURL} alt='game header' />
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
        <div id='info-reviews'>
            <h2>Reviews</h2>
            <div id='game-stats'>
                <div>
                    <p className={reviewClass}> {averageScore}% </p>
                    <p className='greenText'>{positiveReviews}</p>
                    <p className='redText'>{negativeReviews}</p>
                    
                </div>
                <div>
                    <p>Peak Players: {peak}</p>
                </div>
            </div>
        </div>
    )

}

function GameDetailedInfo({publisher, genre, releaseDate}){

    releaseDate = releaseDate.substring(0,10);

    return (
        <div id='more-info'>
            <h2>More Info</h2>
            <ul id='game-details-ul'>
                <li>Release Date: {releaseDate}</li>
                <li>Publisher: {publisher}</li>
                <li>Genre: {genre}</li>
            </ul>
        </div>
    )
}

export {
    GameHeader,
    GameDetailedInfo,
    GameScore
}