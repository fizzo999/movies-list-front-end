// import React, { Component } from 'react';

// class AboutMichellePannoschComponent extends Component {
//   render() {
//     return <div>AboutMichellePannoschComponent</div>;
//   }
// }

// export default AboutMichellePannoschComponent;

import React from 'react';
// import { Container, Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// import { useAuth0 } from '@auth0/auth0-react';
import github from '../assets/gh.png';
import linkedin from '../assets/li.png';
import '../style/AboutMichellePannosch.css';

const AboutMichellePannoschComponent = () => {
  // const { isAuthenticated, isLoading } = useAuth0();
  // if (isLoading) {
  //   return <Spinner animation='border' />;
  // }

  return (
    // isAuthenticated && (
    <Container fluid='md' maxwidth='sm'>
      <h1>About Michelle Pannosch</h1>
      <h2>Hover over the image to learn more about Michelle</h2>
      <section className='about-us-wrapper'>
        <div className='about-card-container'>
          <div className='about-card'>
            <div className='side Michelle_001'></div>
            <div className='side back'>
              <div>
                <h3>About Michelle the software developer</h3>
                <p>
                  Fullstack JavaScript developer with a background in
                  Hospitality Management. Passionate about writing accessible,
                  intuitive, and easy to read code. I want to build products
                  that are inspiring, improving the lives of people and are
                  future forward.
                </p>
              </div>
              <div className='connect'>
                <a
                  href='https://github.com/CoderMichelle'
                  alt='Michelle`s github'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img className='social-icon' src={github} alt='github' />
                </a>
                <a
                  href='https://www.linkedin.com/in/michelle-pannosch/'
                  alt='Michelle`s linkedIn'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img className='social-icon' src={linkedin} alt='linkedin' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
  // );
};

export default AboutMichellePannoschComponent;
