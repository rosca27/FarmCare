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

export function PlantTypes() {
  const [plantTypes, setPlantTypes] = useState([]);
  const { token } = useAuth();
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const { data, customFetch: plantTypesFetcher } = useCustomFetch(
    "http://localhost:4000/api/plant_types",
    "GET"
  );

  useEffect(() => {
    plantTypesFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setPlantTypes((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>Plant Types List</UserComponenth1>
        <CreateButton onClick={() => navigate("/plant_types/create")}>
          Create Inventory
        </CreateButton>
        <UserTableContainer>
          {plantTypes.map((plant_type: any) => (
            <div onClick={() => navigate(`/plant_types/${plant_type.id}`)}>
              <Card key={plant_type.id}>
                <h2>{plant_type.name}</h2>
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
