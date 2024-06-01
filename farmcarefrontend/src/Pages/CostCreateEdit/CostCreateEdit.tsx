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

export function CreateEditCost() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const farm_id = queryParams.get("farm_id");
  const crop_id_query = queryParams.get("crop_id");
  const [crop_id, setCropId] = useState(crop_id_query ? crop_id_query : "");
  const [crops, setCrops] = useState([]);
  const { token, setToken } = useAuth();
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const {
    loading,
    error,
    data: createdCostData,
    customFetch: costFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/costs/${id}`
      : "http://localhost:4000/api/costs",
    isEditMode ? "PUT" : "POST"
  );

  const { data: costData, customFetch: getCostFetcher } = useCustomFetch(
    `http://localhost:4000/api/costs/${id}`,
    "GET"
  );

  const { customFetch: deleteCostFetcher } = useCustomFetch(
    `http://localhost:4000/api/costs/${id}`,
    "DELETE"
  );

  const { data: cropList, customFetch: getCropsFetcher } = useCustomFetch(
    role === "admin"
      ? `http://localhost:4000/api/crops`
      : `http://localhost:4000/api/crops/farm/${farm_id}`,
    "GET"
  );

  useEffect(() => {
    if (isEditMode) {
      getCostFetcher(token as string);
      console.log(farm_id);
    }
  }, []);

  useEffect(() => {
    getCropsFetcher(token as string);
  }, []);

  useEffect(() => {
    if (cropList) {
      setCrops((cropList as any).data);
    }
  }, [cropList]);

  useEffect(() => {
    if (isEditMode && costData) {
      const { name, amount, crop_id } = (costData as any).data;
      setName(name);
      setAmount(amount);
      setCropId(crop_id);
    }
  }, [costData]);

  useEffect(() => {
    if (createdCostData) {
      navigate(`/crops/details/${crop_id}`);
    }
  }, [createdCostData]);

  const handleDelete = async () => {
    await deleteCostFetcher(token as string, {})
      .then((response) => {
        navigate(`/crops/details/${crop_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await costFetcher(token as string, {
        name: name,
        amount: amount,
        crop_id: crop_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>{isEditMode ? "Edit Cost" : "Create Cost"}</LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="name">Name</LoginLabel>
              <LoginInput
                type="text"
                id="name"
                placeholder="Enter the cost's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="amount">Amount</LoginLabel>
              <LoginInput
                type="text"
                id="amount"
                placeholder="Enter the cost amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          <LoginInputBox>
            <LoginLabel htmlFor="role">Crop</LoginLabel>
            <CreateSelect
              id="role"
              value={crop_id}
              onChange={(e) => setCropId(e.target.value)}
              required
            >
              <option value="">Select farm</option>
              {crops.map((crop: any) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </CreateSelect>
          </LoginInputBox>
          <LoginButton type="submit">
            {isEditMode ? "Update Cost" : "Create Cost"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Cost</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
