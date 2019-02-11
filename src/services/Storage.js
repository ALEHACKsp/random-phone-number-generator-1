const PHONE_NUMBER_KEY = 'PHONE_NUMBER_KEY';

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
    this.phoneNumbers.has(phoneNumber);
  }

  remove(phoneNumber) {
    this.phoneNumbers.delete(phoneNumber);
    this.persist();
  }

  persist() {
    setTimeout(() => {
      localStorage.setItem(PHONE_NUMBER_KEY, JSON.stringify([...this.phoneNumbers.values()]));
    }, 0);
  }
  all() {
    return this.phoneNumbers;
  }
  count() {
    return this.phoneNumbers.size;
  }
}

export default Storage;
