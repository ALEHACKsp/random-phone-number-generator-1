import { resolve } from 'url';

export const PHONE_NUMBER_KEY = 'PHONE_NUMBER_KEY';

class Storage {
  constructor() {
    const numbers = JSON.parse(window.localStorage.getItem(PHONE_NUMBER_KEY)) || [];
    this.phoneNumbers = new Set(numbers);
  }

  add(phoneNumber) {
    this.phoneNumbers.add(phoneNumber);
    this.persist();
    return this.phoneNumbers;
  }

  exists(phoneNumber) {
    return this.phoneNumbers.has(phoneNumber);
  }

  remove(phoneNumber) {
    this.phoneNumbers.delete(phoneNumber);
    this.persist();
  }

  persist() {
    return new Promise(resolve => {
      localStorage.setItem(PHONE_NUMBER_KEY, JSON.stringify([...this.phoneNumbers.values()]));
      resolve();
    });
  }
  all() {
    return this.phoneNumbers;
  }
  count() {
    return this.phoneNumbers.size;
  }
}

export default Storage;
