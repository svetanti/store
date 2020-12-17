import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 60%;
  height: 50px;
`;

const Input = styled.input`
  width: 73%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;

  :hover {
    box-shadow: 0 0 2px 2px #eee;
  }
`;

const Button = styled.button`
  width: 25%;
  heigth: 100%;
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

export default function SearchForm(props) {
  const { onSearch } = props;

  const [value, setValue] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSearch(value);
  }

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate>
      <Input
        value={value || ''}
        onChange={(evt) => setValue(evt.target.value)} />
      <Button>Поиск</Button>
    </Form >
  )
}