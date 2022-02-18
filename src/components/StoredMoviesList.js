import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Movie from './Movie.js';

class StoredMoviesList extends Component {
  render() {
    let moviesComponentArray = [];
    let newFavoriteMovieList;
    if (this.props.list.length > 1) {
      newFavoriteMovieList = [...this.props.list];
      newFavoriteMovieList = newFavoriteMovieList.slice(1);
      console.log(
        'we are in StoredMoviesList and here is newFavoriteMovieList',
        newFavoriteMovieList
      );
      moviesComponentArray = newFavoriteMovieList.map((movie, index) => {
        return (
          <Movie
            key={`movie-${index}`}
            add={this.props.add}
            remove={this.props.remove}
            movieObj={movie}
            included={true}
            addComment={this.props.addComment}
          />
        );
      });
    }
    return (
      <Container>
        <CardGroup>
          <React.Fragment>
            {this.props.list.length > 1 ? (
              moviesComponentArray
            ) : (
              <h3>
                no movies in your LIST yet - go to home, search and click on add
                movies button
              </h3>
            )}
          </React.Fragment>
        </CardGroup>
      </Container>
    );
  }
}

export default StoredMoviesList;
