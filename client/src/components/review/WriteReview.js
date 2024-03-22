import { useState, useEffect } from 'react';


//Returns a html form allowing the user to make a POST request to the 
//backend server with a review for the current game
function WriteReview() {

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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
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