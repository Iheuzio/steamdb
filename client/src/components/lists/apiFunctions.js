const fetchUserGameList = async (userID) => {
  try {
    const response = await fetch(`/localapi/user/${userID}/games`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error fetching user game list:', e);
    return [];
  }
};

const saveUserGameList = async (userID, games) => {
  try {
    const response = await fetch(`/localapi/user/${userID}/updateList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ games })
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error saving user game list:', e);
    return null;
  }
};



export { fetchUserGameList, saveUserGameList };