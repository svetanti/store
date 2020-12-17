import React from 'react';
import styled from 'styled-components';
import Item from './Item';

function CurrentProduct(props) {
  const { item } = props;

  const StyledProductCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
  `;

  return (
    <StyledProductCard>

    </StyledProductCard>
  )
}

export default CurrentProduct;