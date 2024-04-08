import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Recaptcha.css';

function Recaptcha() {
  const [recaptchaResponse, setRecaptchaResponse] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log('Recaptcha component loaded');
    if (window.grecaptcha) {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute('6Lf5tLMpAAAAACI_XveGezoKelKTd7AKvNmUfH88', { action: 'homepage' })
          .then(function (token) {
            // send to route /recaptcha with token
            fetch('/api/recaptcha', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setRecaptchaResponse(data);
                if (data.google_response.success) {
                  alert('Recaptcha verified successfully.');
                } else {
                  history.push('/error'); // Redirect to error page
                }
              })
              .catch((error) => console.error('Error:', error));
          });
      });
    }
  }, [history]);

  return (
    <div id='recaptcha'>
      {recaptchaResponse && recaptchaResponse.google_response && (
        <p>{recaptchaResponse.google_response.success ? 'Recaptcha verified successfully.' : 'Recaptcha verification failed.'}</p>
      )}
    </div>
  );
};

export default Recaptcha;
