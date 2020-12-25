import React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Filter from './Filter';
import Item from './Item';

const Containrer = styled.div`
  display: flex;
  flex-direction: column;
`;


const ItemsGrid = styled.ul`
  width: 80%;
  list-style: none;
  padding: 0;
  margin: 40px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  gap: 40px;

  @media (max-width: 680px) {
    width: 90%;
  }
`;

const Products = ({ productsToRender, currentRow, onCardClick }) => {
  const productsPerRow = 3;
  const productsToShow = productsToRender.slice(0, (currentRow + 1) * productsPerRow);

  return (
    <Containrer>
      <SearchForm />
      <Filter />
      <ItemsGrid>
        {productsToShow.map((item) =>
          <Item
            key={item.id}
            item={item}
            onCardClick={onCardClick} />)}
      </ItemsGrid>
    </Containrer>
  )
};

export default Products;
