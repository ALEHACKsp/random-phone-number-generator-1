import Storage from './Storage';

class PhoneNumber {
  constructor() {
    this.storage = new Storage();
  }

  generatePhoneNumber() {
    return '0' + Math.floor(Math.random() * 900000000 + 100000000)
  }

  generate(count) {
    const existingCount = this.storage.count();
    const newCount = count + existingCount;
    for (let i = 0; i < count; i++) {
      this.storage.add(this.generatePhoneNumber());
    }
    const availableCount = this.storage.count();
    if (availableCount < newCount) {
      this.generate(newCount - availableCount);
    }
  }
}

export default new PhoneNumber();
