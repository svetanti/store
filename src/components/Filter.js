import React from 'react';
import styled from 'styled-components';
import Checkbox from './ui/Checkbox';
import Range from './ui/Range';
import Sort from './ui/Sort';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto 40px;
  width: 80%;
`;

const Categories = styled.fieldset`
  display: flex;
  justify-content: space-between;
  border: none;
  padding: 0;
  margin: 0;
`;

const Filter = (props) => {
  const { products, onSort, onCheck, value, onRangeChange } = props;

  const categories = [...new Set(products.map(item => item.category))];
  const prices = products.map(item => item.price).sort((a, b) => a - b);
  const min = prices[0];
  const max = prices[prices.length - 1]

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
        value={value}
        onChange={onRangeChange} />
      <Sort
        onSort={onSort} />
    </Form>
  )
}

export default Filter;