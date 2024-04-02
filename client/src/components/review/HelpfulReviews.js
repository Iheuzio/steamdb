import { useState, useEffect } from 'react';

import './Review.css'

//Fetches and displays the most helpful reviews for a given 
//game based on score
function TopReviews({gameID}) {

    const [topReviews, setTopReviews] = useState([]);

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
        fetchGameReviews();
    }, []);

    if(topReviews.length === 0) {
        return(
            <section id='reviews-section'>
                <h2>No Reviews Yet!</h2>
            </section>
        )
    }

    const listReviews = topReviews.map((review, index) =>
        <Review review={review} index={index}/>
    )

    return(
        <section id='reviews-section'>
            <h2> Top Rated Reviews</h2>
            <div id='top-reviews'>
                {listReviews}
            </div>
        </section>
    )

}

//Returns the html for a single review
function Review({review, index}){

    const handleUpvote = async () =>{
        console.log(review);
        let accountID = '';
        let _idString = review._id.toString()
        //check if a user is signed in -- if no, prompt them to sign in to use the feature
        try{
            let response = await fetch(`/account`);
            if(response.ok){
                const accountDetails = await response.json();
                accountID = accountDetails.user.id;
              }else {
                alert('Please Sign in to use the review feature!')
                return;
            }

            response = await fetch('/localapi/reviews/addVote', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    objID: _idString,
                    reviewer: accountID
                })
              });
          
              if (!response.ok) {
                alert('Error adding Upvote');
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
            <div class="vote-section">
                <span class="vote" onClick={handleUpvote}>
                    <svg width="50" height="30">
                        <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" fill="currentColor"></path>
                    </svg>
                </span>
                <p class="review-rating">{review.score}</p>
            </div>
        </div>
        <div class="review-content">
            <p>{review.content}</p>
        </div>
        </div>
    )

}

export {
    TopReviews
}