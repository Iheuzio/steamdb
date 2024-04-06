import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Review.css'

//Fetches and displays the most helpful reviews for a given 
//game based on score
function TopReviews({gameID}) {

    const {t} = useTranslation();
    
    const [topReviews, setTopReviews] = useState([]);
    const [accountID, setAccountID] = useState('');

    useEffect(() => {
        async function fetchGameReviews(){
            try{
                const response = await fetch(`/localapi/reviews/${gameID}`);
                if(response.ok){
                    const gameReviews = await response.json();
                    setTopReviews(gameReviews);
                  }
                  else{
                    setTopReviews([]);
                  }
                } catch(error){
                  alert(error);
                }
        }
        
        async function signIn(){
            let accountResponse = await checkSignIn();
            setAccountID(accountResponse);
        }
        fetchGameReviews();
        signIn();
        
    }, [gameID]);

    if(topReviews.length === 0) {
        return(
            <section id='reviews-section'>
                <h2>{t("reviews.no-reviews")}</h2>
            </section>
        )
    }

    const listReviews = topReviews.map((review, index) =>
        <Review review={review} index={index} accountID={accountID}/>
    )

    return(
        <section id='reviews-section'>
            <h2>{t("reviews.top-rated")}</h2>
            <div id='top-reviews'>
                {listReviews}
            </div>
        </section>
    )

}

//Returns the html for a single review
function Review({review, index, accountID}){

    const {t} = useTranslation();

    const [upVoteColor, setUpvoteColor] = useState('currentColor');
    const [voteScore, setVoteScore] = useState(review.score);
    const _idString = review._id.toString();

    //on inital render, check if the user has upvoted this post
    useEffect(() => {
        async function setVoted(){
        if(accountID === '') { return; }
            let voted = await checkVote(_idString, accountID);
            if (voted){
                setUpvoteColor('orange');
            }else{
                setUpvoteColor('currentColor');
            }
        }
        setVoted();
    }, []);

    const handleUpvote = async () =>{
        //check if a user is signed in -- if no, prompt them to sign in to use the feature
        try{
            if (accountID === ''){
                alert(t("alerts.sign-in"));
                return;
            }
            let voted = await checkVote(_idString, accountID);
            if (voted){
                setUpvoteColor('currentColor');
                setVoteScore(voteScore - 1);
            }else{
                setUpvoteColor('orange');
                setVoteScore(voteScore + 1);
            }
            let response = await fetch('/localapi/reviews/changeVote', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    objID: _idString,
                    reviewer: accountID,
                    vote: voted
                })
              });
          
              if (!response.ok) {
                alert(t("alerts.upvote-error"));
              }
            } catch (error) {
                alert(error);
            }
    }

    return(
        <div class="review-box">
        <div class="review-header">
            <img class='review-pfp' src={review.reviewer_img} alt='Review PFP' />
            <div class="user-info">
                <h3 class="username">{review.reviewerName}</h3>
                <div class="review-date">{review.title}</div>
            </div>
            <div class='recommended-info'>
                {review.recommend ? <p className='recommended'> Recommended! </p> : <p className='not-recommended'> Not Recommended</p>}
            </div>
            <div class="vote-section">
                <span class="vote" onClick={handleUpvote}>
                    <svg width="50" height="30">
                        <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" fill={upVoteColor}></path>
                    </svg>
                </span>
                <p class="review-rating">{voteScore}</p>
            </div>
        </div>
        <div class="review-content">
            <p>{review.content}</p>
        </div>
        </div>
    )

}

//Runs the fetch to the DB to see if user has already upvoted a post
//returns true or false
async function checkVote(objID, reviewerID){
    try{
        const response = await fetch(`localapi/reviews/checkVote/${reviewerID}?objID=${objID}`);
        if(response.ok){
            const data = await response.json();
            return data;
          }else {
            alert('Error: Problem checking if user has upvoted this post');
          }
        } catch(error){
          alert(error);
        }
}

async function checkSignIn(){
    let response = await fetch(`/account`);
    if(response.ok){
        const accountDetails = await response.json();
        return accountDetails.user.id;
    }
    return '';    
}

export {
    TopReviews
}