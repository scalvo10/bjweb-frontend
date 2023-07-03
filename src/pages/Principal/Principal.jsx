import React, { useState, useContext, useEffect } from 'react';
import './principal.css';
import createAxiosInstance from '../../axiosinstance';
import { AuthContext } from '../../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import API_URL from "../../config";

function Principal() {
  const { token } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [gameSelected, setGameSelected] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [seatSelected, setSeatSelected] = useState(null);
  const [userid, setUserid] = useState(null);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const axiosInstance = createAxiosInstance(token);

  const redirigir = (gameid) => {

    setGameId(gameid);
    console.log('redirigir');
    axiosInstance.get(`${API_URL}/game/${gameid}`)
      .then((response) => {
        let seat = 0;
        console.log(response.data);
        if (response.data.seat1) {
          seat = 1;
          setSeatSelected(1)
        } else if (response.data.seat2) {
          seat = 2;
          setSeatSelected(2)
        } else if (response.data.seat3) {
          seat = 3;
          setSeatSelected(3)
        } else if (response.data.seat4) {
          seat = 4;
          setSeatSelected(4)
        } else if (response.data.seat5) {
          seat = 5;
          setSeatSelected(5)
        }

        axiosInstance.post(`${API_URL}/table/${gameid}/${seat}`)
          .then((response) => {
            console.log(response.data);
            navigate(`/table/${gameid}/${seat}`);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          })
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })


    // navigate(`/table/${gameid}`);
  };

  useEffect(() => {
    axiosInstance.get(`${API_URL}/game`)
      .then((response) => {
        setGames(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  const handleOpenForm = () => {
    setShowForm(true); // Establecer el estado para mostrar el formulario
  };

  const handleCloseForm = () => {
    setShowForm(false); // Establecer el estado para ocultar el formulario
  };

  const handleInputClick = (event) => {
    event.stopPropagation(); // Detiene la propagación del evento de clic en los campos de entrada
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const minBet = event.target.elements.minBet.value;
    const maxBet = event.target.elements.maxBet.value;

    const decodedToken = jwtDecode(token);
    let newUserId = parseInt(decodedToken.sub);
    setUserid(newUserId);

    console.log(userid);
    console.log(seatSelected);
    axiosInstance.post(`${API_URL}/table/creategame`, {
      min_bet: minBet,
      max_bet: maxBet
    })
      .then((response) => {
        console.log(response.data);
        navigate(`/table/${response.data.gameid}/1`);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
  };


  return (
    <main className="main-p">
      {token === null && (
        <p>
          Blackjack is a card game where the objective is to get a hand with a total value of 21 or as close to it as
          possible without going over. The game is played with a deck of 52 cards, and players compete against the dealer
          instead of each other. Each player receives two cards and can request additional cards to improve their hand. If
          the player goes over 21 points, they automatically lose the hand. The dealer follows specific rules to determine
          whether to receive more cards or not. The player with a hand closest to 21 wins the game
        </p>
      )}
      <div className="games">
        {token !== null && (
          <div className="plusbuttonbox">
            <h2>Games Available</h2>
            <button className="plusbutton" onClick={handleOpenForm}>
              +
            </button>
            {showForm && (
              <div className="modal-overlay" onClick={handleCloseForm}>
                <div
                  className={`bet-selection-form ${showForm ? 'visible' : ''
                    }`}
                >
                  <form onSubmit={handleSubmit}>
                    <input className='bet-input' type="text" name="minBet" placeholder="Min Bet" onClick={handleInputClick} />
                    <input className='bet-input' type="text" name="maxBet" placeholder="Max Bet" onClick={handleInputClick} />
                    <button type='submit' onClick={handleInputClick}>Create Game</button>
                  </form>
                </div>

              </div>
            )}
          </div>

        )}
        {token !== null && !showForm && (
          <ul className="games-display">
            {games.map((game) => (
              <li className="gamebox" key={game.id}>
                <div className="gamediv">
                  <p>Game {game.id}</p>
                  <p>Avalible seats: {(!!game.seat1 + !!game.seat2 + !!game.seat3 + !!game.seat4 + !!game.seat5)}</p>
                  <p>
                    {' '}
                    Min bet: <strong>{game.min_bet}</strong>
                  </p>
                  <p>
                    Max bet: <strong>{game.max_bet} </strong>
                  </p>
                  {(!!game.seat1 + !!game.seat2 + !!game.seat3 + !!game.seat4 + !!game.seat5) > 0 && (
                    <button className="button-link" onClick={() => redirigir(game.id)}>Join Game</button>
                  )}
                  {(!!game.seat1 + !!game.seat2 + !!game.seat3 + !!game.seat4 + !!game.seat5) == 0 && (
                    <h2>Close</h2>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Principal;