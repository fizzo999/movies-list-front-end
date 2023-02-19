import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner';

import '../style/UpdateMovieModal.css';

class UpdateMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.selectedMovie._id,
      title: this.props.selectedMovie.title,
      overview: this.props.selectedMovie.overview,
      average_votes: this.props.selectedMovie.average_votes,
      total_votes: this.props.selectedMovie.total_votes,
      image_url: this.props.selectedMovie.image_url,
      popularity: this.props.selectedMovie.popularity,
      released_on: this.props.selectedMovie.released_on,
      tmdbID: this.props.selectedMovie.tmdbID,
      comment: this.props.selectedMovie.comment,
      email: this.props.selectedMovie.email,
    };
  }
  handleChange = (e, someProperty) => {
    this.setState({
      [someProperty]: e['target']['value'],
    });
  };

  handleChangeShorter = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let updatedMovie = {
      _id: this.state._id,
      title: this.state.title,
      overview: this.state.overview,
      average_votes: this.state.average_votes,
      total_votes: this.state.total_votes,
      popularity: this.state.popularity,
      released_on: this.state.released_on,
      tmdbID: this.state.tmdbID,
      comment: this.state.comment,
      image_url: this.state.image_url,
      email: this.props.selectedMovie.email,
    };
    console.log(
      'we are in the modal and here is the updated Movie',
      updatedMovie
    );
    this.props.updateMovie(updatedMovie);
  };
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
            <Modal.Title>
              edit this movie and make sure to leave a comment why you like it
              so much
            </Modal.Title>
            <img src={this.state.image_url} alt={this.state.title} />
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <h4>Movie TITLE: </h4>
              <h2>{this.props.selectedMovie.title}</h2>
              {/* <Form.Group controlId='title'>
                <Form.Label>Movie Title</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'title')}
                  defaultValue={this.props.selectedMovie.title}
                />
              </Form.Group> */}
              {/* <Form.Group controlId='overview'>
                <Form.Label>Movie overview</Form.Label>
                <Form.Control
                  type='textarea'
                  onChange={e => this.handleChange(e, 'overview')}
                  defaultValue={this.props.selectedMovie.overview}
                />
              </Form.Group> */}
              <h5>overview:</h5>
              <textarea
                onChange={e => this.handleChange(e, 'overview')}
                defaultValue={this.props.selectedMovie.overview}
              ></textarea>
              <div className='unchangeables'>
                {/* <Form.Group controlId='average_votes'>
                <Form.Label>Movie average votes</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'average_votes')}
                  defaultValue={this.props.selectedMovie.average_votes}
                />
              </Form.Group> */}
                <h5>
                  Movie average votes: {this.props.selectedMovie.average_votes}
                </h5>
                {/* <Form.Group controlId='total_votes'>
                <Form.Label>Movie total votes</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'total_votes')}
                  defaultValue={this.props.selectedMovie.total_votes}
                /></Form.Group> */}
                <h5>
                  Movie total votes: {this.props.selectedMovie.total_votes}
                </h5>
                {/* <Form.Group controlId='popularity'>
                <Form.Label>Movie popularity</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'popularity')}
                  defaultValue={this.props.selectedMovie.popularity}
                ></Form.Control>
              </Form.Group> */}
                <h5>Movie popularity: {this.props.selectedMovie.popularity}</h5>
                {/* <Form.Group controlId='released_on'>
                <Form.Label>Movie released on</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'released_on')}
                  defaultValue={this.props.selectedMovie.released_on}
                ></Form.Control>
              </Form.Group> */}
                <h5>
                  Movie released on: {this.props.selectedMovie.released_on}
                </h5>
                {/* <Form.Group controlId='tmdbID'>
                <Form.Label>Movie tmdb ID</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'tmdbID')}
                  defaultValue={this.props.selectedMovie.tmdbID}
                ></Form.Control>
              </Form.Group> */}
                <h5>Movie tmdb ID: {this.props.selectedMovie.tmdbID}</h5>
                {/* <Form.Group controlId='comment'>
                <Form.Label>Movie comment</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'comment')}
                  defaultValue={this.props.selectedMovie.comment}
                ></Form.Control>
              </Form.Group> */}
              </div>
              <h5>comment:</h5>
              <textarea
                onChange={e => this.handleChange(e, 'comment')}
                defaultValue={this.props.selectedMovie.comment}
              ></textarea>
              {/* <Form.Group controlId='popularity'>
                <Form.Label>Movie popularity</Form.Label>
                <Form.Control
                  as='select'
                  onChange={e => this.handleChange(e, 'popularity')}
                  defaultValue={this.props.selectedMovie.popularity}
                >
                  <option value='LIFE-CHANGING'>Life Changing</option>
                  <option value='FAVORITE FIVE'>Favorite Five</option>
                  <option value='RECOMENDED TO ME'>Recomended to Me</option>
                </Form.Control>
              </Form.Group> */}
              <Form.Group controlId='image_url'>
                <Form.Label>Movie Image Source</Form.Label>
                <Form.Control
                  type='text'
                  onChange={e => this.handleChange(e, 'image_url')}
                  defaultValue={this.props.selectedMovie.image_url}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className='btnContainer'>
              <Button
                variant='danger'
                type='submit'
                onClick={this.handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UpdateMovieModal;
