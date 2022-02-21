import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import Button from 'react-bootstrap/Button';
import '../style/Movie.css';

const LoginButton = props => {
  const { loginWithRedirect } = useAuth0();

  const localLoginBtnHandler = () => {
    loginWithRedirect();
  };

  console.log('inside login btn');
  return (
    <button
      // className='commentBtnActive'
      onClick={() => localLoginBtnHandler()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
