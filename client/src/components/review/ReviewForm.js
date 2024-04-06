import { useState } from 'react';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';


//Returns a html form allowing the user to make a POST request to the 
//backend server with a review for the current game
function ReviewForm({game}) {

    const {t} = useTranslation();

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
        let accountName = '';

        //check if a user is signed in -- if no, prompt them to sign in to use the feature
        try{
            let response = await fetch(`/account`);
            if(response.ok){
                const accountDetails = await response.json();
                accountID = accountDetails.user.id;
                accountName = accountDetails.user.displayName;
                accountIMG = accountDetails.user.photos[1];
                console.log(accountIMG);
              }else {
                toast.warn(t("alerts.sign-in"), {
                    position: "top-center"
                });
                return;
              }

            response = await fetch('/localapi/reviews', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: reviewTitle,
                    content: reviewText,
                    score: 0,
                    reviewerID: accountID,
                    reviewerName: accountName,
                    reviewer_img: accountIMG.value,
                    recommend: recommendation,
                    game: game
                })
              });
          
              if (!response.ok) {
                toast.error(t("alerts.review-error"), {
                    position: "top-center"
                });
                return;
              }
              else{
                toast.success(t("alerts.review-added"), {
                    position: "top-center"
                });
                return;
              }
            
            } catch(error){
              alert(error);
        }
    };

    return (
        <div id='write-review-form'>
            <h3>{t("add-review.title")}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        {t("add-review.rec")}
                    </label><br />
                    <input type="radio" id="yes" name="recommendation" value="yes" checked={recommendation === true} onChange={handleRecommendationChange} />
                    <label htmlFor="yes">{t("add-review.yes")}</label>
                    <input type="radio" id="no" name="recommendation" value="no" checked={recommendation === false} onChange={handleRecommendationChange} />
                    <label htmlFor="no">{t("add-review.no")}</label>
                </div>
                <br />
                <div>
                    <label htmlFor="review_title">{t("add-review.title-form")}</label><br />
                    <input type="text" id="review_title" name="review_title" value={reviewTitle} onChange={handleReviewTitleChange} required />
                </div>
                <br />
                <div>
                    <label htmlFor="review_text">{t("add-review.review")}</label><br />
                    <textarea id="review_text" name="review_text" value={reviewText} onChange={handleReviewTextChange} rows="4" cols="50" required></textarea>
                </div>
                <br />
                <div>
                    <input type="submit" value={t("add-review.submit")} />
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export {
    ReviewForm
}