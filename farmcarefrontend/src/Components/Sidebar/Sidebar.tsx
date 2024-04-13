import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarLink,
  SidebarLogout,
  SidebarToggle,
  SidebarWrapper,
} from "./Sidebar.css";
import { useAuth } from "../../Context/AuthContext";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { token, setToken } = useAuth();
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

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

  const logout = () => {
    setToken(null);
    navigate("/auth/login");
  };

  return (
    <>
      {visible && (
        <SidebarToggle onClick={toggleSidebar}>&#9776;</SidebarToggle>
      )}
      <SidebarWrapper isOpen={!isOpen}>
        {token && role === "admin" && (
          <>
            <SidebarLink to="/users">Users</SidebarLink>
            <SidebarLink to="/equipments">Equipments</SidebarLink>
            <SidebarLink to="/crops">Crops</SidebarLink>
            <SidebarLink to="/farms">Farms</SidebarLink>
            <SidebarLink to="/inventories">Inventories</SidebarLink>
            <SidebarLink to="/plant_types">Plant Types</SidebarLink>
          </>
        )}
        {token ? (
          <SidebarLogout onClick={logout}>Logout</SidebarLogout>
        ) : (
          <SidebarLink to="/auth/login">Login</SidebarLink>
        )}
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
