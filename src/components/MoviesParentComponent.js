import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Form from './Form.js';
import ApiLoadingModal from './Modal.js';
import AlertModal from './Modal.js';
import MovieResultsFromAPI from './MoviesList.js';

import axios from 'axios';

export class MoviesParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      showModal: false,
      saving2List: false,
      resultsFromServer: this.props.resultsFromServer,
      status: null,
      movieResultsShowing: false,
      // myFavoriteMoviesList: [],
      moviesDB: this.props.moviesDB,
      alertModal: false,
      hasSaved2List: false,
    };
  }
  hoistInputFromMoviesForm = inputfromform => {
    if (inputfromform === '') {
      alert('Please enter a movie you d like to search for');
    } else {
      this.setState({
        searchInput: inputfromform,
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
      console.log(error);
      this.props.hoistError(error);
    }
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  addMovie = async movie => {
    if (
      this.state.moviesDB.filter(
        eachMovie =>
          eachMovie.title === movie.title &&
          eachMovie.overview === movie.overview
      ).length === 0
    ) {
      this.setState({
        saving2List: true,
      });
      try {
        let { user } = this.props.auth0;
        movie.email = user.email;
        let results = await this.props.makeAnyRequest(
          'post',
          '/dbmovies',
          movie
        );
        if (results) {
          let newMoviesDB = [...this.props.moviesDB, results.data];
          this.props.hoistResultsFromDB(newMoviesDB);
        }
        setTimeout(
          () => this.setState({ saving2List: false, hasSaved2List: true }),
          3000
        );
        // window.location.href = `http://localhost:3000/myMoviesList`;
        // window.location.assign(`http://localhost:3000/myMoviesList`);
      } catch (error) {
        console.log(error);
        this.props.hoistError(error);
      }
    } else {
      console.log('we already have this !!!!============================');
      this.setState({ alertModal: true });
      setTimeout(() => this.setState({ alertModal: false }), 3000);
    }
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
        {this.state.alertModal ? (
          <AlertModal
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalHeaderText={'alert'}
            modalLoadingText={'YOU ALREADY HAVE THIS MOVIE IN YOUR LIST'}
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
        {/* the following <Navigate /> tag that comes from react-router-dom allows us to redirect the user to the list of db stored movies so user can see that the saving to db action was successful */}
        {this.state.hasSaved2List ? <Navigate to='/MoviesList' /> : ''}
      </React.Fragment>
    );
  }
}

export default withAuth0(MoviesParentComponent);
