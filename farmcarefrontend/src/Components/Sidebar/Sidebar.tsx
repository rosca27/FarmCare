import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarLink,
  SidebarLogout,
  SidebarToggle,
  SidebarWrapper,
} from "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {visible && (
        <SidebarToggle onClick={toggleSidebar}>&#9776;</SidebarToggle>
      )}
      <SidebarWrapper isOpen={isOpen}>
        <SidebarLink to="/users">Users</SidebarLink>
        <SidebarLink to="/equipment">Equipment</SidebarLink>
        <SidebarLink to="/crops">Crops</SidebarLink>
        <SidebarLogout onClick={() => console.log("Logout clicked")}>
          Logout
        </SidebarLogout>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
