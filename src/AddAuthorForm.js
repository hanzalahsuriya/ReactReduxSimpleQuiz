import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddAuthorForm.css';

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: '',
    }

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAddAuthor } = this.props;
    onAddAuthor(this.state);
  }

  handleAddBook = (event) => {
    event.preventDefault();
    const { books, bookTemp } = this.state;
    if (bookTemp) {
      const existingBook = books.find((book) => book === bookTemp);
      if (!existingBook) {
        const updatedBooks = [...books, bookTemp];
        this.setState({ books: updatedBooks, bookTemp: '' })
      }
    }
  };

  render() {
    const { name, imageUrl, books, bookTemp } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">
            Name
          </label>
          <input type="text" name="name" value={name} onChange={this.onFieldChange} />
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="imageUrl">
            Image Url
          </label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={this.onFieldChange} />
        </div>
        <div className="AddAuthorForm__input">
        <label htmlFor="bookTemp">Books</label>
          {books.map((book) => (<p key={book}>
            {book}
          </p>))}
          <input type="text" name="bookTemp" value={bookTemp} onChange={this.onFieldChange} />
          <input type="button" value="+" onClick={this.handleAddBook}></input>
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
}


const AddAuthorForm = ({ onAddAuthor }) => (
  <div className="AddAuthorForm">
    <h1>Add Author</h1>
    <AuthorForm onAddAuthor={onAddAuthor} />
  </div>
)

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: ((author) => {
      dispatch({ type: 'ADD_AUTHOR', author });
      props.history.push('/');
    }),
  }
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));
