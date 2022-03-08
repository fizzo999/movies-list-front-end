import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginButton from './LoginButton.js';
import movieProjector from '../assets/movie-projector.gif';
import '../style/LoginModal.css';

export class LoginModal extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Modal
            className='loginButtonStartpage'
            show={this.props.openModal}
            onHide={this.props.closeModal}
            backdrop='static'
            keyboard={false}
            centered
          >
            <Modal.Header className='modalHeader'>
              <Modal.Title>welcome to favorite movies LIST APP</Modal.Title>
              <img src={movieProjector} alt={'movie projector running'} />
              {/* src={'http://www.flexitoon.com/images/projector-gif4.gif'} */}
            </Modal.Header>
            <Modal.Body>
              <h5>
                Please log in to use this APP - we will never share your info
              </h5>
              <h5>secure authentication is provided by auth0</h5>
              <img
                className='auth0Logo'
                src={'https://cdn.auth0.com/website/bob/press/logo-dark.png'}
                alt={'logo of auth0 secure login provider'}
              />
            </Modal.Body>
            <Modal.Footer>
              <LoginButton />
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginModal;
