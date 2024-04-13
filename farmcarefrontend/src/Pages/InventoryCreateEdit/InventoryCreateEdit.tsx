import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

export function InventoryCreateEdit() {
  const [quantity, setQuantity] = useState("");
  const [plant_type_id, setPlantTypeId] = useState("");
  const [farm_id, setFarmId] = useState("");
  const [farms, setFarms] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  const { token, setToken } = useAuth();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const {
    loading,
    error,
    data,
    customFetch: inventoryFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/inventory/${id}`
      : "http://localhost:4000/api/inventory",
    isEditMode ? "PUT" : "POST"
  );

  const { data: inventoryData, customFetch: getInventoryFetcher } =
    useCustomFetch(`http://localhost:4000/api/inventory/${id}`, "GET");

  const { customFetch: deleteInventoryFetcher } = useCustomFetch(
    `http://localhost:4000/api/inventory/${id}`,
    "DELETE"
  );

  const { data: farmList, customFetch: getFarmsFetcher } = useCustomFetch(
    `http://localhost:4000/api/farms`,
    "GET"
  );

  const { data: plantTypeList, customFetch: getPlantTypesFetcher } =
    useCustomFetch(`http://localhost:4000/api/plant_types`, "GET");

  useEffect(() => {
    if (isEditMode) {
      getInventoryFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    getFarmsFetcher(token as string);
  }, []);

  useEffect(() => {
    getPlantTypesFetcher(token as string);
  }, []);

  useEffect(() => {
    if (farmList) {
      setFarms((farmList as any).data);
    }
  }, [farmList]);

  useEffect(() => {
    if (plantTypeList) {
      setPlantTypes((plantTypeList as any).data);
    }
  }, [plantTypeList]);

  useEffect(() => {
    if (isEditMode && inventoryData) {
      const { id, quantity, plant_type_id, farm_id } = (inventoryData as any)
        .data;
      setQuantity(quantity);
      setPlantTypeId(plant_type_id);
      setFarmId(farm_id);
    }
  }, [inventoryData]);

  const handleDelete = async () => {
    await deleteInventoryFetcher(token as string, {})
      .then((response) => {
        if (role === "admin") {
          navigate("/inventories");
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

    if (!isEditMode) {
      await inventoryFetcher(token as string, {
        quantity: quantity,
        plant_type_id: plant_type_id,
        farm_id: farm_id,
      })
        .then((response) => {
          if (role === "admin") {
            navigate("/inventories");
          } else {
            navigate(`/farms/details/${farm_id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await inventoryFetcher(token as string, {
        quantity: quantity,
        plant_type_id: plant_type_id,
        farm_id: farm_id,
      })
        .then((response) => {
          if (role === "admin") {
            navigate("/inventories");
          } else {
            navigate(`/farms/details/${farm_id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>
            {isEditMode ? "Edit Inventory" : "Create Inventory"}
          </LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="name">Quantity</LoginLabel>
              <LoginInput
                type="text"
                id="name"
                placeholder="Enter the inventory quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          <LoginInputBox>
            <LoginLabel htmlFor="plant_type_id">Plant Type</LoginLabel>
            <CreateSelect
              id="plant_type_id"
              value={plant_type_id}
              onChange={(e) => setPlantTypeId(e.target.value)}
              required
            >
              <option value="">Select Plant Type</option>
              {plantTypes.map((plant_type: any) => (
                <option key={plant_type.id} value={plant_type.id}>
                  {plant_type.name}
                </option>
              ))}
            </CreateSelect>
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="farm_id">Farm</LoginLabel>
            <CreateSelect
              id="farm_id"
              value={farm_id}
              onChange={(e) => setFarmId(e.target.value)}
              required
            >
              <option value="">Select Farm</option>
              {farms.map((farm: any) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </CreateSelect>
          </LoginInputBox>
          <LoginButton type="submit">
            {isEditMode ? "Update Inventory" : "Create Inventory"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Inventory</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
