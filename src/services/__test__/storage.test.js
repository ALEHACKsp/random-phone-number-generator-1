import Storage, { PHONE_NUMBER_KEY } from '../Storage';

jest.useFakeTimers();

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('it adds a phone number', () => {
    const storage = new Storage();
    const phoneNumber = '0772742016';
    storage.add(phoneNumber);

    expect(storage.count()).toEqual(1);
    expect(storage.phoneNumbers.has(phoneNumber)).toBeTruthy();
  });

  it('it determines if a phone number exists', () => {
    const storage = new Storage();
    const phoneNumber = '0772742016';
    storage.add(phoneNumber);

    expect(storage.exists(phoneNumber)).toBeTruthy();
  });

  it('removes a phone number from existing phone numbers', () => {
    const storage = new Storage();
    const phoneNumber = '0772742016';

    storage.add(phoneNumber);
    storage.remove(phoneNumber);
    expect(storage.exists(phoneNumber)).toBeFalsy();
  });
  it('returns all phone numbers', () => {
    const storage = new Storage();
    storage.add('0772742016');
    storage.add('0772742018');
    expect(storage.all()).toEqual(new Set(['0772742016', '0772742018']));
  });
  it("I doesn't add a new phone number if  it already exists", () => {
    const storage = new Storage();
    storage.add('0772742016');
    storage.add('0772742016');
    storage.add('0772742016');
    expect(storage.count()).toEqual(1);
  });

  it('persists the phone numbers in local storage', async () => {
    const storage = new Storage();
    await storage.add('0772742016');
    expect(localStorage.length).toEqual(1);
  });
});
