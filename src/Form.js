import React from 'react';

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
    // console.log('here is the userInput from state', userInput);
    this.renderUserInput(userInput);
  };

  renderUserInput = userInput => {
    const userInputRender2Page = document.getElementById('user-input');
    userInputRender2Page.innerText = userInput;
    if (!userInput)
      userInputRender2Page.innerText =
        'well the minimum s gotta b something here, right ?';
  };
  render() {
    return (
      <>
        <h3>Form</h3>
        <h3>
          and here is just a reminder of what you typed and what we are
          currently searching for ....
        </h3>
        <p id='user-input'>nothing yet</p>
        <form id='movies-search-form'>
          <label htmlFor='movies-input'>type your input here</label>
          <input
            type='text'
            id='movies-input'
            name='movies-input'
            onChange={this.handleChange}
          ></input>
          <button type='submit'>click here to search for movies</button>
        </form>
      </>
    );
  }
}

export default Form;
