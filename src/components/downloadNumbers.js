import React from 'react';
import { CSVLink } from 'react-csv';

import './__styles__/download.scss';

const DownloadPhoneNumbers = data => (
  <button className="btn download-button">
    <CSVLink data={[data]} filename={'my-phone-file.csv'}>
      Download / save Phone Numbers
    </CSVLink>
  </button>
);

export default DownloadPhoneNumbers;
