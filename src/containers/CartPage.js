import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cart'
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
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems])

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
                    leftHeader='My Cart'
                    rightHeader={<div>Deliver to</div>}
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

                <Card leftHeader={'Price'} style={{ width: '500px' }}>
                    
                </Card>
            </div>
        </Layout>
    )

}