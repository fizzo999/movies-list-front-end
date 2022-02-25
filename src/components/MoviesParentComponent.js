import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Form from './Form.js';
import ApiLoadingModal from './Modal.js';
import MovieResultsFromAPI from './MyMoviesListComponent.js';

import axios from 'axios';

export class MoviesParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      showModal: false,
      saving2List: false,
      hasSearched: false,
      resultsFromServer: this.props.resultsFromServer,
      status: null,
      movieResultsShowing: false,
      myFavoriteMoviesList: [],
      error: false,
      errorMessage: '',
      moviesDB: this.props.moviesDB,
    };
  }
  hoistInputFromMoviesForm = inputfromform => {
    if (inputfromform === '') {
      alert('Please enter a movie you d like to search for');
    } else {
      this.setState({
        searchInput: inputfromform,
        hasSearched: true,
        error: false,
        errorMessage: '',
      });
      this.apiCallTMDB(inputfromform);
    }
  };

  apiCallTMDB = async searchInput => {
    this.setState({ loading: true });
    try {
      let resultsFromServer = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/movies?movieName=${searchInput}`
      );
      if (resultsFromServer.status === 200) {
        this.setState({
          resultsFromServer: resultsFromServer.data,
          status: resultsFromServer.status,
        });
        this.props.hoistResultsFromAPI(resultsFromServer.data);
      }
    } catch (error) {
      console.log('we are inside of error catch');
      this.setState({
        error: true,
        errorMessage: `There was an error: ${error}`,
      });
    }
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  addToFavoriteMoviesLIST = movieObj => {
    if (
      !this.state.myFavoriteMoviesList.length ||
      !this.state.myFavoriteMoviesList.includes(movieObj)
    ) {
      this.setState({
        saving2List: true,
        myFavoriteMoviesList: [...this.state.myFavoriteMoviesList, movieObj],
      });
      setTimeout(() => this.setState({ saving2List: false }), 3000);
    }
  };

  addMovie = async movie => {
    try {
      let { user } = this.props.auth0;
      movie.email = user.email;
      console.log(
        'well here is this.props.moviesDB object with user email',
        this.props.moviesDB
      );
      let results = await this.props.makeAnyRequest('post', '/dbmovies', movie);
      if (results) {
        let newMoviesDB = [...this.props.moviesDB, results.data];
        console.log('successfully added ONE movie to DB !!!');
        this.props.hoistResultsFromDB(newMoviesDB);
      }
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  removeFromFavoriteMoviesLIST = movieObj => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    newFavoriteMoviesList = newFavoriteMoviesList.filter(
      item => item.title !== movieObj.title
    );
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <React.Fragment>
        {isAuthenticated && (
          <Form
            hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}
            user={user}
          />
        )}
        {this.state.loading ? (
          <ApiLoadingModal
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalHeaderText={'contacting IMDB'}
            modalLoadingText={'LOADING YOUR RESULTS'}
          />
        ) : (
          ''
        )}
        {this.state.resultsFromServer.length > 0 ? (
          <MovieResultsFromAPI
            results={this.state.resultsFromServer}
            add={this.addMovie}
            saving2List={this.state.saving2List}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

export default withAuth0(MoviesParentComponent);
