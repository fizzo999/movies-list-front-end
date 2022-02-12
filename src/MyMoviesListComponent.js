import React, { Component } from 'react';
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
      <>
        <div>{moviesComponentArray}</div>
      </>
    );
  }
}

export default MyMoviesListComponent;
