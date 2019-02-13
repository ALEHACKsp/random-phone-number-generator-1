import React from 'react';

import './__styles__/home.scss';
import PhoneNumber from 'services/PhoneNumber';
import Sorter from './sorter';
import DownloadPhoneNumbers from './downloadNumbers';
import MinMaxPhoneNumber from './minMax';
import Error from './error';

const phoneNumber = new PhoneNumber();
class Home extends React.Component {
  state = {
    phoneNumbers: [],
    number: '',
    sorter: 'asc',
    min: null,
    max: null,
    total: 0
  };

  sortPhoneNumbers = () => {
    const { sorter, phoneNumbers } = this.state;
    if (!phoneNumbers.length > 0) return;
    if (sorter === 'asc') {
      this.setState({
        phoneNumbers: phoneNumbers.sort((a, b) => 0 - (a > b ? -1 : 1))
      });
    } else {
      this.setState({
        phoneNumbers: phoneNumbers.sort((a, b) => 0 - (a > b ? 1 : -1))
      });
    }
  };

  onSortChange = event => {
    event.preventDefault();
    const sorter = event.target.value;
    this.setState(
      {
        sorter
      },
      () => this.sortPhoneNumbers()
    );
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  generatePhones = () => {
    const { number } = this.state;
    if (!number) {
      this.setState({
        error: true,
        message: 'Enter a number please'
      });
    } else if (number <= 0 || number > 10000) {
      this.setState({
        error: true,
        message: 'The number entered exceeds/below the accepted limit'
      });
    } else {
      phoneNumber.generate(+number);
    }
  };
  updatePhoneNumbers = () => {
    const phoneNumber = new PhoneNumber();
    return this.setState({ phoneNumbers: [...phoneNumber.storage.all().values()] }, async () => {
      await this.getStatistics();
    });
  };
  componentDidMount() {
    this.updatePhoneNumbers();
    this.getStatistics();
  }

  getStatistics = () => {
    const { phoneNumbers } = this.state;
    if (phoneNumbers.length > 0) {
      const min = Math.min(...phoneNumbers);
      const max = Math.max(...phoneNumbers);
      const total = this.state.phoneNumbers.length;
      this.setState({
        min,
        max,
        total
      });
    }
  };

  render() {
    const { phoneNumbers, number, min, max, total, error, message } = this.state;
    const difference = 10000 - total;

    return (
      <div className="container mt-3">
        <section className="input-group">
          <input
            className="form-control"
            type="number"
            name="number"
            placeholder={`You can only generate ${difference} phone numbers, so as not to exceed the limit`}
            value={number}
            onChange={this.handleInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn my-button"
              onClick={() => {
                total > 10000
                  ? this.setState({
                      error: true,
                      message: 'You are trying to exceed the accepted limit, remove some'
                    })
                  : this.generatePhones();
                this.updatePhoneNumbers();
              }}
            >
              Generate Phone Numbers
            </button>
          </div>
        </section>
        <Error error={error} message={message} />
        <section>
          List of phone numbers
          <div className="card">
            <div className="card-body card-table">
              <div className="card-title in-line">
                <Sorter phoneNumbers={phoneNumbers} onChange={this.onSortChange} />
                {phoneNumbers.length > 0 ? <DownloadPhoneNumbers data={phoneNumbers} /> : null}
              </div>
              <div className="stats">
                <MinMaxPhoneNumber phoneNumbers={phoneNumbers} min={min} max={max} total={total} />
              </div>
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneNumbers.length > 0 ? (
                    phoneNumbers.map((phoneNumber, index) => (
                      <tr key={phoneNumber}>
                        <td>{++index}.</td>
                        <td>{phoneNumber}</td>
                      </tr>
                    ))
                  ) : (
                    <span style={{ padding: '10px' }}>No phone numbers yet, generate some</span>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
