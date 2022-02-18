import React from 'react';
import Container from 'react-bootstrap/Container';
import '../style/Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSearch: '',
      searchResults: [],
    };
  }
  handleChange = e => {
    const userInput = e.target.value;
    this.setState({ movieSearch: userInput });
    this.renderUserInput(userInput);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ movieSearch: e.target.moviesinput.value });
    this.props.hoistInputFromMoviesForm(e.target.moviesinput.value);
  };

  renderUserInput = userInput => {
    const userInputRender2Page = document.getElementById('user-input');
    userInputRender2Page.innerText = userInput;
    if (!userInput)
      userInputRender2Page.innerText = 'the search field is empty right now';
  };
  render() {
    return (
      <Container fluid='md' maxwidth='sm'>
        <h3>Form</h3>
        <h3>
          what we are currently searching for:{' '}
          <span id='user-input'>nothing yet</span>
        </h3>
        <br />
        <br />
        <form id='movies-search-form' onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>
              Please type a search term in the input field to look for movies
            </legend>
            {/* <label htmlFor='movies-input'>enter your movie search here</label>
            <br /> */}
            <input
              type='text'
              id='movies-input'
              name='moviesinput'
              onChange={this.handleChange}
            ></input>
            <br />
            <button type='submit'>click here to search for movies</button>
          </fieldset>
        </form>
      </Container>
    );
  }
}

export default Form;
