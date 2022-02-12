import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <h1>My all times favorite movies LIST</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutMoviesList">about this App - my favorite movies LIST</Link>
            </li>
            <li>
              <Link to="/aboutMichellePannosch">about Michelle Pannosch</Link>
            </li>
            <li>
              <Link to="/myMoviesList">my favorite movies LIST</Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;
