import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './style/App.css';
import Header from './components/Header.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';
import AboutMoviesList from './components/AboutMoviesListComponent.js';
import AboutMichellePannosch from './components/AboutMichellePannoschComponent.js';
import MovieResultsFromAPI from './components/MyMoviesListComponent.js';
import MyMoviesList from './components/StoredMoviesList.js';
import ApiLoadingModal from './components/Modal.js';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      error: false,
      loading: false,
      showModal: false,
      saving2List: false,
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false,
      myFavoriteMoviesList: [
        { title: 'firstSampleObject', hereIsFirstSampleObj: true },
      ],
    };
  }

  hoistInputFromMoviesForm = inputfromform => {
    this.setState({ searchInput: inputfromform, hasSearched: true });
    this.apiCallTMDB(inputfromform);
  };

  apiCallTMDB = async searchInput => {
    this.setState({ loading: true });
    let resultsFromServer = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/movies?movieName=${searchInput}`
    );
    this.setState({
      resultsFromServer: resultsFromServer.data,
      status: resultsFromServer.status,
    });
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  addToFavoriteMoviesLIST = movieObj => {
    if (!this.state.myFavoriteMoviesList.includes(movieObj)) {
      this.setState({
        saving2List: true,
        myFavoriteMoviesList: [...this.state.myFavoriteMoviesList, movieObj],
      });
      setTimeout(() => this.setState({ saving2List: false }), 3000);
    }
  };
  removeFromFavoriteMoviesLIST = movieObj => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    newFavoriteMoviesList = newFavoriteMoviesList.filter(
      item => item.title !== movieObj.title
    );
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  addComment = (comment, movieObj) => {
    let newFavoriteMoviesList = [...this.state.myFavoriteMoviesList];
    // console.log('newFavoriteMovieList before insertion', newFavoriteMoviesList);
    let indexOfMovie = newFavoriteMoviesList.indexOf(movieObj);
    let newMovieObj = { ...movieObj, comment: comment };
    newFavoriteMoviesList[indexOfMovie] = newMovieObj;
    // console.log('newFavoriteMovieList after insertion', newFavoriteMoviesList);
    this.setState({ myFavoriteMoviesList: newFavoriteMoviesList });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Form
                  hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}
                />
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
                    add={this.addToFavoriteMoviesLIST}
                    saving2List={this.state.saving2List}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                  />
                ) : (
                  ''
                )}
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
              />
            }
          />
        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
