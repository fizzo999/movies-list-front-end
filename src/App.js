import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import './style/App.css';

import MoviesParentComponent from './components/MoviesParentComponent.js';

import Header from './components/Header.js';
// import Form from './components/Form.js';
import Footer from './components/Footer.js';
import AboutMoviesList from './components/AboutMoviesListComponent.js';
import AboutMichellePannosch from './components/AboutMichellePannoschComponent.js';
// import MovieResultsFromAPI from './components/MyMoviesListComponent.js';
import MyMoviesList from './components/StoredMoviesList.js';
// import ApiLoadingModal from './components/Modal.js';
import Alert from './components/Alert.js';

// import axios from 'axios';
import LoginButton from './components/LoginButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      saving2List: false,
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false,
      myFavoriteMoviesList: [],
      user: null,
    };
  }

  // retrieveJWTToken = async () => {
  //   try {
  //     let { getIdTokenClaims } = this.props.auth0;
  //     let tokenClaims = await getIdTokenClaims();
  //     let jwt = tokenClaims.__raw;
  //     let config = {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //       baseURL: process.env.REACT_APP_BACKEND_SERVER,
  //     };
  //     return config;
  //   } catch (error) {
  //     this.setState({
  //       error: true,
  //       errorMessage: `There was an error: ${error}`,
  //     });
  //   }
  // };

  // hoistInputFromMoviesForm = inputfromform => {
  //   if (inputfromform === '') {
  //     alert('Please enter a movie you d like to search for');
  //   } else {
  //     this.setState({
  //       searchInput: inputfromform,
  //       hasSearched: true,
  //       error: false,
  //       errorMessage: '',
  //     });
  //     this.apiCallTMDB(inputfromform);
  //   }
  // };

  hoistError = error => {
    this.setState({
      error: true,
      errorMessage: `There was an error with the database action: ${error}`,
    });
  };

  hoistResultsFromAPI = resultsArray => {
    this.setState({
      error: false,
      errorMessage: '',
      resultsFromServer: resultsArray,
    });
  };

  // apiCallTMDB = async searchInput => {
  //   this.setState({ loading: true });
  //   try {
  //     let resultsFromServer = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_SERVER}/movies?movieName=${searchInput}`
  //     );
  //     if (resultsFromServer.status === 200) {
  //       this.setState({
  //         resultsFromServer: resultsFromServer.data,
  //         status: resultsFromServer.status,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('we are inside of error catch');
  //     this.setState({
  //       error: true,
  //       errorMessage: `There was an error: ${error}`,
  //     });
  //   }
  //   setTimeout(() => this.setState({ loading: false }), 1000);
  // };

  // addToFavoriteMoviesLIST = movieObj => {
  //   if (
  //     !this.state.myFavoriteMoviesList.length ||
  //     !this.state.myFavoriteMoviesList.includes(movieObj)
  //   ) {
  //     this.setState({
  //       saving2List: true,
  //       myFavoriteMoviesList: [...this.state.myFavoriteMoviesList, movieObj],
  //     });
  //     setTimeout(() => this.setState({ saving2List: false }), 3000);
  //   }
  // };
  // removeFromFavoriteMoviesLIST = movieObj => {
  //   let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
  //   newFavoriteMoviesList = newFavoriteMoviesList.filter(
  //     item => item.title !== movieObj.title
  //   );
  //   this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  // };

  addComment = (comment, movieObj) => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    // console.log('newFavoriteMovieList before insertion', newFavoriteMoviesList);
    let indexOfMovie = newFavoriteMoviesList.indexOf(movieObj);
    let newMovieObj = { ...movieObj, comment: comment };
    newFavoriteMoviesList[indexOfMovie] = newMovieObj;
    // console.log('newFavoriteMovieList after insertion', newFavoriteMoviesList);
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  // openModal = () => {
  //   this.setState({ showModal: true });
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false });
  // };

  loginUser = userFromLogoutBtn => {
    this.setState({ user: userFromLogoutBtn });
    console.log(
      'App - inside of loginUser method and the user in state now is: ',
      userFromLogoutBtn
    );
  };

  logoutUser = () => {
    console.log('we are loggin OUT the user:', this.state.user);
    this.setState({ user: null });
  };

  // makeRequest = async () => {
  //   if (this.props.auth0.isAuthenticated) {
  //     const results = await this.props.auth0.getIdTokenClaims();
  //     const jwt = results.__raw;
  //     console.log('here is jwt token', jwt);
  //     const config = {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //       method: 'get',
  //       baseURL: process.env.REACT_APP_BACKEND_SERVER,
  //       url: '/login-test',
  //     };

  //     try {
  //       const axiosResults = await axios(config);
  //       console.log(
  //         'here is the results from our test request <<<<<<<<=========',
  //         axiosResults.data
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  render() {
    const { isAuthenticated } = this.props.auth0;
    // const { user, isAuthenticated } = this.props.auth0;
    if (!isAuthenticated) {
      return (
        <div className='loginButtonStartpage'>
          <h1>welcome to favorite movies LIST APP</h1>
          <h2>Please log in to use this APP - we will never share your info</h2>
          <h2>secure authentication is provided by auth0</h2>
          <LoginButton />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Header
            loginUser={this.loginUser}
            logoutUser={this.logoutUser}
            isAuthenticated={isAuthenticated}
          />
          {/* <div className='testButton'>
            <button onClick={this.makeRequest}>click me to test</button>
          </div> */}
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
                  />
                  {/* <Form
                    hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}
                    user={user}
                  /> */}
                  {/* {this.state.loading ? (
                    <ApiLoadingModal
                      openModal={this.openModal}
                      closeModal={this.closeModal}
                      modalHeaderText={'contacting IMDB'}
                      modalLoadingText={'LOADING YOUR RESULTS'}
                    />
                  ) : (
                    ''
                  )} */}
                  {/* {this.state.resultsFromServer.length > 0 ? (
                    <MovieResultsFromAPI
                      results={this.state.resultsFromServer}
                      add={this.addToFavoriteMoviesLIST}
                      saving2List={this.state.saving2List}
                      openModal={this.openModal}
                      closeModal={this.closeModal}
                    />
                  ) : (
                    ''
                  )} */}
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
                  list={this.state.myFavoriteMoviesList}
                  add={this.addToFavoriteMoviesLIST}
                  remove={this.removeFromFavoriteMoviesLIST}
                  addComment={this.addComment}
                  hoistError={this.hoistError}
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
