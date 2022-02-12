import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import AboutMoviesList from './AboutMoviesListComponent.js';
import AboutMichellePannosch from './AboutMichellePannoschComponent.js';
import MyMoviesList from './MyMoviesListComponent.js';

import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchInput:'',
      error: false,
      loading: false,
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false
    };
  }

  hoistInputFromMoviesForm = (inputfromform) => {
    this.setState({searchInput: inputfromform, hasSearched: true});
    // console.log('we are inside of App and here is inputfromform', inputfromform);
    this.apiCallTMDB(inputfromform);
  };

  apiCallTMDB = async (searchInput) => {
    let resultsFromServer = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/movies?movieName=${searchInput}`);
    console.log('hurray we contacted the server and here is what she said:', resultsFromServer);
    this.setState({resultsFromServer: resultsFromServer.data, status: resultsFromServer.status});
  };

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Header />
        <Routes >
          <Route path="/"element={
            <>
              <Form hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}/>
              {(this.state.resultsFromServer.length > 0) ? <MyMoviesList results={this.state.resultsFromServer}/> : ''}
            </>
          }/>

          <Route path="/aboutMoviesList" element={<AboutMoviesList/>}/>

          <Route path="/aboutMichellePannosch"element={<AboutMichellePannosch/>}/>

          <Route path="/myMoviesList"element={<MyMoviesList results={this.state.resultsFromServer} toggleLoading={this.toggleLoading}/>}/>

        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
