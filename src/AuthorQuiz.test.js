import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorQuiz from './AuthorQuiz';

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    author: {
      name: 'dsfsdfds',
      imageUrk: 'sdfdsf',
      imageSource: 'sdxcvxc',
      books: ['a', 'b', 'c']
    },
    books: ['b', 't', 'q']
  },
  highlight: 'none',
  onAnswerSelected: jest.fn()
}

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<AuthorQuiz {...state} />, div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} />);
    });

    it('should have no background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe("");
    });

    it('when the user select the first answer', () => {
      wrapper.find('.answer').first().simulate('click');
      expect(state.onAnswerSelected).toHaveBeenCalled();
      expect(state.onAnswerSelected).toHaveBeenCalledWith('b');
    });
  });
});