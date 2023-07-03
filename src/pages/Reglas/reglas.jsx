import './reglas.css';
import React, { useState } from "react";
import Card from "../../components/Card/Card";

function ReglasBlackjack() {
  const [mostrarReglas, setMostrarReglas] = useState(false);
  const [mano, setMano] = useState([]);
  const [mostrarMano, setMostrarMano] = useState(false);

  function generarCartas() {
    const palos = ["spades", "hearts", "clubs", "diamonds"];
    const valores = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king"
    ];

    const cartas = [];
    for (let palo of palos) {
      for (let valor of valores) {
        cartas.push({ valor, palo });
      }
    }
    return cartas;
  }

  function generarMano(numeroCartas) {
    const cartas = generarCartas();
    const mano = [];
    for (let i = 0; i < numeroCartas; i++) {
      const cartaIndex = Math.floor(Math.random() * cartas.length);
      const carta = cartas.splice(cartaIndex, 1)[0];
      mano.push(carta);
    }
    console.log(mano);
    const mano_constante = [ {palo: "hearts", valor: "ace"}, {palo: "hearts", valor: "3"}]
    setMano(mano);
    setMostrarMano(true);
  }

  return (
    <main>
      <h1 className='titulo'>Reglas del Blackjack</h1>
      <h2 className='subtitulo'>¿Te sabes las reglas? ¿O necesitas verlas?</h2>
      <button className='blackjack-button' onClick={() => setMostrarReglas(true)}>Mostrar Reglas</button>
      <button className='blackjack-button' onClick={() => setMostrarReglas(false)}>Ocultar Reglas</button>
      {mostrarReglas && (
        <div>
          <h2 className='subtitulo'>Cómo se juega</h2>
          <p>El objetivo del blackjack es llegar a 21 puntos sin pasarse.</p>
          <p>El valor de las cartas es el siguiente:</p>
      <ul>
        <li>Las cartas del 2 al 10 valen su número.</li>
        <li>Las cartas con figuras (Jota, Reina y Rey) valen 10 puntos.</li>
        <li>El As puede valer 1 u 11 puntos, dependiendo de lo que convenga al jugador.</li>
      </ul>
      <h2 className='subtitulo'>Cómo se gana</h2>
      <p>Hay varias formas de ganar en el blackjack:</p>
      <ul>
        <li>Si al jugador se le reparten dos cartas y su suma es 21, gana automáticamente.</li>
        <li>Si el crupier se pasa de 21 puntos, el jugador gana automáticamente.</li>
        <li>Si el jugador tiene una puntuación mayor que la del crupier sin pasarse de 21, gana.</li>
      </ul>
      <h2 className='subtitulo'>Cómo se juega una mano</h2>
      <p>Una mano típica de blackjack se juega de la siguiente manera:</p>
      <ol>
        <li>El crupier reparte dos cartas boca arriba al jugador.</li>
        <li>El crupier reparte dos cartas a sí mismo, una boca arriba y otra boca abajo.</li>
        <li>El jugador decide si pide más cartas (pedir) o se planta (plantarse).</li>
        <li>El crupier revela su carta boca abajo y pide más cartas si su puntuación es menor o igual a 16.</li>
        <li>Si el jugador se pasó de 21 puntos, pierde automáticamente.</li>
        <li>Si el crupier se pasó de 21 puntos, el jugador gana automáticamente.</li>
        <li>Si el jugador y el crupier tienen la misma puntuación, se considera un empate.</li>
        <li>Si el jugador tiene una puntuación mayor que la del crupier sin pasarse de 21, gana.</li>
      </ol>
      <h2 className='subtitulo'>Manos ganadoras</h2>
      <table>
        <thead>
          <tr>
            <th>Mano</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Blackjack</td>
            <td>Una mano que consta de un As y una carta con valor 10 (Jota, Reina, Rey o 10).</td>
          </tr>
          <tr>
            <td>21</td>
            <td>Una mano que suma 21 puntos con más de dos cartas.</td>
          </tr>
          <tr>
            <td>Five-card Charlie</td>
            <td>Una mano de cinco cartas que suma 21 puntos o menos.</td>
          </tr>
        </tbody>
      </table>
      <h2 className="subtitulo"> Simula una Mano</h2>
      <button className='blackjack-button' onClick={() => generarMano(2)}>Repartir Mano</button>
      {mostrarMano && (
        <div className="mano">
          {mano.map((carta, index) => (
            <Card number={carta.valor} suit={carta.palo} key={index} />
          ))}
        </div>
      )}
    </div>
      )}
</main>
);
}

export default ReglasBlackjack;