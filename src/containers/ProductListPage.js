import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import getParams from '../utils/getParams';
import { Layout } from '../componenets/Layout'
import './ProductListPage.css';
import { ProductStore } from './ProductStore';
import { ProductPage } from './ProductPage';

/**
* @author
* @function ProductListPage
**/

export const ProductListPage = (props) => {
  const location = useLocation();

  const renderProduct = () => {
    const params = getParams(location.search);

    let content = null;
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props}/>;
        break;
      default:
        content = null;
    }

    return content;
  }

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  )

}