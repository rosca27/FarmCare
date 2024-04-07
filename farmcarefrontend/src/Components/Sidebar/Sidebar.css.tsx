import { Link } from "react-router-dom";
import styled from "styled-components";

interface SidebarProps {
  isOpen: boolean;
}

export const SidebarWrapper = styled.div<SidebarProps>`
  background: trasparent;
  backdrop-filter: blur(20px);
  color: white;
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-250px")};
  transition: left 0.3s ease;
  padding-top: 60px;
  z-index: 999;

  @media screen and (max-width: 768px) {
    width: 200px;
    left: ${(props) => (props.isOpen ? "0" : "-200px")};
  }
`;

export const SidebarLink = styled(Link)`
  display: block;
  font-size: 1.2rem;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const SidebarToggle = styled.div`
  margin-left: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1000;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 1000;
  }
`;

export const SidebarLogout = styled.button`
  position: absolute;
  display: block;
  bottom: 20px;
  font-size: 1.2rem;
  width: 100%;
  padding: 10px 20px;
  background: transparent;
  backdrop-filter: blur(20px);
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
