import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import '../style/Header.css';

class Header extends React.Component {
  render() {
    return (
      <Container fluid='md' maxwidth='sm'>
        <nav>
          <h1>My all times favorite movies LIST</h1>
          <ul>
            {this.props.isAuthenticated ? (
              <LogoutButton
                className='logoutButton'
                logoutUser={this.props.logoutUser}
                loginUser={this.props.loginUser}
              />
            ) : (
              <LoginButton className='commentBtnActive' />
            )}

            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/aboutMoviesList'>
                about this App - my favorite movies LIST
              </Link>
            </li>
            <li>
              <Link to='/aboutMichellePannosch'>about Michelle Pannosch</Link>
            </li>
            <li>
              <Link to='/myMoviesList'>my favorite movies LIST</Link>
            </li>
          </ul>
        </nav>
      </Container>
    );
  }
}

export default Header;
