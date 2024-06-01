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
import { Login } from "../Login/Login";

export function CropCreateEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [planting_date, setPlantingDate] = useState("");
  const [plant_type, setPlantType] = useState("");
  const [watering_interval_days, setWateringIntervalDays] = useState("");
  const [status, setStatus] = useState("");
  const [minimum_growing_days, setMinimumGrowingDays] = useState("");
  const [income, setIncome] = useState("");
  const [harvesting_date, setHarvestingDate] = useState("");
  const [plant_types, setPlantTypes] = useState([]);
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
    data: createdCropData,
    customFetch: cropFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/crops/${id}`
      : "http://localhost:4000/api/crops",
    isEditMode ? "PUT" : "POST"
  );

  const { data: cropData, customFetch: getCropFetcher } = useCustomFetch(
    `http://localhost:4000/api/crops/${id}`,
    "GET"
  );

  const { customFetch: deleteCropFetcher } = useCustomFetch(
    `http://localhost:4000/api/crops/${id}`,
    "DELETE"
  );

  const { data: farmList, customFetch: getFarmsFetcher } = useCustomFetch(
    role === "admin"
      ? `http://localhost:4000/api/farms`
      : `http://localhost:4000/api/farms/user/${user_id}`,
    "GET"
  );

  const { data: plantTypeList, customFetch: getPlantTypesFetcher } =
    useCustomFetch(`http://localhost:4000/api/plant_types`, "GET");

  useEffect(() => {
    if (isEditMode) {
      getCropFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    getPlantTypesFetcher(token as string);
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
    if (plantTypeList) {
      setPlantTypes((plantTypeList as any).data);
    }
  }, [plantTypeList]);

  useEffect(() => {
    if (farmList) {
      setFarms((farmList as any).data);
    }
  }, [farmList]);

  useEffect(() => {
    if (createdCropData) {
      if (role === "admin") {
        navigate("/crops");
      } else {
        navigate(`/crops/details/${(createdCropData as any).data.id}`);
      }
    }
  }, [createdCropData]);

  useEffect(() => {
    if (isEditMode && cropData) {
      const {
        name,
        description,
        planting_date,
        plant_type,
        watering_interval_days,
        status,
        farm,
        minimum_growing_days,
        income,
        harvesting_date,
        farm_id,
      } = (cropData as any).data;
      setName(name);
      setDescription(description);
      setFarm(farm);
      setFarmId(farm_id);
      setPlantingDate(planting_date.split("T")[0]);
      setPlantType(plant_type.id);
      setWateringIntervalDays(watering_interval_days);
      setStatus(status);
      setMinimumGrowingDays(minimum_growing_days);
      setIncome(income);
      setHarvestingDate(harvesting_date);
    }
  }, [cropData]);

  const handleDelete = async () => {
    await deleteCropFetcher(token as string, {})
      .then((response) => {
        if (role === "admin") {
          navigate("/crops");
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
      console.log(status);
      await cropFetcher(token as string, {
        name: name,
        description: description,
        farm_id: farm_id,
        planting_date: planting_date,
        plant_type_id: plant_type,
        watering_interval_days: watering_interval_days,
        status: status,
        minimum_growing_days: minimum_growing_days,
        income: income,
        harvesting_date: harvesting_date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>{isEditMode ? "Edit Crop" : "Create Crop"}</LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <LoginInputBox>
            <LoginLabel htmlFor="name">Name</LoginLabel>
            <LoginInput
              type="text"
              id="name"
              placeholder="Enter the crop's name"
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
              placeholder="Enter the crop's description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </LoginInputBox>
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="planting_date">Planting Date</LoginLabel>
              <LoginInput
                type="date"
                id="planting_date"
                value={planting_date.split("T")[0]}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="plant_type">Plant Type</LoginLabel>
              <CreateSelect
                id="plant_type"
                value={plant_type}
                onChange={(e) => setPlantType(e.target.value)}
                required
              >
                <option value="">Select plant type</option>
                {plant_types &&
                  (plant_types as any).map((plantType: any) => (
                    <option key={plantType.id} value={plantType.id}>
                      {plantType.name}
                    </option>
                  ))}
              </CreateSelect>
            </LoginInputBox>
          </RegisterGroup>
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="watering_interval_days">
                Watering Interval Days
              </LoginLabel>
              <LoginInput
                type="number"
                id="watering_interval_days"
                value={watering_interval_days}
                onChange={(e) => setWateringIntervalDays(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="status">Status</LoginLabel>
              <CreateSelect
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                <option value="planted">planted</option>
                <option value="ready to harvest">ready to harvest</option>
                <option value="harvested">harvested</option>
              </CreateSelect>
            </LoginInputBox>
          </RegisterGroup>
          <RegisterGroup>
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
            <LoginInputBox>
              <LoginLabel htmlFor="minimum_growing_days">
                Minimum Growing Days
              </LoginLabel>
              <LoginInput
                type="number"
                id="minimum_growing_days"
                value={minimum_growing_days}
                onChange={(e) => setMinimumGrowingDays(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="income">Income</LoginLabel>
              <LoginInput
                type="number"
                id="income"
                value={income ?? 0}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="harvesting_date">Harvesting Date</LoginLabel>
              <LoginInput
                type="date"
                id="harvesting_date"
                value={harvesting_date?.split("T")[0] ?? ""}
                onChange={(e) => setHarvestingDate(e.target.value)}
              />
            </LoginInputBox>
          </RegisterGroup>
          <LoginButton type="submit">
            {isEditMode ? "Update Crop" : "Create Crop"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Crop</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
