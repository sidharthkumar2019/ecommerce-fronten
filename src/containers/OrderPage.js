import React, { useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../actions'
import { Layout } from '../componenets/Layout'
import { Breed } from '../componenets/MaterialUI'
import { Card } from '../componenets/UI/Card'
import { generatePublicUrl } from '../urlConfig'

/**
* @author
* @function OrderPage
**/

export const OrderPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getOrders());
    }, [])

    return (
        <Layout>
            <div style={{ maxwidth: '1160px', margin: '5px auto' }}>
                <Breed
                    breed={[
                        { name: 'Home', href: '/' },
                        { name: 'My Account', href: '/account' },
                        { name: 'My Orders', href: '/account/orders' }
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {
                    user.orders.map(order => {
                        return order.items.map(item => (
                            <Card style={{ maxWidth: '1200px', margin: '5px auto' }}>
                                <Link 
                                    to={`/order_details/${order._id}`}
                                    className='orderItemContainer'
                                >
                                    <div className='orderItemContainer'>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    overflow: 'hidden',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <img
                                                    src={generatePublicUrl(item.productID.productPictures[0].img)}
                                                    style={{
                                                        maxWidth: 80,
                                                        maxHeight: 80
                                                    }}
                                                />
                                            </div>
                                            <div style={{ width: '300px' }}>
                                                {item.productID.name}
                                            </div>
                                            <div>{item.payablePrice}</div>
                                            <div>{order.paymentStatus}</div>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ));
                    })
                }
            </div>

        </Layout>
    )

}