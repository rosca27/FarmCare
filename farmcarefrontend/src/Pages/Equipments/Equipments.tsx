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

export function Equipments() {
  const [equipments, setEquipments] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { data, customFetch: userFetcher } = useCustomFetch(
    "http://localhost:4000/api/equipments",
    "GET"
  );

  useEffect(() => {
    userFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setEquipments((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>Equipment List</UserComponenth1>
        <CreateButton onClick={() => navigate("/equipments/create")}>
          Create Equipment
        </CreateButton>
        <UserTableContainer>
          {equipments.map((equipment: any) => (
            <div onClick={() => navigate(`/equipments/${equipment.id}`)}>
              <Card key={equipment.id}>
                <p>
                  <strong>Name:</strong> {equipment.name}
                </p>
                <p>
                  <strong>Description:</strong> {equipment.description}
                </p>
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
