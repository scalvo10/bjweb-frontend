import React from "react";
import './about-us.css';
import Toño from '../../../public/Images/fototoñopaginaweb.jpg';
import Calvo from '../../../public/Images/Calvo.jpg';

function AboutUs() {
  return (
    <main className="main-au">

      <div className="content">
        <h1> What is <span className="black">Black</span>jack Web?</h1>
        <p>Welcome to Free Blackjack Game, the perfect place to play blackjack without risking any of your own money! We believe that everyone should be able to enjoy this classic casino game, no matter their budget. That's why we've created this free online version of the game, so that you can play whenever you want, for as long as you want.</p>
        <p>Our team of developers and designers have worked hard to create a realistic and enjoyable gaming experience, complete with stunning graphics and smooth gameplay. Whether you're a seasoned pro or a complete beginner, you're sure to find something to love about our game.</p>
        <p>If you have any questions or feedback, please don't hesitate to get in touch with us using the contact form on our website. We're always looking for ways to improve our game and make it even more fun for our players.</p>
        <p>Thanks for playing Free Blackjack Game, and we hope you enjoy your experience!</p>

      </div>

      <div className="content">
        <h1> Our Team</h1>
        <div className="team">
          <div className="team-member">
            <img className="perfil" src={Calvo} alt="Santiago Calvo" />
            <h3>Santiago Calvo</h3>
            <p>ndncw wovnwb viowvonw oiwdnvbwqvb  cdiuwbnvwiv  wbnciwvnwib cwiucbiwb cbwbcnb chuebch c deiobcd  cjibwnv wcbcibvwcw</p>
          </div>
          <div className="team-member">
            <img className="perfil" src={Toño} alt="Antonio Doberti" />
            <h3>Antonio Doberti</h3>
            <p>kjwvn  winnbyd cubeo  ciundebiwn dhcn cjujuebibw iondnvw dbdjn wiudbw bwcibbc ydbiwbjn iwbciobwk icbwhvw iwbchh wicjd iswhjw</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AboutUs;