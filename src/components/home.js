import React from 'react';
import './__styles__/home.scss';
import PhoneNumber from 'services/PhoneNumber';

class Home extends React.Component {
  state = {
    phoneNumbers: [],
    currentPage: 1,
    phoneNumbersPerPage: 20,
    number: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePageChange = event => {
    this.setState({
      currentPage: Number(event.target.id + 1)
    });
  };

  updatePhoneNumbers = phoneNumbers => {
    this.setState({ phoneNumbers: [...PhoneNumber.storage.all().values()] });
  };
  componentDidMount() {
    this.updatePhoneNumbers();
    this.setState({ count: this.state.phoneNumbers.length });
  }

  render() {
    const count = this.state.phoneNumbers.length;
    const { phoneNumbers, currentPage, phoneNumbersPerPage, number } = this.state;

    // Logic for displaying phone numbers
    const indexOfLastPhoneNumber = currentPage * phoneNumbersPerPage;
    const indexOfFirstPhonenumbers = indexOfLastPhoneNumber - phoneNumbersPerPage;
    const currentPhoneNumbers = phoneNumbers.slice(
      indexOfFirstPhonenumbers,
      indexOfLastPhoneNumber
    );

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
                PhoneNumber.generate(number);
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
              <h5 className="card-title">
                {phoneNumbers.length > phoneNumbersPerPage
                  ? `Showing ${phoneNumbersPerPage} out of ${count} phone numbers
              `
                  : null}
              </h5>
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.phoneNumbers
                    ? currentPhoneNumbers.map((phoneNumber, index) => (
                        <tr key={phoneNumber}>
                          <td>{++index}.</td>
                          <td>{phoneNumber}</td>
                        </tr>
                      ))
                    : 'No phone numbers to show'}
                </tbody>
              </table>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {pageNumbers.map(number => (
                <li className="page-item" key={number} id={number} onClick={this.handlePageChange}>
                  <a className="page-link" href="#">
                    {number}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
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
