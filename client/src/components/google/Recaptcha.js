import React, { useEffect, useState } from 'react';
import './Recaptcha.css';

export const Recaptcha = () => {
  const [recaptchaResponse, setRecaptchaResponse] = useState(null);

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute('6Lf5tLMpAAAAACI_XveGezoKelKTd7AKvNmUfH88', { action: 'homepage' })
          .then(function (token) {
            // send to route /recaptcha with token
            fetch('/recaptcha', {
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
              })
              .catch((error) => console.error('Error:', error));
          });
      });
    }
  }, []);

  return (
    <div id='recaptcha'>
      {recaptchaResponse && (
        <p>{recaptchaResponse.google_response.success ? 'Recaptcha verified successfully.' : 'Recaptcha verification failed.'}</p>
      )}
    </div>
  );
};

export default Recaptcha;