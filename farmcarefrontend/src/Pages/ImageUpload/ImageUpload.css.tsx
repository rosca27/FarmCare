import styled from "styled-components";

export const UploadButton = styled.button`
  height: 45px;
  width: 200px;
  border: none;
  margin-left: 10px;
  outline: none;
  background: #fff;
  border-radius: 40px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  &:hover {
    background: #f0f0f0;
    transform: scale(1.03);
    transition: background-color 0.3s ease, box-shadow 0.3s ease,
      transform 0.3s ease;
  }
`;

export const ImageInputBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 50%;
  width: 50%;
  background: transparent;
  backdrop-filter: blur(10px);
  align-items: center;
  justify-content: center;
  color: white;
`;

export const ImageInput = styled.input`
  display: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin-bottom: 10px;
`;
