import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProductsBySlug } from '../actions/index';
import { generatePublicUrl } from '../urlConfig';

/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const product = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductsBySlug(slug));
    }, [])

    const priceRange = {
        under5k: '5000',
        under10k: '10000',
        under15k: '15000',
        under20k: '20000',
        under30k: '30000'
    }

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className='card'>
                            <div className='cardHeader'>
                                <div>{slug} mobile under &#8377; {priceRange[key]}</div>
                                <button>View all</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product => {
                                        return (
                                            <div className='productContainer'>
                                                <div className='productImageContainer'>
                                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt='product image' />
                                                </div>
                                                <div className='productInfo'>
                                                    <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                    <div>
                                                        <span>4.5</span>&nbsp;
                                                        <span>1004</span>
                                                    </div>
                                                    <div className='productPrice'>&#8377; {product.price}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}