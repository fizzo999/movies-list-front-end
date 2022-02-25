import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Movie from './Movie.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class StoredMoviesList extends Component {
  // ADD THE EMAIL ADDRESS INTO STATE AND USE IT FOR EVERY REQUEST ???

  // ADD JWT TOKEN TO EVERY REQUEST ????

  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      moviesDB: this.props.moviesDB,
      error: false,
      errorMessage: '',
      selectedMovie: {},
      openModalToAddMovieComment: false,
    };
  }

  makeAnyRequest = async (method, url, obj = {}) => {
    try {
      let config = await this.props.retrieveJWTToken();
      config.url = url;
      config.method = method;
      config.data = obj;
      const serverResponse = await axios(config);
      if (serverResponse) {
        return serverResponse;
      }
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  componentDidMount = async () => {
    try {
      let results = await this.makeAnyRequest('get', '/dbmovies');
      console.log(
        'here is the inital results from component did mount ========>>>>>>>>',
        results.data
      );
      if (results) {
        this.setState({
          moviesDB: results.data,
        });
        this.props.hoistResultsFromDB(results.data);
        // do we need to hoist the movies into state of App as well ??? since the add movie button is inside of app ????
      }
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  openCloseModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  // addMovie = async movie => {
  //   try {
  //     let results = await this.makeAnyRequest('post', '/dbmovies');
  //     if (results) {
  //       console.log('successfully added ONE movie to DB !!!');
  //       this.setState({
  //         moviesDB: [...this.state.moviesDB, results.data],
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.props.hoistError(error);
  //   }
  // };

  deleteMovie = async id => {
    try {
      let results = await this.makeAnyRequest('/delete', `/dbmovies/${id}`, {});
      if (results) {
        console.log(
          'here is the deleted movie obj response from the server',
          results.data
        );
        // HAVE TO MAKE SURE THAT THE MOVIE OBJ CONTAINS AN ID FIELD AND THAT IT IS _ID AND NOT ID  ??????
        let newMovieArray = this.state.moviesDB.filter(
          movie => movie._id !== results.data._id
        );
        this.setState({ moviesDB: newMovieArray });
      }
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  setMovieForModal = movie => {
    if (movie) {
      this.setState({
        selectedMovie: movie,
      });
    }
  };

  updateMovie = async movieToUpdate => {
    this.openCloseModal();
    try {
      let results = await this.makeAnyRequest(
        'put',
        `/dbmovies/:${movieToUpdate._id}`,
        movieToUpdate
      );
      console.log(
        'here are the results from updating the db as it came back from the server',
        results
      );
      let newMovieArray = this.state.moviesDB.map(movie =>
        movie._id === movieToUpdate._id ? movieToUpdate : movie
      );
      this.setState({
        moviesDB: newMovieArray,
      });
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  render() {
    // console.log(
    //   'inside storedMoviesList.js - and here is state',
    //   this.state.moviesDB
    // );
    let moviesComponentArray = [];
    // let newFavoriteMovieList;
    if (this.state.moviesDB.length) {
      // if (this.state.moviesDB.length > 1) {
      //   newFavoriteMovieList = [...this.state.moviesDB];
      //   newFavoriteMovieList = newFavoriteMovieList.slice(1);
      //   console.log(
      //     'we are in StoredMoviesList and here is newFavoriteMovieList',
      //     newFavoriteMovieList
      //   );
      //   moviesComponentArray = newFavoriteMovieList.map((movie, index) => {
      moviesComponentArray = this.state.moviesDB.map((movie, index) => {
        return (
          <Movie
            key={`db-movie-${index}`}
            // add={this.props.add}
            remove={this.props.remove}
            movieObj={movie}
            included={true}
            addComment={this.props.addComment}
            setMovieForModal={this.setMovieForModal}
          />
        );
      });
    }
    return (
      <Container fluid>
        <CardGroup>
          <React.Fragment>
            {this.state.moviesDB ? (
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

export default withAuth0(StoredMoviesList);
