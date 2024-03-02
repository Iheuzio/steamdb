import { useState, useEffect } from 'react';


//Accepts a prop for the gameLink and fetches the header image from the steamapi
//returns an image tag
function GameHeader({gameURL}){

    const[headerURL, setHeaderURL] = useState('');

    useEffect(() => {

        async function fetchGameHeader(){
            try{
                const response = await fetch(`steamapi/${gameURL}`);
                if(response.ok){
                    const header = await response.json();
                    setHeaderURL(header[gameURL]['data']['header_image']);
                  }else {
                    alert('Error: Problem fetching header image from steam api');
                  }
                } catch(error){
                  alert(error);
                }
        }
        fetchGameHeader();
    }, [gameURL]);

    return (
        <img id='header-image' src={headerURL} alt='game header image' />
    )

}

export {
    GameHeader
  }