import React from 'react';
import enzyme from 'enzyme';
import Home from '../home';

describe('Home Component', () => {
  const props = {
    handleInputChange: jest.fn(),
    handlePageChange: jest.fn(),
    updatePhoneNumbers: jest.fn()
  };
  it('should render properly', () => {
    const node = enzyme.shallow(<Home {...props} />);
    expect(node).toMatchSnapshot();
  });

  it('handles input changes', () => {
    const node = enzyme.mount(<Home {...props} />);
    console.log(node.debug())
    expect(node.find('[name="number"]').simulate('change', { target: { name: 'number', value: 6 } }));
    
  });
});
