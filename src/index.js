import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { shuffle, sample } from 'underscore';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import logger from 'redux-logger'


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AddAuthorForm from './AddAuthorForm';
import authors from './authors';

const getTurnData = (authors) => {
  const allBooks = authors.reduce((p, c, i) => {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some((title) => title === answer))
  }
}

// initial state
const initialState = {
  authors,
  turnData: getTurnData(authors),
  highlight: '',  
}

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });
    case 'CONTINUE':
      return Object.assign({}, state, { turnData: getTurnData(state.authors), highlight: '' });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, { authors: [...state.authors, action.author] });
    default:
      return state;
  }
}


// create store
let store = Redux.createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(logger), 
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </BrowserRouter>
  </ReactRedux.Provider>, document.getElementById('root')
);
registerServiceWorker();
