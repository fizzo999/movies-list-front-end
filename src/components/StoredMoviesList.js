import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Movie from './Movie.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import UpdateMovieModal from './UpdateMovieModal.js';

class StoredMoviesList extends Component {
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
      // console.log(
      //   'here is the inital results from component did mount ========>>>>>>>>',
      //   results.data
      // );
      if (results && results.data.length > 0) {
        this.setState({
          moviesDB: results.data,
        });
        this.props.hoistResultsFromDB(results.data);
      } else if (results && results.data.length === 0) {
        await this.makeAnyRequest('get', '/seed');
        let results = await this.makeAnyRequest('get', '/dbmovies');
        this.setState({
          moviesDB: results.data,
        });
        this.props.hoistResultsFromDB(results.data);
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

  deleteMovie = async id => {
    try {
      let results = await this.makeAnyRequest('delete', `/dbmovies/${id}`, {});
      if (results) {
        let newMovieArray = this.state.moviesDB.filter(
          movie => movie._id !== results.data._id
        );
        this.props.hoistResultsFromDB(newMovieArray);
        this.setState({ moviesDB: newMovieArray });
      }
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  setMovieForModal = movie => {
    // console.log(
    //   'we are inside the setMovieForModal function inside of StoredMoviesList',
    //   movie
    // );
    if (movie) {
      this.setState({
        openModalToAddMovieComment: true,
        selectedMovie: movie,
      });
    }
  };

  updateMovie = async movieToUpdate => {
    console.log(
      'we made it up to StoredMoviesList - yay - and here is movieToUpdate',
      movieToUpdate
    );
    this.setState({
      openModalToAddMovieComment: false,
    });
    try {
      let results = await this.makeAnyRequest(
        'put',
        `/dbmovies/${movieToUpdate._id}`,
        movieToUpdate
      );
      console.log(
        'here are the results from updating the db as it came back from the server',
        results
      );
      let newMovieArray = this.state.moviesDB.map(movie =>
        movie._id === movieToUpdate._id ? movieToUpdate : movie
      );
      this.props.hoistResultsFromDB(newMovieArray);
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
    //   'inside storedMoviesList.js - and here is state for moviesDB',
    //   this.state.moviesDB
    // );
    let moviesComponentArray = [];
    if (this.state.moviesDB.length) {
      moviesComponentArray = this.state.moviesDB.map((movie, index) => {
        return (
          <Movie
            addComment={this.props.addComment}
            remove={this.props.remove}
            key={`db-movie-${index}`}
            deleteMovie={this.deleteMovie}
            movieObj={movie}
            included={true}
            setMovieForModal={this.setMovieForModal}
            openModalToAddMovieComment={this.state.openModalToAddMovieComment}
          />
        );
      });
    }
    return (
      <Container fluid>
        <React.Fragment>
          {this.state.moviesDB ? (
            this.state.openModalToAddMovieComment ? (
              <UpdateMovieModal
                updateMovie={this.updateMovie}
                selectedMovie={this.state.selectedMovie}
                openModal={() =>
                  this.setState({ openModalToAddMovieComment: true })
                }
                closeModal={() =>
                  this.setState({ openModalToAddMovieComment: false })
                }
              />
            ) : (
              <CardGroup>
                {moviesComponentArray}
              </CardGroup>
            )
          ) : (
            <h3>
              no movies in your LIST yet - go to home, search and click on add
              movies button
            </h3>
          )}
        </React.Fragment>
      </Container>
    );
  }
}

export default withAuth0(StoredMoviesList);
