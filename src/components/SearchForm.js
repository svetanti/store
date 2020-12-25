import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 80%;
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
  height: 100%;
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

const SearchForm = () => {
  const { keyword, onSearch, onFieldChange } = useContext(SearchContext);

  const handleSearch = (evt) => {
    evt.preventDefault()
    onSearch(keyword);
  }

  const handleChange = (evt) => {
    onFieldChange(evt);
  }

  return (
    <Form
      onSubmit={handleSearch}
      noValidate>
      <Input
        value={keyword || ''}
        onChange={handleChange} />
      <Button>Поиск</Button>
    </Form >
  )
};

export default SearchForm;
