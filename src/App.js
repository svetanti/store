import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Products from './components/Products';
import { api } from './utils/Api';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then(res => {
        setProducts(res);
        localStorage.setItem('products', JSON.stringify(res));
      })
      .catch(err => console.log(err));
  }, []);

  const handleProductSearch = (value) => {
    const searchRequest = value.toLowerCase();
    if (!value) {
      console.log('Нужно ввести ключевое слово');
      return;
    }
    setProducts([]);
    api.getProducts()
      .then(res => {
        const result = res.filter(item => {
          return item.title.toLowerCase().includes(searchRequest)
            || item.description.toLowerCase().includes(searchRequest)
            || item.category.toLowerCase().includes(searchRequest);
        });
        setProducts(result);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке новостей: ${err}`);
      })
  };

  function handleProductSelect(id) {
    console.log(id);
  }

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Products
            products={products}
            onSearch={handleProductSearch}
            onCardClick={handleProductSelect} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
