import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import '../style/Modal.css';

class LoadingModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.openModal}
          onHide={this.props.closeModal}
          backdrop='static'
          keyboard={false}
          centered
        >
          <Modal.Header className='modalHeader'>
            <Modal.Title>{this.props.modalHeaderText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='btnContainer'>
              {this.props.modalHeaderText === 'alert' ? (
                <Button
                  variant='danger'
                  disabled
                  size='lg'
                  className='btn btn-success btn-lg spinnerBtn'
                >
                  <Spinner
                    as='span'
                    animation='border'
                    size='xlg'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='visually-hidden'>Loading...</span>
                  {this.props.modalLoadingText}
                </Button>
              ) : (
                <Button
                  variant='success'
                  disabled
                  size='lg'
                  className='btn btn-success btn-lg spinnerBtn'
                >
                  <Spinner
                    as='span'
                    animation='border'
                    size='xlg'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='visually-hidden'>Loading...</span>
                  {this.props.modalLoadingText}
                </Button>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LoadingModal;
