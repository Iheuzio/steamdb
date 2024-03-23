import { useState, useEffect } from 'react';

//Returns a html form allowing the user to make a POST request to the 
//backend server with a review for the current game
function WriteReview({game}) {

    //sets the values to be sent to the backend for saving from the form
    const [recommendation, setRecommendation] = useState(true);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleRecommendationChange = (event) => {
        if(event.target.value === 'yes') { setRecommendation(true); }
        else {setRecommendation(false); }
    };

    const handleReviewTitleChange = (event) => {
        setReviewTitle(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let accountID = '';
        let accountIMG = '';

        //check if a user is signed in -- if no, prompt them to sign in to use the feature
        try{
            let response = await fetch(`/account`);
            if(response.ok){
                const accountDetails = await response.json();
                accountID = accountDetails.user.id;
                accountIMG = accountDetails.user.photos[1];
                console.log(accountIMG);
              }else {
                alert('Please Sign in to use the review feature!')
                return;
              }

            response = await fetch('/localapi/reviews/addReview', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: reviewTitle,
                    content: reviewText,
                    score: 0,
                    reviewer: accountID,
                    reviewer_img: accountIMG.value,
                    recommend: recommendation,
                    game: game
                })
              });
          
              if (!response.ok) {
                alert('Error creating review');
              }
              else{
                alert('Review Added!');
              }
            
            } catch(error){
              alert(error);
        }

        console.log("Recommendation:", recommendation);
        console.log("Title:", reviewTitle);
        console.log("Review:", reviewText);


    };

    return (
        <div id='write-review-form'>
            <h3>Tell Us What You Thought!</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Do you recommend this game?
                    </label><br />
                    <input type="radio" id="yes" name="recommendation" value="yes" checked={recommendation === true} onChange={handleRecommendationChange} />
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" id="no" name="recommendation" value="no" checked={recommendation === false} onChange={handleRecommendationChange} />
                    <label htmlFor="no">No</label>
                </div>
                <br />
                <div>
                    <label htmlFor="review_title">Title:</label><br />
                    <input type="text" id="review_title" name="review_title" value={reviewTitle} onChange={handleReviewTitleChange} required />
                </div>
                <br />
                <div>
                    <label htmlFor="review_text">Review:</label><br />
                    <textarea id="review_text" name="review_text" value={reviewText} onChange={handleReviewTextChange} rows="4" cols="50" required></textarea>
                </div>
                <br />
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export {
    WriteReview
}