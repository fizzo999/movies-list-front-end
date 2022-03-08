import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import '../style/Alert.css';

class AlertComponent extends Component {
  render() {
    return (
      <Container>
        <Alert variant='danger'>{this.props.alertMessage}</Alert>
      </Container>
    );
  }
}

export default AlertComponent;
