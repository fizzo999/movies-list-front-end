import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import '../style/About.css';

import image001 from '../assets/001-first-step-home-button.png';
import image002 from '../assets/002-search-for-movie.png';
import image003 from '../assets/003-select-movie-2-add-2-LIST.png';
import image004 from '../assets/004-movie-is-already-in-LIST-alert.png';
import image005 from '../assets/005-look-for-a-different-movie-2-add.png';
import image006 from '../assets/006-success-message-adding-movie-2-our-LIST.png';
import image007 from '../assets/007-and-here-is-the-latest-addition-2-our-LIST.png';
import image008 from '../assets/008-click-update-2-leave-a-comment.png';
import image009 from '../assets/009-opens-a-new-modal-2-update-movie.png';
import image010 from '../assets/010-@bottom-comment-field.png';
import image011 from '../assets/011-verify-your-comment-got-stored-in-the-db.png';
import image012 from '../assets/012-finally-delete-movie-from-LIST.png';


class About extends Component {
  render() {
    let imageArray = [image001, image002, image003, image004, image005, image006, image007, image008, image009, image010, image011, image012];
    let instructionsTitleArray = ['first step: search for movies', 'second step: search for a movie you really like', 'third step: select movie 2 add 2 your LIST', 'fourth: if movie is already in your list you ll get a warning', 'fifth: look for a different movie instead', 'sixth: success message', 'seventh: redirected', 'eight: click update button', 'ninth: modal opens', 'tenth: click on the yellow input field', 'eleventh: back to the saved favorite movies LIST', 'twelveth: if you find a movie you nolonger like delete it'];
    let instructionsFooterTextArray = ['click on Home button in nav bar', 'type movie title in input field and hit search button', 'if there are several results pick the one you like and click on blue add movie button at bottom ', 'warning message - movie did NOT get added again', 'back to input form, enter movie, click seach and now select the movie you like from the API results', 'we are adding the selected movie to your favorites LIST', 'and here is the favorites movie LIST', 'make sure you leave a comment WHY you like this movie so much', 'here you can update the movie title, the movie overview/description AND leave your comment about this movie', 'add your comment in the yellow input field and hit save', 'verify it saved your comment to the card - this is now in the database so it survives a refresh', 'and that movie will be deleted from your saved favorite movies LIST'];
    let instructionsCardArray = imageArray.map((image, index) => {
      return (
        <Card key={`instruction-card-${index}`} >
          <Card.Header>
            <Card.Title>{instructionsTitleArray[index]}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Img
              variant='top'
              src={image}
            ></Card.Img>
          </Card.Body>
          <Card.Footer>
            <Card.Title>{instructionsFooterTextArray[index]}</Card.Title>
          </Card.Footer>
        </Card>
      );
    });
    return (
      <Container fluid='md' maxwidth='sm'>
        <h1>About Favorite Movies LIST APP</h1>
        <CardGroup className='instructionsCards'>
          {instructionsCardArray}
        </CardGroup>
      </Container >
    );
  }
}

export default About;
