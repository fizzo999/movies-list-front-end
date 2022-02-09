import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchInput:'',
      error: false,
      loading: false,
      hasSearched: false
    };
  }
  hoistInputFromMoviesForm = (e) => {
    e.preventDefault();
    this.setState({searchInput: e.target.value, hasSearched: true});
  };
  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes >
          <Route path="/"element={<Form hoistInputFromMoviesForm={this.hoistInputFromMoviesForm}/>}/>

          <Route path="/aboutMoviesList" element={<aboutMoviesListComponent/>}/>

          <Route path="/aboutMichelleRossee"element={<aboutMichelleRosseeComponent/>}/>

          <Route path="/myMoviesList"element={<myMoviesListComponent toggleLoading={this.toggleLoading}/>}/>

        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
