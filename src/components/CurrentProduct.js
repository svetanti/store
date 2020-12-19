import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const StyledProductCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 25%;
    align-items: center;
  `;

const Button = styled.button`
    width: 25%;
    height: 50px;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: black;
    color: #fff;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      opacity: .8;
    }
  `;

const CurrentProduct = ({ item, handleClickBack, onCardClick }) => {
  return (
    <StyledProductCard>
      <Item
        item={item}
        onCardClick={onCardClick} />
      <Button onClick={handleClickBack}>Назад</Button>
    </StyledProductCard>
  )
}

export default CurrentProduct;