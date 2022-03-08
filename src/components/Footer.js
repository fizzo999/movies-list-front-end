import React from 'react';
import Container from 'react-bootstrap/Container';
import '../style/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <Container fluid='md' maxwidth='sm'>
        <h3>Copyright &copy; 2022 Michelle Pannosch</h3>
      </Container>
    );
  }
}

export default Footer;
