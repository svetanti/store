import React, { useContext } from 'react';
import styled from 'styled-components';
import Checkbox from './ui/Checkbox';
import Range from './ui/Range';
import Sort from './ui/Sort';
import { FilterContext } from '../contexts/FilterContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
`;

const Categories = styled.fieldset`
  display: flex;
  justify-content: space-between;
  border: none;
  padding: 0;
  margin: 0;
`;

const Filter = () => {
  const { products, categories, onSort, onCheck, price, onRangeChange } = useContext(FilterContext);
  const prices = products.map(item => item.price).sort((a, b) => a - b);
  const min = prices[0];
  const max = prices[prices.length - 1];

  return (
    <Form>
      <Categories>
        {categories.map((item, index) =>
          <Checkbox
            key={index}
            value={item}
            onCheck={onCheck} />
        )}
      </Categories>
      <Range
        min={min}
        max={max}
        value={price}
        onChange={onRangeChange} />
      <Sort
        onSort={onSort} />
    </Form>
  )
};

export default Filter;
