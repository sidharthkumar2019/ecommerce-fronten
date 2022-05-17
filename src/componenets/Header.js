import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css'
import flipkartLogo from '../images/logo/flipkart.png';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from './MaterialUI';
import { login, signout, signup as _signup } from '../actions/auth';
import { Cart } from './UI/Cart';

/**
* @author
* @function Header
**/

export const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const cart = useSelector(state => state.cart);

  const userSignup = () => {
    const user = {firstName, lastName, email, password};
    if (
      firstName == '' || 
      lastName == '' || 
      email == '' || 
      password == ''
    )
      return;
    dispatch(_signup(user));
  }

  const userLogin = () => {
    if (signup)
      userSignup();
    else 
      dispatch(login({ email, password }));

    setLoginModal(false);
  }

  const logout = () => {
    dispatch(signout());
  }

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.firstName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className='header' style={{ background: '#2874f0' }}>
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              {
                signup && (
                  <MaterialInput
                    type='text'
                    label='Enter First Name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                )
              }
              {
                signup && (
                  <MaterialInput
                    type='text'
                    label='Enter Last Name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                )
              }
              <MaterialInput
                type="text"
                label="Enter Email/Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              // rightElement={<a href="#">Forgot?</a>}
              />
              <MaterialButton
                title={signup ? "Register" : "Login"}
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  margin: '40px 0 20px 0'
                }}
                onClick={userLogin}
              />

              <p>OR</p>

              <MaterialButton
                title="Request OTP"
                bgColor="#ffffff"
                textColor="#2874f0"
                style={{
                  margin: '20px 0'
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart" href='/cart' style={{ textDecoration: 'none' }}>
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}