import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <h1>My all times favorite movies LIST</h1>
          <ul>
            <li>
              <a href="#link1">link - 1</a>
            </li>
            <li>
              <a href="#link2">link - 2</a>
            </li>
            <li>
              <a href="#link3">link - 3</a>
            </li>
            <li>
              <a href="#link4">link - 4</a>
            </li>
          </ul>
        </nav>
        <div id="link1"></div>
        <div id="link2"></div>
        <div id="link3"></div>
        <div id="link4"></div>
      </React.Fragment>
    );
  }
}

export default Header;
