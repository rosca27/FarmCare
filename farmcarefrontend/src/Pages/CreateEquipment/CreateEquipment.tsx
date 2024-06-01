import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../../Hooks/useCustomFetch";

import {
  LoginButton,
  LoginComponent,
  LoginInput,
  LoginInputBox,
  LoginLabel,
  LoginLink,
  LoginLinkA,
  LoginTitle,
  LoginWrapper,
} from "../Login/Login.css";
import { RegisterGroup } from "../Register/Register.css";
import { useAuth } from "../../Context/AuthContext";
import { CreateSelect } from "../CreateUser/CreateUser.css";

export function CreateEditEquipment() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [farm, setFarm] = useState({});
  const [farms, setFarms] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const farm_id_query = queryParams.get("farm_id");
  const [farm_id, setFarmId] = useState(farm_id_query ? farm_id_query : "");
  const { token, setToken } = useAuth();
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const {
    loading,
    error,
    data: createdEquipmentData,
    customFetch: equipmentFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/equipments/${id}`
      : "http://localhost:4000/api/equipments",
    isEditMode ? "PUT" : "POST"
  );

  const { data: equipmentData, customFetch: getEquipmentFetcher } =
    useCustomFetch(`http://localhost:4000/api/equipments/${id}`, "GET");

  const { customFetch: deleteEquipmentFetcher } = useCustomFetch(
    `http://localhost:4000/api/equipments/${id}`,
    "DELETE"
  );

  const { data: farmList, customFetch: getFarmsFetcher } = useCustomFetch(
    role === "admin"
      ? `http://localhost:4000/api/farms`
      : `http://localhost:4000/api/farms/user/${user_id}`,
    "GET"
  );

  useEffect(() => {
    if (isEditMode) {
      getEquipmentFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    getFarmsFetcher(token as string);
  }, []);

  useEffect(() => {
    if (farmList) {
      setFarms((farmList as any).data);
    }
  }, [farmList]);

  useEffect(() => {
    if (isEditMode && equipmentData) {
      const { name, description, farm, farm_id } = (equipmentData as any).data;
      setName(name);
      setDescription(description);
      setFarm(farm);
      setFarmId(farm_id);
    }
  }, [equipmentData]);

  useEffect(() => {
    if (createdEquipmentData) {
      if (role === "admin") {
        navigate("/equipments");
      } else {
        navigate(`/farms/details/${farm_id}`);
      }
    }
  }, [createdEquipmentData]);

  const handleDelete = async () => {
    await deleteEquipmentFetcher(token as string, {})
      .then((response) => {
        if (role === "admin") {
          navigate("/equipments");
        } else {
          navigate(`/farms/details/${farm_id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await equipmentFetcher(token as string, {
        name: name,
        description: description,
        farm_id: farm_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>
            {isEditMode ? "Edit Equipment" : "Create Equipment"}
          </LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="name">Name</LoginLabel>
              <LoginInput
                type="text"
                id="name"
                placeholder="Enter the quipment's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="description">Description</LoginLabel>
              <LoginInput
                type="text"
                id="description"
                placeholder="Enter the equipment's description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          <LoginInputBox>
            <LoginLabel htmlFor="role">Farm</LoginLabel>
            <CreateSelect
              id="role"
              value={farm_id}
              onChange={(e) => setFarmId(e.target.value)}
              required
            >
              <option value="">Select farm</option>
              {farms.map((farm: any) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </CreateSelect>
          </LoginInputBox>
          <LoginButton type="submit">
            {isEditMode ? "Update Equipment" : "Create Equipment"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Equipment</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
