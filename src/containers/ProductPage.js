import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { getProductPage } from '../actions';
import getParams from '../utils/getParams';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

/**
* @author
* @function ProductPage
**/

export const ProductPage = (props) => {
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const { page } = product;

  useEffect(() => {
    const params = getParams(location.search);
    dispatch(getProductPage(params));
  }, []);



  return (
    <>
      <h2>{page.title}</h2>
      <Carousel
        renderThumbs={() => {}}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        stopOnHover={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        {
          page.banners && page.banners.map((banner, index) =>
            <a key={index} style={{ display: 'block' }} href={banner.navigateTo} >
              <img style={{maxHeight: '800px', maxWidth: '1800px'}} src={banner.img} />
            </a>
          )
        }
      </Carousel>

      <div style={{dispay: 'flex'}}>
        {
          page.products && page.products.map((product, index) =>
            <a key={index} href={product.navigateTo}>
              <img src={product.img} alt=''/>
            </a>
          )
        }
      </div>
    </>
  )

}