import React from 'react'
import { useSelector } from 'react-redux'
import { Layout } from '../componenets/Layout'
import { Card } from '../componenets/UI/Card'

import './CartItem.css'

/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const cartItems = cart.cartItems;
    console.log(cartItems);
    return (
        <Layout>
            <div className='cartContainer' >
                <Card
                    leftHeader='My Cart'
                    rightHeader={<div>Deliver to</div>}
                >
                    {
                        Object.keys(cartItems).map((key, index) => 
                            <div key={index} className='flexRow'>
                                <div className='cartProductContainer'>
                                    <img src='' />
                                </div>
                                <div className='cardItemDetails'>
                                    <div>{cartItems[key].name} - qty - {cartItems[key].qty}</div>
                                    <div>Delivery in 3-5 days</div>
                                </div>
                            </div>
                        )
                    }
                </Card>

                <Card style={{ width: '500px' }}>
                    Price
                </Card>
            </div>
        </Layout>
    )

}