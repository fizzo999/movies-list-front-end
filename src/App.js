import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import './style/App.css';

import MoviesParentComponent from './components/MoviesParentComponent.js';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import AboutMoviesList from './components/AboutMoviesListComponent.js';
import AboutMichellePannosch from './components/AboutMichellePannoschComponent.js';
import MyMoviesList from './components/StoredMoviesList.js';
import Alert from './components/Alert.js';

import axios from 'axios';
import LoginModal from './components/LoginModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: true,
      error: false,
      errorMessage: '',
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false,
      moviesDB: [],
      user: null,
    };
  }

  retrieveJWTToken = async () => {
    try {
      let { getIdTokenClaims } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      let jwt = tokenClaims.__raw;
      let config = {
        headers: { Authorization: `Bearer ${jwt}` },
        baseURL: process.env.REACT_APP_BACKEND_SERVER,
      };
      return config;
    } catch (error) {
      console.log(error);
      this.props.hoistError(error);
    }
  };

  makeAnyRequest = async (method, url, obj = {}) => {
    try {
      let config = await this.retrieveJWTToken();
      config.method = method;
      config.url = url;
      config.data = obj;
      const serverResponse = await axios(config);
      if (serverResponse) {
        return serverResponse;
      }
    } catch (error) {
      console.log(error);
      this.hoistError(error);
    }
  };

  hoistError = error => {
    this.setState({
      error: true,
      errorMessage: `There was an error: ${error}`,
    });
  };

  hoistResultsFromAPI = resultsArray => {
    this.setState({
      error: false,
      errorMessage: '',
      resultsFromServer: resultsArray,
    });
  };
  hoistResultsFromDB = resultsArray => {
    this.setState({
      error: false,
      errorMessage: '',
      moviesDB: resultsArray,
    });
  };

  addComment = (comment, movieObj) => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    let indexOfMovie = newFavoriteMoviesList.indexOf(movieObj);
    let newMovieObj = { ...movieObj, comment: comment };
    newFavoriteMoviesList[indexOfMovie] = newMovieObj;
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  loginUser = userFromLogoutBtn => {
    this.setState({ user: userFromLogoutBtn });
  };

  logoutUser = () => {
    console.log('we are loggin OUT the user:', this.state.user);
    this.setState({ user: null });
  };

  render() {
    const { isAuthenticated } = this.props.auth0;
    if (!isAuthenticated) {
      return (
        <LoginModal
          openModal={() => this.setState({ loginModal: true })}
          closeModal={() => this.setState({ loginModal: false })}
        />
      );
    } else {
      return (
        <React.Fragment>
          <Header
            loginUser={this.loginUser}
            logoutUser={this.logoutUser}
            isAuthenticated={isAuthenticated}
          />
          {this.state.error ? (
            <Alert alertMessage={this.state.errorMessage} />
          ) : (
            ''
          )}

          <Routes>
            <Route
              path='/'
              element={
                <>
                  <MoviesParentComponent
                    hoistResultsFromAPI={this.hoistResultsFromAPI}
                    resultsFromServer={this.state.resultsFromServer}
                    makeAnyRequest={this.makeAnyRequest}
                    hoistResultsFromDB={this.hoistResultsFromDB}
                    moviesDB={this.state.moviesDB}
                  />
                </>
              }
            />

            <Route path='/aboutMoviesList' element={<AboutMoviesList />} />

            <Route
              path='/aboutMichellePannosch'
              element={<AboutMichellePannosch />}
            />

            <Route
              path='/myMoviesList'
              element={
                <MyMoviesList
                  moviesDB={this.state.moviesDB}
                  // add={this.addToFavoriteMoviesLIST}
                  remove={this.removeFromFavoriteMoviesLIST}
                  addComment={this.addComment}
                  hoistError={this.hoistError}
                  makeAnyRequest={this.makeAnyRequest}
                  retrieveJWTToken={this.retrieveJWTToken}
                  hoistResultsFromDB={this.hoistResultsFromDB}
                />
              }
            />
          </Routes>
          <Footer />
        </React.Fragment>
      );
    }
  }
}

export default withAuth0(App);
