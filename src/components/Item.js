import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 14px;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-size: 20px;
  margin: 10px 0;
`;

const Description = styled.p`
  width: 100%;
  height: 88px;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const Image = styled.img`
  margin-top: 20px;
  width: 100%;
  height: 250px;
  object-fit: scale-down;
`;

const Category = styled.p`
  color: #666;
  font-size: 12px;
`;

export default function Item({ item, onCardClick }) {
  function handleClick() {
    onCardClick(item.id);
  }

  return (
    <ListItem onClick={handleClick}>
      <Title>{item.title}</Title>
      <Price>&#8364; {item.price}</Price>
      <Description>{item.description}</Description>
      <Image src={item.image} alt={item.title} />
      <Category>{item.category}</Category>
    </ListItem>
  )
}