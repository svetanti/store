import React from 'react';
import styled from 'styled-components';
import Checkbox from './ui/Checkbox';

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
  const { products, onCheck } = props;

  const categories = [...new Set(products.map(item => item.category))];
  const prices = products.map(item => item.price).sort((a, b) => a - b);

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
      {/*  <feildset>
        <label>Цена
          <input
            type='range'
            min={prices[0]}
            max={prices[prices.length - 1]}></input>
        </label>
        <div className='range__minmax'>
          <span>{!min ? '' : `от ${Number(min).toLocaleString()} '\u20bd'`}</span>
          <span>{!max ? '' : `свыше ${Number(max).toLocaleString()} '\u20bd'`}</span>
        </div>
      </feildset> */}

    </Form>
  )
}

export default Filter;