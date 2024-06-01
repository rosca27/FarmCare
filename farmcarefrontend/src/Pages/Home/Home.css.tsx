import styled from "styled-components";

const img = require("../../images/pexels-pixabay-325944.jpg");

interface HomeTitleProps {
  mounted: boolean;
}

export const HomeComponent = styled.div`
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
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

export const HomeTitle = styled.h1<HomeTitleProps>`
  font-size: 9rem;
  color: white;
  font-weight: 700;
  margin-top: 10%;
  margin-left: 20%;
  opacity: ${({ mounted }) => (mounted ? "1" : "0")};
  transform: ${({ mounted }) =>
    mounted ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 1s ease-in-out, opacity 0.5s ease-in-out;
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: 50%;
    margin-left: 10%;
  }
`;

export const WeatherHomeComponent = styled.div`
  backdrop-filter: blur(10px);
  position: absolute;
  border-radius: 10px;
  padding: 20px;
  margin-left: 80%;
  margin-right: 10%;
  color: white;
  font-size: 1.5rem;
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    width: 150px;
    margin-left: 30%;
  }
`;

export const WeatherHomeTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const WheatherHomeParagraph = styled.p`
  margin-bottom: 10px;
`;

export const HomeButton = styled.button`
  height: 45px;
  width: 200px;
  border: none;
  margin-left: 20%;
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

export const PLantDiseaseButton = styled.button`
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
