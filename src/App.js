import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CurrentProduct from './components/CurrentProduct';
import Products from './components/Products';
import ImagePopup from './components/ui/ImagePopup';
import { api } from './utils/Api';
import { SearchContext } from './contexts/SearchContext';
import { FilterContext } from './contexts/FilterContext';

const AppContainter = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;

const App = () => {
  const [products, setProducts] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [imagePopupOpened, setImagePopupOpened] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  const categories = [...new Set(products.map(item => item.category))];

  useEffect(() => {
    const localStorageProducts = JSON.parse(localStorage.getItem('products'));
    if (localStorageProducts) {
      setProducts(localStorageProducts);
      setProductsToRender(localStorageProducts);
      return;
    }
    api.getProducts()
      .then(res => {
        setProducts(res);
        setProductsToRender(res);
        localStorage.setItem('products', JSON.stringify(res));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const addItems = () => {
      setCurrentRow(currentRow + 1);
      setIsBottom(false);
    };
    if (isBottom) {
      addItems();
    }
  }, [isBottom, currentRow]);

  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem('currentProduct'));
    if (selectedProduct) setCurrentProduct(selectedProduct);
  }, []);

  const handleScroll = () => {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  };

  const handleProductSearch = (value) => {
    const searchRequest = value.toLowerCase();
    if (!value) return;
    const result = products.filter(item => {
      return item.title.toLowerCase().includes(searchRequest)
        || item.description.toLowerCase().includes(searchRequest)
        || item.category.toLowerCase().includes(searchRequest);
    });
    setProductsToRender(result);
  };

  const handleFieldChange = (evt) => {
    setKeyword(evt.target.value);
    handleProductSearch(evt.target.value);
    !evt.target.value && setProductsToRender(products);
  };

  const handleProductSelect = (id) => {
    const selectedProduct = products.find(item => item.id === id);
    setCurrentProduct(selectedProduct);
    localStorage.setItem('currentProduct', JSON.stringify(selectedProduct));
    history.push(`/products/${id}`);
  };

  const handleProductsClick = (id) => {
    setImagePopupOpened(true);
  };

  const filterProductsByCategory = (evt) => {
    const isChecked = evt.target.checked;
    const selected = products.filter((item) => item.category === evt.target.name);
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
  };

  const handleClickBack = () => {
    history.push('/');
  };

  const filterProductsByPrice = (evt) => {
    const filteredPrice = evt.target.value;
    setPrice(filteredPrice);
    setProductsToRender(products.filter((item) => item.price <= filteredPrice).sort((a, b) => a.price - b.price));
  };

  const sortProducts = (evt) => {
    evt.target.name === 'up'
      ? setProductsToRender(productsToRender.map(item => item).sort((a, b) => a.price - b.price))
      : setProductsToRender(productsToRender.map(item => item).sort((a, b) => b.price - a.price));
  };

  const closeImapePopup = () => {
    setImagePopupOpened(false);
  };

  return (
    <SearchContext.Provider value={{
      keyword,
      onSearch: handleProductSearch,
      onFieldChange: handleFieldChange
    }}>
      <FilterContext.Provider value={{
        products,
        categories,
        onSort: sortProducts,
        onCheck: filterProductsByCategory,
        price,
        onRangeChange: filterProductsByPrice
      }}>
        <AppContainter>
          <Switch>
            <Route exact path='/'>
              <Products
                products={products}
                productsToRender={productsToRender}
                currentRow={currentRow}
                onCardClick={handleProductSelect} />
            </Route>
            <Route path='/products/:id'>
              <CurrentProduct
                item={currentProduct}
                handleClickBack={handleClickBack}
                onCardClick={handleProductsClick} />
              <ImagePopup
                url={currentProduct.image}
                isOpened={imagePopupOpened}
                onClose={closeImapePopup} />
            </Route>
          </Switch>
        </AppContainter>
      </FilterContext.Provider>
    </SearchContext.Provider >
  );
};

export default App;
