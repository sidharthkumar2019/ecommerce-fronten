import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import { Layout } from "../../componenets/Layout";
import {
  MaterialButton,
  MaterialInput,
  Anchor
} from "../../componenets/MaterialUI";
import { Card } from "../../componenets/UI/Card";
import { CartPage } from '../CartPage';
import AddressForm from "./AddressForm";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div className={`checkoutHeader ${props.active && "active"}`}>
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
  console.log(user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddressSubmit = () => {
  };

  useEffect(() => {
    dispatch(getAddress());
  }, []);

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
              active={false}
              body={
                <>
                  {
                    user.address.map((adr) => (
                      <div className="flexRow addressContainer">
                        <div>
                          <input name="address" type='radio' />
                        </div>
                        <div className="flexRow sb addressinfo" style={{justifyContent: 'space-between'}}>
                          <div>
                            <div>
                              <span>{adr.name}</span>
                              <span>{adr.addressType}</span>
                              <span>{adr.mobileNumber}</span>
                            </div>
                            <div>
                              {adr.address}
                            </div>
                            <MaterialButton
                              title='Deliver Here'
                              style={{ width: '250px' }}
                            />
                          </div>
                          <div>edit</div>
                        </div>
                      </div>
                    )
                    )
                  }
                </>
              }
            />

            {/* AddressForm */}
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />

            {/* <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null} */}

            <CheckoutStep
              stepNumber={"3"}
              title={"ORDER SUMMARY"}
            />

            {/* {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )} */}

            <CheckoutStep
              stepNumber={"4"}
              title={"PAYMENT OPTIONS"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;