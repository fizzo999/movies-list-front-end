import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Form from './Form.js';

export class MoviesParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      showModal: false,
      saving2List: false,
      hasSearched: false,
      resultsFromServer: [],
      status: null,
      movieResultsShowing: false,
      myFavoriteMoviesList: [],
      error: false,
      errorMessage: '',
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
      </React.Fragment>
    );
  }
}

export default withAuth0(MoviesParentComponent);
