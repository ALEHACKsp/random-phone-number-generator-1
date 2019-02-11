import React from 'react';
import enzyme from 'enzyme';
import Download from '../downloadNumbers';

describe('Home Component', () => {
  const data = ['0888680678,0733292751,0309651481,0726660825'];

  it('should render properly', () => {
    const node = enzyme.shallow(<Download data={data} />);
    expect(node.find('CSVLink')).toHaveLength(1);
  });

  it('Download button gets expected data', () => {
    const node = enzyme.mount(<Download data={data} />);
    const csvLink = node.find('CSVLink');
    expect(csvLink.props().data).toEqual([
      { data: ['0888680678,0733292751,0309651481,0726660825'] }
    ]);
  });
});
