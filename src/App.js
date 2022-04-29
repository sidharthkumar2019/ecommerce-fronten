import './App.css';
import { HomePage } from './containers/HomePage';
import { Route, Routes } from 'react-router-dom';
import { ProductListPage } from './containers/ProductListPage';
import ProductDetailsPage from './containers/ProductDetails';
import { CartPage } from './containers/CartPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import { updateCart } from './actions/cart';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn());
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/:slug' element={<ProductListPage />} />
        <Route path='/:productSlug/:productID/p' element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
