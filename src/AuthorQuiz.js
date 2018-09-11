import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
  </div>
  );
};

const Book = ({title, onClick}) => {
  return (
    <div className="answer" onClick={() => { onClick(title); }}>
      <h4>{title}</h4>
    </div>
  );
};

const Turn = ({author, books, highlight, onAnswerSelected}) => {

  const hightlightToBgColor = (highlight) => {
    const mappings = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    }

    return mappings[highlight];
  }

  return (
    <div className="row turn" style={{backgroundColor: hightlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author"/>
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}></Book>)}
      </div>
    </div>
  );
};

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
    { show 
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
      : null }
    </div>
  );
}

const Footer = () => {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="http://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
        </p>
      </div>
    </div>
  );
}

class AuthorQuiz extends React.Component {
  render() {
    const {
      turnData,
      highlight,
      onAnswerSelected,
      onContinue,
    } = this.props;
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p>
          <Link to="/add">Add an Author</Link>
        </p>
        <Footer />
      </div>
    );
  }
}

export default AuthorQuiz;