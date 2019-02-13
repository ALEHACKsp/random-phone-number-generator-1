import React from 'react';
import enzyme from 'enzyme';
import Home from '../home';

describe('Home Component', () => {
  let instance;
  let node;
  const props = {
    handleInputChange: jest.fn(),
    handlePageChange: jest.fn(),
    updatePhoneNumbers: jest.fn()
  };

  const updatePhoneNumbers = jest.fn();
  beforeEach(() => {
    node = enzyme.shallow(<Home {...props} onClick={updatePhoneNumbers} />);
    instance = node.instance();
  });

  it('should render properly', () => {
    expect(node).toMatchSnapshot();
  });

  it('handles input changes', () => {
    expect(
      node.find('[name="number"]').simulate('change', { target: { name: 'number', value: 6 } })
    );
  });

  it('should update stats for minimum and maximum', () => {
    node.setState({ phoneNumbers: ['0987609876', '0987654398'] });
    instance.getStatistics();
    const state = node.state();
    expect(state.total).toBe(2);
    expect(state.min).toBeDefined();
    expect(state.max).toBeDefined();
  });

  it('should test sorting PhoneNumbers', () => {
    node.setState({ sorter: 'desc', phoneNumbers: ['0787609876', '0787654389'] });
    instance.sortPhoneNumbers();
    const state = node.state();
    expect(state.phoneNumbers.length).toBeGreaterThan(1);
    expect(state.sorter).toBe('desc');
  });

  it('should call sortPhoneNumbers function', () => {
    node.setState({ phoneNumbers: ['0787609876', '0787654389'] });
    const event = {
      preventDefault: () => {},
      target: {
        value: 'asc'
      }
    };
    let spy;
    spy = jest.spyOn(instance, 'onSortChange');
    instance.onSortChange(event);
    const state = node.state();
    expect(state.sorter).toBe('asc');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('generates phones numbers when the button is clicked', () => {
    const generatePhoneSpy = jest.spyOn(node.instance(), 'updatePhoneNumbers');
    node
      .find('.my-button')
      .at(0)
      .simulate('click');
    expect(generatePhoneSpy).toHaveBeenCalled();
  });

  
});
