import { Routes, Route } from 'react-router-dom';

import './Reset.css';
import './App.css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { ProductsList } from './components/ProductsList/ProductsList';

function App() {
  return (
    <div className="boxApp">
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<ProductsList section="all" />} />
          <Route path="/forWomen" element={<ProductsList section="women" />} />
          <Route path="/forMen" element={<ProductsList section="men" />} />
          <Route path="/forKids" element={<ProductsList section="kids" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
