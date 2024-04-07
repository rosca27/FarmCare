import styled, { createGlobalStyle } from "styled-components";
import img from "../../images/pexels-tom-fisk-1595104.jpg";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
`;

export const LoginComponent = styled.div`
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  display: flex;
  align-items: center;
  background: url(${img}) no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 30px 40px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px, max-height: 428) {
    padding: 20px;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const LoginInputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
  ::placeholder {
    color: white;
  }
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  font-size: 16px;
  color: white;
  padding: 20px 45px 20px 20px;
`;

export const LoginIcon = styled.div`
  position: absolute;
  top: 100%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #fff;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 40px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  margin-top: 20px;
`;

export const LoginTitle = styled.h2`
  font-size: 36px;
  text-align: center;
`;

export const LoginLink = styled.p`
  font-size: 14.5px;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  font-weight: 500;
`;

export const LoginLinkA = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 800;
`;

export const LoginLabel = styled.label`
  font-size: 16px;
  color: white;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
`;
