import React from 'react';
import './__styles__/home.scss';

const getRandomPhoneNumber = () => {
  const generatedNumber = Math.floor(Math.random() * Math.floor(999999999));
  const phoneNumber = `${0}${generatedNumber}`
  console.log(phoneNumber);
  return phoneNumber;
};

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <button className="phone-button" onClick={() => getRandomPhoneNumber()}>
          Generate new phone number
        </button>

        <section>
          List of phone numbers
          <div className="card">
            <header className="card-header header">
              <div className="field is-grouped search-field">
                <p className="control is-expanded">
                  <input className="input" type="text" placeholder="Search for a phone number" />
                </p>
              </div>
            </header>
            <div className="card-content">
              <div className="content">numbers</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
