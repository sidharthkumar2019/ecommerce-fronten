import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder, getAddress } from "../../actions";
import { getCartItems } from "../../actions/cart";
import { Layout } from "../../componenets/Layout";
import {
  MaterialButton,
  MaterialInput,
  Anchor
} from "../../componenets/MaterialUI";
import PriceDetails from "../../componenets/PriceDetails";
import { Card } from "../../componenets/UI/Card";
import { CartPage } from '../CartPage';
import AddressForm from "./AddressForm";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div onClick={props.onClick} className={`checkoutHeader ${props.active && "active"}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [finalAddress, setFinalAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);

    const items = Object.keys(cart.cartItems).map(key => ({
      productID: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty 
    }))

    const payload = {
      'addressID': finalAddress._id,
      totalAmount,
      items,
      paymentStatus: 'pending',
      paymentType: 'cod'
    }

    dispatch(addOrder(payload));
    setConfirmOrder(true);
  }

  const userOrderConfirmation = () => {
    setOrderSummary(false);
    setOrderConfirmation(true);
    setPaymentOptions(true);
  }

  const onAddressSubmit = (adr) => {
    console.log('in execution');
    setFinalAddress(adr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (adr) => {
    const updatedAddress = address.map(ele =>
      ele._id === adr._id ?
        { ...ele, edit: true } :
        { ...ele, edit: false });
    setAddress(updatedAddress);
  }

  const selectAddress = (adr) => {
    const updatedAddress = address.map(ele =>
      ele._id === adr._id ?
        { ...ele, selected: true } :
        { ...ele, selected: false });
    setAddress(updatedAddress);
  }

  const confirmDeliveryAddress = (adr) => {
    setFinalAddress(adr);
    setConfirmAddress(true);
    setOrderSummary(true);
  }

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }));
    setAddress(address);
  }, [user.address]);

  useEffect(() => {
    console.log('order Summary: ', orderSummary);
  }, [orderSummary])

  if (confirmOrder)
    navigate('/account/orders');

  return (
    <Layout>
      <div>
        <div className="cartContainer" style={{ alignItems: "flex-start", textAlign: 'start' }}>
          <div className="checkoutContainer">
            {/* check if user logged in or not */}
            <CheckoutStep
              stepNumber={"1"}
              title={"LOGIN"}
              active={!auth.authenticate}
              body={
                auth.authenticate ? (
                  <div className="loggedInId">
                    <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                    <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                  </div>
                ) : (
                  <div>
                    <MaterialInput label="Email" />
                  </div>
                )
              }
            />
            <CheckoutStep
              stepNumber={"2"}
              title={"DELIVERY ADDRESS"}
              active={!confirmAddress && auth.authenticate}
              body={
                <>
                  {
                    confirmAddress ?
                      <div>{finalAddress ? `${finalAddress.address} - ${finalAddress.pinCode}` : 'Final Address not set.'}</div> :
                      address.map(adr => (
                        <Address
                          selectAddress={selectAddress}
                          enableAddressEditForm={enableAddressEditForm}
                          confirmDeliveryAddress={confirmDeliveryAddress}
                          onAddressSubmit={onAddressSubmit}
                          adr={adr}
                        />
                      ))
                  }
                </>
              }
            />

            {/* AddressForm */}

            {
              confirmAddress ? null :
                newAddress ?
                  <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                  :
                  <CheckoutStep
                    stepNumber={"+"}
                    title={"ADD NEW ADDRESS"}
                    active={false}
                    onClick={() => setNewAddress(true)}
                  />
            }

            <CheckoutStep
              stepNumber={"3"}
              active={orderSummary}
              title={"ORDER SUMMARY"}
              body={
                finalAddress && orderSummary ?
                  <CartPage onlyCartItems /> :
                  orderConfirmation ?
                    <div>{Object.keys(cart.cartItems).length} product(s)</div> :
                    null
              }
            />

            {
              orderSummary &&
              <Card style={{ margin: '10px 0' }}>
                <div className="flexRow sb" style={{ padding: '20px', alignItems: 'center' }}>
                  <p>Order confirmation email with be sent to <strong>{auth.user.email}</strong></p>
                  <MaterialButton
                    style={{ width: '200px', marginLeft: 'auto' }}
                    title='CONTINUE'
                    onClick={userOrderConfirmation}
                  />
                </div>
              </Card>
            }

            <CheckoutStep
              stepNumber={"4"}
              title={"PAYMENT OPTIONS"}
              active={paymentOptions}
              body={
                paymentOptions &&
                <div>
                  <div className="flexRow" style={{ alignItems: 'center', padding: '20px' }}>
                    <input name="paymentOption" type='radio' value='cod' />
                    <div>Cash on Delivery</div>
                  </div>
                  <MaterialButton
                    title='CONFIRM ORDER'
                    style={{
                      width: '200px',
                      padding: '0 0 20px 20px'
                    }}
                    onClick={onConfirmOrder}
                  />
                </div>
              }
            />
          </div>
        </div>
        <PriceDetails
          totalItem={
            Object.keys(cart.cartItems).reduce((qty, key) =>
              (qty + cart.cartItems[key].qty), 0)
          }
          totalPrice={
            Object.keys(cart.cartItems).reduce((totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            }, 0)
          }
        />
      </div>
    </Layout >
  );
};

export default CheckoutPage;