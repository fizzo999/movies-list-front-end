import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import '../style/Movie.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className='commentBtnActive btn'
      onClick={() => loginWithRedirect()}
    >
      Please click to LogIn - you will be redirected to auth0
    </Button>
  );
};

export default LoginButton;
