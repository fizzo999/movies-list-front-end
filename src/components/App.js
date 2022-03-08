import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import '../style/App.css';

import MoviesParentComponent from './MoviesParentComponent.js';

import Header from './Header.js';
import Footer from './Footer.js';
import About from './About.js';
import Alert from './Alert.js';
import AboutMichellePannosch from './AboutMichellePannosch.js';
import StoredMoviesList from './StoredMoviesList.js';

import LoginModal from './LoginModal';
import axios from 'axios';

class App extends Component {
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
      console.log('here is TOKEN ===========>>>>>>>>>>>>', jwt);
      let config = {
        headers: { Authorization: `Bearer ${jwt}` },
        baseURL: process.env.REACT_APP_BACKEND_SERVER,
      };
      return config;
    } catch (error) {
      console.log(error);
      this.hoistError(error);
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

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
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
                    hoistError={this.hoistError}
                  />
                </>
              }
            />

            <Route path='/about' element={<About />} />

            <Route path='/aboutMichellePannosch' element={<AboutMichellePannosch />} />

            <Route
              path='/MoviesList'
              element={
                <StoredMoviesList
                  moviesDB={this.state.moviesDB}
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
