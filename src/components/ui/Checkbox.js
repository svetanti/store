import React from 'react';
import styled from 'styled-components';
import imgPath from '../images/checked_icon.svg';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
  position: relative;
  margin-left: 40px;  
`;

const Input = styled.input`
  padding: 0;
  margin: 0;
  position: absolute; 
  top: 0;
  left: -5000px;

:before {
  position: absolute;
  top: 0;
  left: 4960px;
  display: block;
  content: '';
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
}

:checked:before {
  background-image: url(${imgPath});
  background-size: cover;
}
`;

const Checkbox = ({ value, onCheck }) => {
  const id = value.includes(' ') ? value.split(' ').join('-') : value;

  return (
    <Label htmlFor={id}>{value.toUpperCase()}
      <Input
        id={id}
        type='checkbox'
        onChange={onCheck}
        name={value} />
    </Label>
  )
}

export default Checkbox;