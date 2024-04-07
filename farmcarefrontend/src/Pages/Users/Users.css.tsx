/* Users.css */
import styled from "styled-components";
import img from "../../images/pexels-tim-mossholder-974314.jpg";

export const UserComponent = styled.div`
  background: url(${img});
  background-size: cover;
  background-position: center bottom;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  @media (max-width: 768px) {
    background-position: center;
    height: auto;
    overflow-y: auto;
  }
`;

export const UserComponenth1 = styled.h1`
  text-align: center;
  font-size: 3rem;
  fweight: bold;
  color: white;
`;

export const UserComponentList = styled.div`
  height: 90vh;
  width: 100%;
  max-width: 1000px;
  overflow-y: auto;
  backdrop-filter: blur(50px);
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  margin: auto;
  padding-top: 20px; /* Add padding to the top */
  padding-bottom: 20px; /* Add padding to the bottom */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distribute space between items */
  color: white;
  border-radius: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 95%;
  overflow-y: auto;
  max-width: 1000px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserTable = styled.table`
  overflow-y: auto;
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

export const CreateButton = styled.button`
  height: 45px;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  position: absolute;
  margin-left: 60%;
  border: none;
  outline: none;
  border-radius: 40px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  margin-top: 20px;
`;
