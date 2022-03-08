import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = props => {
  const { logout, user } = useAuth0();
  // I am using the useEffect hook here to "hoist" the user up to App through the function logoutUser
  // this LogoutButton component only is rendered/mounted once the user is successfully logged in
  // utilizing useEffect is a solution to getting the user up into App - state once it is logged in
  useEffect(() => {
    // console.log('well that component did mount alright');
    props.loginUser(user);
  }, []);

  const localLogoutBtnHandler = () => {
    logout({ returnTo: window.location.origin });
    props.logoutUser();
    // console.log('now we have logged out the user');
  };
  return <button onClick={() => localLogoutBtnHandler()}>Log Out</button>;
};

export default LogoutButton;

