import React from "react";
import { Link } from "react-router-dom";
import './landing.css'
import Logo from '../../assets/Images/blackjack.png';

function LandingPage() {
  return (
    <main>

      <div className="landing-text">
        <img className="logo" src={Logo} alt="Cartas" />
        <h1> Welcome to <span className="black">Black</span>jack Web</h1>
        <br />
        <p>Blackjack is a card game where the goal is to obtain a hand with a total value of 21 or as close as possible without going over, competing against the dealer rather than other players</p>
      </div>
    </main>
  )
}

export default LandingPage;
