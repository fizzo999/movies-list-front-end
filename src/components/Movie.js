import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/Movie.css';
import MovieSaving2ListModal from './Modal.js';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      hasComment: false,
    };
  }

  captureTypedInput = e => {
    e.preventDefault();
    let el = e.target;
    let nextEl = el.nextElementSibling;
    nextEl.setAttribute('class', 'commentBtnActive commentBtn btn btn-primary');
    this.setState({ comment: e.target.value, hasComment: true });
  };

  submitLocal = e => {
    e.preventDefault();
    this.props.addComment(this.state.comment, this.props.movieObj);
    let el = e.target;
    el.setAttribute('class', 'commentBtn btn btn-primary');
  };

  render() {
    return (
      <div className='movieCard'>
        {this.props.saving2List ? (
          <MovieSaving2ListModal
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
            modalHeaderText={'saving movie to your LIST'}
            modalLoadingText={'SAVING YOUR MOVIE'}
          />
        ) : (
          ''
        )}
        <Card>
          <Card.Header>
            <Card.Title>{this.props.movieObj.title}</Card.Title>
          </Card.Header>
          <Card.Img
            variant='top'
            src={this.props.movieObj.image_url}
          ></Card.Img>
          <Card.Text>{this.props.movieObj.overview}</Card.Text>
          <Card.Text>
            average votes: {this.props.movieObj.average_votes}
          </Card.Text>
          <Card.Text>total votes: {this.props.movieObj.total_votes}</Card.Text>
          <Card.Text>popularity: {this.props.movieObj.popularity}</Card.Text>
          <Card.Text>
            release date: {this.props.movieObj.release_date}
          </Card.Text>
          {this.props.included ? (
            <Card.Body>
              <input
                className={
                  this.props.movieObj.comment
                    ? 'movieComment-YES'
                    : 'movieComment-NO'
                }
                type='textarea'
                defaultValue={
                  this.props.movieObj.comment ? this.props.movieObj.comment : ''
                }
                placeholder={
                  this.props.movieObj.comment
                    ? ''
                    : 'tell us why you like this movie'
                }
                onChange={this.captureTypedInput}
              ></input>
              <Button
                className='commentBtn'
                type='submit'
                onClick={this.submitLocal}
              >
                save your comment to your LIST
              </Button>
            </Card.Body>
          ) : (
            ''
          )}
          {this.props.included ? (
            <Button
              variant='danger'
              className='removeBtn'
              onClick={() => this.props.remove(this.props.movieObj)}
            >
              REMOVE from Favorite Movies LIST
            </Button>
          ) : (
            <Button
              className='addBtn'
              onClick={() => this.props.add(this.props.movieObj)}
            >
              add to My Favorite Movies LIST
            </Button>
          )}
        </Card>
      </div>
    );
  }
}

export default Movie;
