import React, { useEffect, useState } from 'react';
import './Recaptcha.css';

function Recaptcha() {
  const [recaptchaResponse, setRecaptchaResponse] = useState(null);

  useEffect(() => {
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
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to verify reCAPTCHA token');
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                setRecaptchaResponse(data);
                if (!data.googleResponse.success) {
                  alert('Recaptcha verification failed. Redirecting to homepage.');
                  window.location.href = '/';
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          });
      });
    }
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (recaptchaResponse && recaptchaResponse.googleResponse) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [recaptchaResponse]);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && recaptchaResponse && recaptchaResponse.googleResponse && (
      <div className='recaptcha'>

        <div className="dropdown-banner" onClick={handleClick}>
          <p>Status: {recaptchaResponse.googleResponse.success ? 'Success' : 'Failed'}</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default Recaptcha;
