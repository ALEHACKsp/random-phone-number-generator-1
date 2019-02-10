import React from 'react';
import './__styles__/home.scss';
import PhoneNumber from 'services/PhoneNumber';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumbers: []
    };
  }
  updatePhoneNumbers = phoneNumbers => {
    this.setState({ phoneNumbers: [...PhoneNumber.storage.all().values()] });
  };
  componentDidMount() {
    this.updatePhoneNumbers();
  }

  render() {
    return (
      <div className="container mt-3">
        <section className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Enter the number of phone numbers to be generated"
          />
          <div className="input-group-append">
            <button
              className="btn my-button"
              onClick={() => {
                PhoneNumber.generate(10);
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
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.phoneNumbers.map((phoneNumber, index) => (
                    <tr key={phoneNumber}>
                      <td>{++index}.</td>
                      <td>{phoneNumber}</td>
                    </tr>
                  ))}
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
