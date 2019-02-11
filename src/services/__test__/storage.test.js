import Storage from '../Storage';
jest.mock('../Storage.js');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Storage.mockClear();
});
describe('Storage', () => {
  it('check that methods is not called', () => {
    expect(Storage).not.toHaveBeenCalled();
  });
});
