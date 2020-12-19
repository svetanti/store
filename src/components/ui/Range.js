import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: 20px 0;  
`;

const Input = styled.input`
  padding: 0;
  margin-top: 20px;
  height: 5px;
  -webkit-appearance: none;
  border-radius: 5px;
  outline : none;
  border: 2px solid #000;

  ::-webkit-slider-thumb{
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
    transition: all .3s;
    opacity: .7;
  }
  
  ::-webkit-slider-thumb:hover, ::-webkit-slider-thumb:active{
    transform: scale(1.2);
    opacity: .9;
  }
`;

const MinMax = styled.div`
  display: flex;
  justify-content: space-between;
`;


const Range = ({ min, max, value, onChange }) => {
  const price = `${'Price'.toUpperCase()}: \u20ac ${!value ? min : `${min}\u2014${value}`}`;

  const handleChange = (evt) => {
    onChange(evt);
  }

  return (
    <>
      <Label>{price}
        <Input
          type='range'
          min={min}
          max={max}
          step='1'
          value={value}
          onChange={handleChange}>
        </Input>
      </Label>
      <MinMax>
        <span>&#8364; {min}</span>
        <span>&#8364; {max}</span>
      </MinMax>
    </>
  )
}

export default Range;