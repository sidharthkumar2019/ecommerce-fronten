import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems } from '../actions/cart'
import { Layout } from '../componenets/Layout'
import { Card } from '../componenets/UI/Card'
import CartItem from './CartItem'

import './CartItem.css'

/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems])

    useEffect(()=> {
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
                </Card>

                <Card leftheader={'Price'} style={{ width: '500px' }}>
                    
                </Card>
            </div>
        </Layout>
    )

}