import { useLocation } from 'react-router-dom';

export default function GameDetails() {

    const location = useLocation();
    const game = new URLSearchParams(location.search).get('game');

    console.log(location, game);

    return (
        <h1> Something here: {game}</h1>
    );

};