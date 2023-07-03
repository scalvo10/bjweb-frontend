import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Tablero from '../../assets/Images/table.png';
import './table.css';
import Card from "../../components/Card/Card";
import createAxiosInstance from '../../axiosinstance';
import { AuthContext } from '../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Ficha from "../../assets/Images/ficha_casino.png";

const BlackjackTable = () => {
  // Aquí puedes definir el estado del juego y otras variables necesarias
  const gameid = useParams().id;
  const seat = useParams().seat;
  const tiempo_polling = 3000;
  const { token } = useContext(AuthContext);
  const [userid, setUserid] = useState(0);
  const [gameState, setGameState] = useState([]);
  const [turno, setTurno] = useState(1);
  const [contador , setContador] = useState(0);
  const [betsOpen, setBetsOpen] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(0);
  const axiosInstance = createAxiosInstance(token);
  const [win, setWin] = useState(null);
  const [tie, setTie] = useState(null);
  const [blackjack, setBlackjack] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      const newUserId = parseInt(decodedToken.sub);
      setUserid(newUserId);
      axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/table/isHost/${gameid}`)
        .then((response) => {
          setIsHost(response.data.host);
          setBalance(response.data.balance);
          setBet(response.data.bet);
          console.log(response.data);
        })

    } catch (error) {
      console.log('Error al decodificar el token:', error.message);
    }

    

    const handlePageUnload = () => {
      eliminarRecurso();
    };

    window.addEventListener('beforeunload', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };

  }, []);

  useEffect(() => {
    const handleNavigation = (location) => {
      // Verifica si el usuario está navegando a otra URL dentro de la misma aplicación
      if (location.pathname !== navigate.location.pathname) {
        // Realiza la solicitud DELETE antes de que el usuario salga de la vista
        handlePageUnload();
      }
    };
  }, [navigate]);


  useEffect(() => {
    const fetchData = async () => {
      console.log(gameid);
      axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/game/state/${gameid}`)
        .then((response) => {
          console.log(response.data);
          setGameState(response.data.state);
          setBetsOpen(response.data.open);
          setTurno(response.data.turno);
          for (let i = 0; i < response.data.state.length; i++) {
            if (response.data.state[i].seat == seat) {
              setBalance(response.data.state[i].balance);
              setBet(response.data.state[i].bet);
            }
          }
        })
        .then((response) => {
          checkBlackjack();
        })
        .then( (response) => {
          if (turno == seat && blackjack == true) {
            plantarse();
          }
        })
        // .then( (response) => {
        //   for (let i = 0; i < gameState.length; i++) {
        //     if (gameState[i].seat == seat) {
        //       console.log('entre al if hola');
        //       console.log(gameState[i]);
        //       setBalance(gameState[i].balance);
        //       setBet(gameState[i].bet);
        //     }
        //   }

        // })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();

    const intervalId = setInterval(fetchData, tiempo_polling); // Realiza la solicitud cada 5 segundos (5000 milisegundos)

    // Función de limpieza para limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (turno == 0) {

      setContador(1);
      console.log('voy a checkear el win');
      check_win();


    }
  }, [turno]);

  const pedirCartas = () => {
    axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/game/execute`, {
      gameid: gameid,
      action: 'hit',
    })
    // .then ((response) => {
    //   if (response.data.turno == 0) {
    //     setBetsOpen(true);
    //     check_win();

    //   }
    // })
      .catch((error) => {
        console.log(error);
      });
  }

  const plantarse = () => {
    axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/game/execute`, {
      gameid: gameid,
      userid: userid,
      action: 'stand',
    })
    // .then ((response) => {
    //   if (response.data.turno == 0) {
    //     console.log('entre al if, voy a checkear el win');
    //     check_win();

    //   }
    // })
    .catch((error) => {
      console.log(error);
    });
  }

  const check_win = () => {
    console.log('entre al check win');
    axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/game/check_win/${gameid}`)
      .then((response) => {
        console.log(response.data);
        const { win, tie } = response.data;
        setWin(win);
        setTie(tie);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const apostar = () => {
    axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/table/raisebet/${gameid}/50`)
      .then((response) => {
        console.log(response.data);
        setBalance(response.data.balance);
        setBet(response.data.bet);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const bajarApuesta = () => {
    axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/table/raisebet/${gameid}/${-50}`)
      .then((response) => {
        setBalance(response.data.balance);
        setBet(response.data.bet);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const checkBlackjack = () => {
    axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/game/check_blackjack/${gameid}`)
      .then((response) => {
        console.log(response.data);
        const { blackjack } = response.data;
        setBlackjack(blackjack);
        if (blackjack) {
          setWin(win);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const iniciarJuego = () => {
    axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/game/start/${gameid}`)
      .then((response) => {
        console.log(response.data);
        setTurno(response.data.turno);
        // setBetsOpen(response.data.betsOpen);
      })
      // .then( () => {

      // })
      .catch((error) => {
        console.log(error);
      });
  }

  const eliminarRecurso = () => {
    axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/table/${gameid}`)
      .then(() => {
        console.log('Recurso eliminado exitosamente');
      })
      .catch((error) => {
        console.log('Error al eliminar el recurso:', error);
      });
  }

  const limpiarMesa = () => {
    axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/table/clear/${gameid}`)
      .then(() => {
        console.log('Mesa limpiada exitosamente');
        setContador(0);
      })
      .catch((error) => {
        console.log('Error al limpiar la mesa:', error);
      });
  }

  return (
    <div className="blackjack-table">
      {/* Aquí puedes mostrar la estructura del tablero */}
      {!betsOpen &&
        <h2 className="indicador-turno"> Turno Asiento {turno} </h2>
      }
      {win !== null && (
        <div className="result-message">
          {win && <p>You won!</p>}
          {tie && <p>It's a tie!</p>}
          {!win && !tie && <p>You lost!</p>}
        </div>
      )}
      <div className="blackjack-table-tablero">
        <img className="blackjack-table-tablero img" src={Tablero} alt="Blackjack Table" />
        {gameState.map((player) => (
          <div
            key={player.seat}
            className={`blackjack-table-tablero player-${player.seat}`}// Ajusta la posición vertical según el jugador
          >
            {/* Renderiza las cartas del jugador */}
            {player.cards.map((card, index) => (
              <Card number={card.value} suit={card.suit} key={index} />
            ))}
          </div>
        ))}

        {gameState.map((player) => (
          <div
            key={player.seat}
            className={`blackjack-table-tablero ficha-${player.seat}`}// Ajusta la posición vertical según el jugador
          >
            {/* Renderiza las fichas del jugador */}
            {player.seat !== 0 && player.bet > 0 &&
              <img className="imagen-ficha" src={Ficha} alt="Ficha" />
            }
          </div>
        ))}

        {betsOpen && isHost && turno !== 0 &&
          <div className="blackjack-table-tablero comenzar-partida">
            <button className='blackjack-button' onClick={() => iniciarJuego()}>Repartir Cartas</button>
          </div>
        }
        {betsOpen && isHost && turno == 0 &&
          <div className="blackjack-table-tablero limpiar-mesa">
            <button className='blackjack-button' onClick={() => limpiarMesa()}>Limpiar Tablero</button>
          </div>
        }

      </div>

      {/* Aquí puedes mostrar los botones de juego y otros elementos interactivos */}

      <div className="datos-jugador">
        <p>Balance: {balance}</p>
        <p>Apuesta: {bet}</p>
      </div>

      {!betsOpen && turno == seat &&
        <div className="game-controls">
          <button className='blackjack-button' onClick={() => pedirCartas()}>Pedir carta</button>
          <button className='blackjack-button' onClick={() => plantarse()}>Plantarse</button>
        </div>
      }

      {betsOpen && turno !== 0 &&
        <div className="apostar">
          <button className='blackjack-button' onClick={() => bajarApuesta()}>Low Bet</button>
          <button className='blackjack-button' onClick={() => apostar()}>Raise Bet</button>
        </div>
      }

    </div>
  );
};

export default BlackjackTable;
