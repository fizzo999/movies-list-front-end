import React, { Component } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
// import Row from 'react-bootstrap/Row';
import Movie from './Movie.js';

class MyMoviesListComponent extends Component {
  render() {
    let moviesComponentArray = [];
    if (this.props.results.length > 0) {
      moviesComponentArray = this.props.results.map((movie, index) => {
        return (
          <Movie
            key={`movie-${index}`}
            add={this.props.add}
            movieObj={movie}
            saving2List={this.props.saving2List}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        );
      });
    }
    return (

      <CardGroup>
        {moviesComponentArray}
      </CardGroup>

    );
  }
}

export default MyMoviesListComponent;
