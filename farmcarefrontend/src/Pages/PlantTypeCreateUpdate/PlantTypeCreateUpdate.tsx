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

export function PlantTypeCreateEdit() {
  const [name, setName] = useState("");
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
      ? `http://localhost:4000/api/plant_types/${id}`
      : "http://localhost:4000/api/plant_types",
    isEditMode ? "PUT" : "POST"
  );

  const { data: plantTypeData, customFetch: getPlantTypeFetcher } =
    useCustomFetch(`http://localhost:4000/api/plant_types/${id}`, "GET");

  const { customFetch: deleteInventoryFetcher } = useCustomFetch(
    `http://localhost:4000/api/plant_types/${id}`,
    "DELETE"
  );

  useEffect(() => {
    if (isEditMode) {
      getPlantTypeFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    if (isEditMode && plantTypeData) {
      const { name } = (plantTypeData as any).data;
      setName(name);
    }
  }, [plantTypeData]);

  const handleDelete = async () => {
    await deleteInventoryFetcher(token as string, {})
      .then((response) => {
        navigate(`/plant_types`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditMode) {
      await inventoryFetcher(token as string, {
        name: name,
      })
        .then((response) => {
          navigate(`/plant_types`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await inventoryFetcher(token as string, {
        name: name,
      })
        .then((response) => {
          navigate(`/plant_types`);
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
            {isEditMode ? "Edit Plant Type" : "Create Plant Type"}
          </LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <LoginInputBox>
            <LoginLabel htmlFor="name">Quantity</LoginLabel>
            <LoginInput
              type="text"
              id="name"
              placeholder="Enter the plant type name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </LoginInputBox>
          <LoginButton type="submit">
            {isEditMode ? "Update Plant Type" : "Create Plant Type"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Plant Type</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
