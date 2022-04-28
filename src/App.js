import './App.css';
import { HomePage } from './containers/HomePage';
import {Route, Routes} from 'react-router-dom';
import {ProductListPage} from './containers/ProductListPage';
import ProductDetailsPage from './containers/ProductDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ <HomePage /> } />
        <Route path='/:slug' element={ <ProductListPage /> } />
        <Route path='/:productSlug/:productID/p' element={ <ProductDetailsPage /> } />
      </Routes>
    </div>
  );
}

export default App;
