/* Users.css */
import styled from "styled-components";
import img from "../images/pexels-pixabay-325944.jpg";

export const UserComponent = styled.div`
  background: url(${img});
  background-size: cover;
  background-position: center bottom;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 768px) {
    background-position: center;
    height: auto;
    overflow-y: auto;
  }
`;

export const UserComponenth1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  padding-top: 20px;
  color: white;
`;

export const UserComponentList = styled.div`
  backdrop-filter: blur(50px);
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  width: 100%;
  max-width: 1000px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 10px;
  @media (max-width: 768px) {
    flex-direction: column; /* Adjust flex direction for smaller devices */
    align-items: stretch;
  }
`;

export const UserTable = styled.table`
  width: 100%;
  backdrop-filter: blur(50px);
  border-collapse: collapse;
  th,
  td {
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 12px;
    text-align: left;
    color: white;
  }
  th {
    background-color: rgba(255, 255, 255, 0.1);
    font-weight: bold;
    text-transform: uppercase;
  }
  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
  }
  tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.03);
    transition: background-color 0.3s ease, box-shadow 0.3s ease,
      transform 0.3s ease;
  }
  @media (min-width: 768px) {
    width: 90%; /* Adjust table width for larger screens */
  }
  }
`;
