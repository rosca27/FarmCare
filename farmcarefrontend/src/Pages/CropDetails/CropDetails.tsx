import React, { useEffect, useState } from "react";
import useCustomFetch from "../../Hooks/useCustomFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  FarmInfoContainer,
  FarmInfoWrapper,
  ListContainer,
  UserDetailMainBody,
  UserDetailPageContainer,
  UserDetailTitle,
  UserInfoContainer,
} from "../UserDetailPage/UserDetailPage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

export const CropDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [crop, setCrop] = useState();
  const navigate = useNavigate();
  const { data: cropData, customFetch: cropFetcher } = useCustomFetch(
    `http://localhost:4000/api/crops/${id}`,
    "GET"
  );
  useEffect(() => {
    cropFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (cropData) {
      setCrop((cropData as any).data);
    }
  }, [cropData]);

  return (
    <UserDetailPageContainer>
      <Sidebar />
      <UserDetailMainBody>
        <UserDetailTitle>Crop Detail</UserDetailTitle>
        <UserInfoContainer>
          {crop && (
            <div>
              <h2>{(crop as any).name}</h2>
              <p>
                <strong>Plant Type: </strong> {(crop as any).plant_type.name}
              </p>
              <p>
                <strong>Description: </strong> {(crop as any).description}
              </p>
              <p>
                <strong>Planting date: </strong>
                {(crop as any).planting_date.split("T")[0]}
              </p>
              <p>
                <strong>Watering interval in days: </strong>
                {(crop as any).watering_interval_days}
              </p>
              <p>
                <strong>Status: </strong>
                {(crop as any).status}
              </p>
              <p>
                <strong>Watering interval in days: </strong>{" "}
                {(crop as any).watering_interval_days}
              </p>
              <p>
                <strong>Minimum growing days: </strong>{" "}
                {(crop as any).minimum_growing_days}
              </p>
              <p>
                <strong>Income: </strong> {(crop as any).income ?? 0}
              </p>
              <p>
                <strong>Harvested date: </strong>{" "}
                {(crop as any).harvesting_date ?? "Not harvested yet"}
              </p>
            </div>
          )}
        </UserInfoContainer>
      </UserDetailMainBody>
    </UserDetailPageContainer>
  );
};
