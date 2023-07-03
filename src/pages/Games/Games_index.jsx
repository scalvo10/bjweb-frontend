import React, { useState } from "react";

const MyComponent = () => {
  const myList = ['Elemento 1', 'Elemento 2', 'Elemento 3'];

  return (
    <div>
      <h1>Lista Desplegada:</h1>
      <ul>
        {myList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};


export default Principal;