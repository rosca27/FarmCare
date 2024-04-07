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

export function Crops() {
  const [crops, setCrops] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { data, customFetch: userFetcher } = useCustomFetch(
    "http://localhost:4000/api/crops",
    "GET"
  );

  useEffect(() => {
    userFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setCrops((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>Crop List</UserComponenth1>
        <CreateButton onClick={() => navigate("/crops/create")}>
          Create crop
        </CreateButton>
        <UserTableContainer>
          {crops.map((crop: any) => (
            <div onClick={() => navigate(`/crops/${crop.id}`)}>
              <Card key={crop.id}>
                <h2>{crop.name}</h2>
                <p>
                  <strong>Description:</strong> {crop.description}
                </p>
                <p>
                  <strong>Planting Date:</strong>{" "}
                  {crop.planting_date.split("T")[0]}
                </p>
                <p>
                  <strong>Plant Type:</strong> {crop.plant_type.name}
                </p>
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
