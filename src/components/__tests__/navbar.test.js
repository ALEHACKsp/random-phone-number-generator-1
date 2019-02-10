import React from 'react';
import enzyme from 'enzyme';
import Navbar from '../navbar';

describe('Home Component', () => {
  it('should render properly', () => {
    const node = enzyme.shallow(<Navbar />);
    expect(node).toMatchSnapshot();
  });
});
