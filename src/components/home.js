import React from 'react';

import './__styles__/home.scss';
import PhoneNumber from 'services/PhoneNumber';
import Sorter from './sorter';
import DownloadPhoneNumbers from './downloadNumbers';
import MinMaxPhoneNumber from './minMax';

const phoneNumber = new PhoneNumber();
class Home extends React.Component {
  state = {
    phoneNumbers: [],
    currentPage: 1,
    phoneNumbersPerPage: 20,
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

  // handlePageChange = event => {
  //   this.setState({
  //     currentPage: Number(event.target.id)
  //   });
  // };

  updatePhoneNumbers = phoneNumbers => {
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
    const { phoneNumbers, phoneNumbersPerPage, number, min, max, total } = this.state;
    

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(phoneNumbers.length / phoneNumbersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="container mt-3">
        <section className="input-group">
          <input
            className="form-control"
            type="number"
            name="number"
            placeholder="Enter the number of phone numbers to be generated"
            value={number}
            onChange={this.handleInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn my-button"
              onClick={() => {
                phoneNumber.generate(+number);
                this.updatePhoneNumbers();
              }}
            >
              Generate Phone Numbers
            </button>
          </div>
        </section>
        <section>
          List of phone numbers
          <div className="card">
            <div className="card-body card-table">
              <div className="card-title in-line">
                <h5 className="text">
                  {phoneNumbers.length > phoneNumbersPerPage
                    ? `Showing ${phoneNumbersPerPage} out of ${total} phone numbers`
                    : null}
                </h5>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#!" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {pageNumbers.map(number => (
                <li className="page-item" key={number} id={number} onClick={this.handlePageChange}>
                  <a className="page-link" href="#!">
                    {number}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" href="#!" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}
export default Home;
