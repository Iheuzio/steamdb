import React, { useState, useEffect } from 'react';
import NavBar from '../navigation/NavBar';

async function getUserLogin() {
  // fetch details from /account
  try {
    const response = await fetch('/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Launch the /auth/steam window
    const authWindow = window.open('/auth/steam', '_blank');

    // Wait for the /auth/steam window to close
    while (!authWindow.closed) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Get user login from /account
    const response = await fetch('/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Success:', data);
    return data;
  }
}

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