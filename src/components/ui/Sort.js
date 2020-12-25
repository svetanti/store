import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 50%;
  height: 40px;
  margin: 20px auto;

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: 2px solid #000;
  padding: 0;
  margin: 0;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    opacity: .8;
  }
`;

const Sort = ({ onSort }) => {

  const handleClick = (evt) => {
    evt.preventDefault();
    onSort(evt);
  }

  return (
    <Container>
      <Button
        name='up'
        onClick={handleClick}>
        From low to high {'\u25b2'}</Button>
      <Button
        name='down'
        onClick={handleClick}>
        From high to low {'\u25bc'}</Button>
    </Container>
  )
};

export default Sort;
