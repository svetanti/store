import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  object-fit: scale-down;
  margin: 0;
`;

const ImagePopup = ({ url, isOpened, onClose }) => {
  return (<>
    {
      isOpened &&
      (<Overlay onClick={onClose}>
        <Image src={url} />
      </Overlay>)
    }
  </>)
}

export default ImagePopup;