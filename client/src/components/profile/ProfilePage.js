import React, { useState, useEffect } from 'react';
import NavBar from '../navigation/NavBar';

export default function ProfilePage() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch('/account')
        .then(response => {
            if (response.status === 401) {
                window.location.href = '/auth/steam';
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                setAccount(data);
            }
        })
        .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <NavBar/>
      {
        account ? <>
                    <h1>Profile Page</h1>
                    <img src={account.user.photos[2].value} alt='Your Avatar Image' />
                    <p>ID: {account.user.id}</p>
                    <p>Name: {account.user.displayName}</p>
                    <button onClick={() => window.location.href = '/logout'}>Logout</button>
                  </>:
                    <h1>Loading...</h1> 
      }
    </>
  );
}