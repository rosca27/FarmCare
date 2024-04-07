import React, { useState, useEffect } from "react";
import {
  CreateButton,
  UserComponent,
  UserComponentList,
  UserComponenth1,
  UserTable,
  UserTableContainer, // Import UserTableContainer
} from "../Users/Users.css";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export function Farms() {
  const [farms, setFarms] = useState([]);
  const { token } = useAuth();
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const { data, customFetch: userFetcher } = useCustomFetch(
    role === "admin"
      ? "http://localhost:4000/api/farms"
      : `http://localhost:4000/api/farms/user/${user_id}`,
    "GET"
  );

  useEffect(() => {
    userFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setFarms((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>Farms List</UserComponenth1>
        <CreateButton onClick={() => navigate("/farms/create")}>
          Create Farm
        </CreateButton>
        <UserTableContainer>
          {farms.map((farm: any) => (
            <div onClick={() => navigate(`/farms/details/${farm.id}`)}>
              <Card key={farm.id}>
                <h2>{farm.name}</h2>
                <p>
                  <strong>Farm Location:</strong> {farm.location}
                </p>
                {farm.user?.first_name && farm.user?.last_name && (
                  <p>
                    <strong>Farmer:</strong> {farm.user.first_name}{" "}
                    {farm.user.last_name}
                  </p>
                )}
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
