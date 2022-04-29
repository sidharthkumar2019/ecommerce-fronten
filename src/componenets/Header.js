import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css'
import flipkartLogo from '../images/logo/flipkart.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from './MaterialUI';
import { login, signout } from '../actions/auth';

/**
* @author
* @function Header
**/

export const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = () => {
    dispatch(login({ email, password }));

    setLoginModal(false);
  }

  const logout = () => {
    dispatch(signout());
  }

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
                title="Login"
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
          <DropdownMenu
            menu={
              <a className="loginButton" onClick={() => auth.authenticate ? null : setLoginModal(true)}>
                {auth.authenticate ? `${auth.user.firstName} ${auth.user.lastName[0]}.` : 'Login'}
              </a>
            }
            menus={[
              { label: 'My Profile', href: '', icon: null },
              { label: 'Flipkart Plus Zone', href: '', icon: null },
              { label: 'Orders', href: '', icon: null },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Gift Cards', href: '', icon: null },
              { label: 'Logout', href: '', icon: null, onClick: logout }
            ]}
            firstMenu={
              auth.authenticate ?
                null :
                (<div className="firstmenu">
                  <span>New Customer?</span>
                  <a style={{ color: '#2874f0' }}>Sign Up</a>
                </div>)
            }
          />
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
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}