import React, { useState, useEffect } from "react";
import {
  CreateButton,
  UserComponent,
  UserComponentList,
  UserComponenth1,
  UserTable,
  UserTableContainer,
} from "../Users/Users.css";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export function Inventories() {
  const [inventories, setInventories] = useState([]);
  const { token } = useAuth();
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const { data, customFetch: inventoriesFetcher } = useCustomFetch(
    "http://localhost:4000/api/inventory",
    "GET"
  );

  useEffect(() => {
    inventoriesFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setInventories((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>Inventory List</UserComponenth1>
        <CreateButton onClick={() => navigate("/inventories/create")}>
          Create Inventory
        </CreateButton>
        <UserTableContainer>
          {inventories.map((inventory: any) => (
            <div onClick={() => navigate(`/inventories/${inventory.id}`)}>
              <Card key={inventory.id}>
                <h2>{inventory.plant_type.name}</h2>
                <p>
                  <strong>Quantity:</strong> {inventory.quantity}
                </p>
                <p>
                  <strong>Farm:</strong> {inventory.farm.name}
                </p>
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
