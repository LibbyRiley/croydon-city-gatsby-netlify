import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import reduce from "lodash/reduce";
import StoreContext from "../context/StoreContext";
const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const items = checkout ? checkout.lineItems : [];
  const total = reduce(items, (acc, item) => acc + item.quantity, 0);
  return [total !== 0, total];
};

const Navbar = ({ props }) => {
  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");
  const [hasItems, quantity] = useQuantity();
  const toggleHamburger = () => {
    // toggle the active boolean in the state
    setActive(!active);
    active ? setNavBarActiveClass("is-active") : setNavBarActiveClass("");
  };

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            Home
            {/* <img src={logo} alt="Kaldi" style={{ width: "88px" }} /> */}
          </Link>
          <Link className="navbar-item" to="/cart">
            {hasItems && <span>{quantity}</span>}
            Cart 🛒
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              Our Club
            </Link>
            <Link className="navbar-item" to="/teams">
              Teams
            </Link>
            <Link className="navbar-item" to="/products">
              Shop Merchandise
            </Link>
            <Link className="navbar-item" to="/blog">
              News
            </Link>
            {/* <Link className="navbar-item" to="/faqs">
                FAQs
              </Link> */}
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            {/* <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
