import React, {useContext, useState} from 'react';
import './Forms.css';
import { AuthContext } from '../../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMsg("Has hecho logout con éxito!");
    navigate(`/log-in`)
  }

  return (
    <>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        <button className='logoutbutton' onClick={handleLogout}>
          Log out
        </button>
    </>
  );
}

export default LogoutButton;