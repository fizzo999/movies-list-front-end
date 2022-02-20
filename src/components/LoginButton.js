import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import Button from 'react-bootstrap/Button';
import '../style/Movie.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      // className='commentBtnActive'
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
