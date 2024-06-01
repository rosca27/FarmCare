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
import { CreateButton } from "../Users/Users.css";
import {
  FarmDetailButton,
  FarmDetailCard,
  FarmDetailInfoContainer,
  FarmDetailsListContainer,
  FarmPropertyWrapper,
  FarmsPropertiesWrapper,
  TitleComponent,
} from "../FarmDetailPage/FarmDetailPage.css";
import {
  CropDetailMainBody,
  CropDetailPageContainer,
  CropInfoWrapper,
  CropsPropertiesWrapper,
} from "./CropDetails.css";
import { RegisterGroup } from "../Register/Register.css";

export const CropDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [crop, setCrop] = useState();
  const [costs, setCosts] = useState([]);
  const navigate = useNavigate();
  const { data: cropData, customFetch: cropFetcher } = useCustomFetch(
    `http://localhost:4000/api/crops/${id}`,
    "GET"
  );

  const { data: costList, customFetch: costsFetcher } = useCustomFetch(
    `http://localhost:4000/api/costs/crop/${id}`,
    "GET"
  );

  useEffect(() => {
    cropFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    costsFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (cropData) {
      setCrop((cropData as any).data);
    }
  }, [cropData]);

  useEffect(() => {
    if (costList) {
      setCosts((costList as any).data);
    }
  }, [costList]);

  return (
    <CropDetailPageContainer>
      <Sidebar />
      <CropDetailMainBody>
        <UserDetailTitle>Crop Detail</UserDetailTitle>
        <CreateButton onClick={() => navigate(`/crops/${id}`)}>
          Edit Crop
        </CreateButton>
        <CropInfoWrapper>
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
          <CropsPropertiesWrapper>
            <FarmPropertyWrapper>
              <TitleComponent>
                <h2>Costs</h2>
                <FarmDetailButton
                  onClick={() =>
                    navigate(
                      `/costs/create?farm_id=${
                        (crop as any).farm_id
                      }&crop_id=${id}`
                    )
                  }
                >
                  Add Cost
                </FarmDetailButton>
              </TitleComponent>
              <FarmDetailInfoContainer>
                {costs.length > 0 ? (
                  <div>
                    <FarmDetailsListContainer>
                      {costs.map((cost: any) => (
                        <div
                          onClick={() =>
                            navigate(
                              `/costs/${cost.id}?farm_id=${
                                (crop as any).farm_id
                              }`
                            )
                          }
                        >
                          <FarmDetailCard key={cost.id}>
                            <h3>{cost.name}</h3>
                            <p>
                              <strong>Amount:</strong> {cost.amount}
                            </p>
                          </FarmDetailCard>
                        </div>
                      ))}
                    </FarmDetailsListContainer>
                  </div>
                ) : (
                  <p>No equipments found</p>
                )}
              </FarmDetailInfoContainer>
            </FarmPropertyWrapper>
          </CropsPropertiesWrapper>
        </CropInfoWrapper>
      </CropDetailMainBody>
    </CropDetailPageContainer>
  );
};
