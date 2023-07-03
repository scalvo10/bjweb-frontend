import "./Card.css";
import React, { useState, useEffect } from 'react';

function Card({ number, suit }) {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    import(`../../../Images/cartas/${number}_of_${suit}.svg`)
      .then((image) => {
        setImagePath(image.default);
      })
      .catch((error) => {
        // Manejar errores de carga de la imagen
        console.error(error);
      });
  }, [number, suit]);

  if (!imagePath) {
    return null; // Puedes mostrar un componente de carga mientras se carga la imagen
  }

  return (

    <img className="card-image" src={imagePath} alt={`${number} of ${suit}`} />


  );
}

export default Card;
