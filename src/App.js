import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Thankyou from './pages/Thankyou.jsx';
import ProductList from './pages/ProductList.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ProductList />} />
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/thank-you' element={<Thankyou />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
