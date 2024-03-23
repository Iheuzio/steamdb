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

    return(
        <div class="review-box">
        <div class="review-header">
            <img class='review-pfp' src={review.reviewer_img} alt='Review PFP' />
            <div class="user-info">
                <h3 class="username">{review.reviewerName}</h3>
                <div class="review-date">{review.title}</div>
            </div>
            <p class="review-rating">{review.score}</p>
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