import React from 'react';

import './__styles__/navbar.scss';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg my-nav-bar">
    <a className="navbar-brand" href="#!">
      Random Phone Number Generator
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  </nav>
);

export default Navbar;
