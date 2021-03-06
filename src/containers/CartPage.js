import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems } from '../actions/cart'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../componenets/Layout'
import { Card } from '../componenets/UI/Card'
import CartItem from './CartItem'

import './CartItem.css'
import { MaterialButton } from '../componenets/MaterialUI'
import PriceDetails from '../componenets/PriceDetails'

/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems])

    useEffect(() => {
        if (auth.authenticate)
            dispatch(getCartItems());
    }, [auth.authenticate]);

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));

    };

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    };

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityDec={onQuantityDecrement}
                            onQuantityInc={onQuantityIncrement}
                        />
                    )
                }
            </>
        );
    }

    return (
        <Layout>
            <div className='cartContainer' style={{ display: 'flex' }}>
                <Card
                    leftheader='My Cart'
                    rightheader={<div>Deliver to</div>}
                    style={{ width: '-webkit-fill-available' }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityDec={onQuantityDecrement}
                                onQuantityInc={onQuantityIncrement}
                            />
                        )
                    }

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            background: '#ffffff',
                            justifyContent: 'flex-end',
                            boxShadow: '0 0 10px 10px #eee',
                            padding: '10px 0',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div style={{ width: '250px' }}>
                            <MaterialButton
                                title='Place Order'
                                onClick={() => navigate('/checkout')}
                            />
                        </div>
                    </div>
                </Card>

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
        </Layout>
    )

}