import PhoneNumber from '../PhoneNumber';

function* duplicateGenerator() {
  for (let i of [1, 1, 2, 1, 3, 4, 2, 5]) {
    yield i;
  }
}

const generator = duplicateGenerator();

describe('Phone Number', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('generates a random phone number', () => {
    const phoneNumber = new PhoneNumber();
    expect(phoneNumber.generatePhoneNumber()).toHaveLength(10);
  });

  it('generates a couple of phone numbers', async () => {
    const phoneNumber = new PhoneNumber();
    await phoneNumber.generate(2);
    expect(phoneNumber.storage.count()).toEqual(2);
  });
  it('gives the required count even when there are duplicates', () => {
    const phoneNumber = new PhoneNumber();
    phoneNumber.generatePhoneNumber = () => generator.next().value;
    phoneNumber.generate(3)
    expect(phoneNumber.storage.all()).toEqual(new Set([1,2,3]))
  });
});
