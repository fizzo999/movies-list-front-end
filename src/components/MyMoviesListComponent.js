import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Movie from './Movie.js';

class MyMoviesListComponent extends Component {
  render() {
    let moviesComponentArray = [];
    if (this.props.results.length > 0) {
      moviesComponentArray = this.props.results.map((movie, index) => {
        return (
          <Movie
            key={`movie-${index}`}
            title={movie.title}
            overview={movie.overview}
            average_votes={movie.average_votes}
            total_votes={movie.total_votes}
            image_url={movie.image_url}
            popularity={movie.popularity}
            released_on={movie.released_on}
          />
        );
      });
    }
    return (
      <Container>
        <CardGroup>
          <React.Fragment>{moviesComponentArray}</React.Fragment>
        </CardGroup>
      </Container>
    );
  }
}

export default MyMoviesListComponent;
