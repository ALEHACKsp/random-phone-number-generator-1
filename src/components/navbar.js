import React from 'react';

import './__styles__/navbar.scss';

const Navbar = () => (
  <nav className="navbar my-nav" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io" />

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">Home</a>

        <a className="navbar-item">Documentation</a>
      </div>
    </div>
  </nav>
);

export default Navbar;