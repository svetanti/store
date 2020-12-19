import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import CurrentProduct from './components/CurrentProduct';
import Products from './components/Products';
import { api } from './utils/Api';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    api.getProducts()
      .then(res => {
        setProducts(res);
        setProductsToRender(res);
        localStorage.setItem('products', JSON.stringify(res));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem('currentProduct'));
    if (selectedProduct) setCurrentProduct(selectedProduct);
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
        setProductsToRender(result);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке новостей: ${err}`);
      })
  };

  const handleProductSelect = (id) => {
    const selectedProduct = products.find(item => item.id === id);
    setCurrentProduct(selectedProduct);
    localStorage.setItem('currentProduct', JSON.stringify(selectedProduct));
    history.push('/product');
  }

  const handleClickBack = () => {
    history.push('/');
  }

  const handleFilterByCategory = (evt) => {
    const selectedCategory = evt.target.name;
    const isChecked = evt.target.checked;
    const selected = products.filter((item) => item.category === selectedCategory);
    if (isChecked) {
      if (!selectedProducts.length) {
        setSelectedProducts(selected);
        setProductsToRender(selected);
      }
      else {
        setSelectedProducts([...selected, ...selectedProducts]);
        setProductsToRender([...selected, ...selectedProducts]);
      }
    }
    else {
      const filteredProducts = selectedProducts.filter((item) => !selected.includes(item));
      if (JSON.stringify(selectedProducts) === JSON.stringify(selected)) {
        setSelectedProducts([]);
        setProductsToRender(products);
      }
      else {
        setSelectedProducts(filteredProducts);
        setProductsToRender(filteredProducts);
      }
    }
  }

  const handleFilterByPrice = (evt) => {
    const filteredPrice = evt.target.value;
    setPrice(filteredPrice);
    setProductsToRender(products.filter((item) => item.price <=  filteredPrice).sort((a, b) => a.price - b.price));
  }

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Products
            products={products}
            productsToRender={productsToRender}
            onSearch={handleProductSearch}
            onCardClick={handleProductSelect}
            onCheck={handleFilterByCategory}
            onRangeChange={handleFilterByPrice}
            value={price} />
        </Route>
        <Route path='/product'>
          <CurrentProduct
            item={currentProduct}
            handleClickBack={handleClickBack}
            onCardClick={() => console.log('Клик!')} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
