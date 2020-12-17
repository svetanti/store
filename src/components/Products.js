import React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Item from './Item';

const ItemsGrid = styled.ul`
  width: 80%;
  list-style: none;
  padding: 0;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

function Products(props) {
  const { products, onSearch, onCardClick } = props;

  return (
    <>
      <SearchForm onSearch={onSearch} />
      <ItemsGrid>
        {
          products.map((item) =>
            <Item
              key={item.id}
              item={item}
              onCardClick={onCardClick} />
          )}
      </ItemsGrid>
    </>
  )
}

export default Products;