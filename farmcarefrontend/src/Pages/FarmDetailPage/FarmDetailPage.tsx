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
import Card from "../../Components/Card";
import { CreateButton, UserTableContainer } from "../Users/Users.css";
import {
  FarmDetailButton,
  FarmDetailCard,
  FarmDetailHeader,
  FarmDetailInfoContainer,
  FarmDetailTitle,
  FarmDetailsListContainer,
  FarmPropertyWrapper,
  FarmsPropertiesWrapper,
  FinanceButton,
  NotificationButton,
  TitleComponent,
} from "./FarmDetailPage.css";

export const FarmDetailpage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [farm, setFarm] = useState([]);
  const [crops, setCrops] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate();

  const { data: farmGet, customFetch: farmFetcher } = useCustomFetch(
    `http://localhost:4000/api/farms/${id}`,
    "GET"
  );

  const { data: cropsList, customFetch: cropFetcher } = useCustomFetch(
    `http://localhost:4000/api/crops/farm/${id}`,
    "GET"
  );

  const { data: equipmentList, customFetch: equipmentFetcher } = useCustomFetch(
    `http://localhost:4000/api/equipments/farm/${id}`,
    "GET"
  );

  const { data: inventoryList, customFetch: inventoryFetcher } = useCustomFetch(
    `http://localhost:4000/api/inventory/farm/${id}`,
    "GET"
  );

  useEffect(() => {
    farmFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    cropFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    equipmentFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    inventoryFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (cropsList) {
      setCrops((cropsList as any).data);
    }
  }, [cropsList]);

  useEffect(() => {
    if (farmGet) {
      setFarm((farmGet as any).data);
      console.log(farmGet);
    }
  }, [farmGet]);

  useEffect(() => {
    if (equipmentList) {
      setEquipments((equipmentList as any).data);
    }
  }, [equipmentList]);

  useEffect(() => {
    if (inventoryList) {
      setInventories((inventoryList as any).data);
    }
  }, [inventoryList]);

  return (
    <UserDetailPageContainer>
      <Sidebar />
      <UserDetailMainBody>
        <FarmDetailHeader>
          <FarmDetailTitle>Farm Detail</FarmDetailTitle>
          <NotificationButton
            onClick={() => navigate(`/notifications/farm/${id}`)}
          >
            Notifications
          </NotificationButton>
          <FinanceButton onClick={() => navigate(`/finances/farm/${id}`)}>
            Finances
          </FinanceButton>
          <CreateButton onClick={() => navigate(`/farms/${id}`)}>
            Edit Farm
          </CreateButton>
        </FarmDetailHeader>
        <UserInfoContainer>
          {farm && (
            <div>
              <h2>{(farm as any).name}</h2>
              <p>
                <strong>Location:</strong> {(farm as any).location}
              </p>
            </div>
          )}
        </UserInfoContainer>
        <FarmsPropertiesWrapper>
          <FarmPropertyWrapper>
            <TitleComponent>
              <h2>Equipments</h2>
              <FarmDetailButton
                onClick={() =>
                  navigate(`/equipments/create?farm_id=${(farm as any).id}`)
                }
              >
                Add Equipment
              </FarmDetailButton>
            </TitleComponent>
            <FarmDetailInfoContainer>
              {equipments.length > 0 ? (
                <div>
                  <FarmDetailsListContainer>
                    {equipments.map((equipment: any) => (
                      <div
                        onClick={() => navigate(`/equipments/${equipment.id}`)}
                      >
                        <FarmDetailCard key={equipment.id}>
                          <h3>{equipment.name}</h3>
                          <p>
                            <strong>Description:</strong>{" "}
                            {equipment.description}
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
          <FarmPropertyWrapper>
            <TitleComponent>
              <h2>Crops</h2>
              <FarmDetailButton
                onClick={() =>
                  navigate(`/crops/create?farm_id=${(farm as any).id}`)
                }
              >
                Add Crop
              </FarmDetailButton>
            </TitleComponent>
            <FarmDetailInfoContainer>
              {crops.length > 0 ? (
                <div>
                  <FarmDetailsListContainer>
                    {crops.map((crop: any) => (
                      <div
                        onClick={() => navigate(`/crops/details/${crop.id}`)}
                      >
                        <FarmDetailCard key={crop.id}>
                          <h3>{crop.name}</h3>
                          <p>
                            <strong>Description:</strong> {crop.description}
                          </p>
                          <p>
                            <strong>Planting date:</strong>{" "}
                            {crop.planting_date.split("T")[0]}
                          </p>
                          <p>
                            <strong>Status:</strong> {crop.status}
                          </p>
                        </FarmDetailCard>
                      </div>
                    ))}
                  </FarmDetailsListContainer>
                </div>
              ) : (
                <p>No crops found</p>
              )}
            </FarmDetailInfoContainer>
          </FarmPropertyWrapper>
          <FarmPropertyWrapper>
            <TitleComponent>
              <h2>Inventories</h2>
              <FarmDetailButton
                onClick={() =>
                  navigate(`/inventories/create?farm_id=${(farm as any).id}`)
                }
              >
                Add Inventory
              </FarmDetailButton>
            </TitleComponent>
            <FarmDetailInfoContainer>
              {inventories.length > 0 ? (
                <div>
                  <FarmDetailsListContainer>
                    {inventories.map((inventory: any) => (
                      <div
                        onClick={() => navigate(`/inventories/${inventory.id}`)}
                      >
                        <FarmDetailCard key={inventory.id}>
                          <p>
                            <strong>Plant:</strong> {inventory.plant_type.name}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {inventory.quantity}
                          </p>
                        </FarmDetailCard>
                      </div>
                    ))}
                  </FarmDetailsListContainer>
                </div>
              ) : (
                <p>No inventories found</p>
              )}
            </FarmDetailInfoContainer>
          </FarmPropertyWrapper>
        </FarmsPropertiesWrapper>
      </UserDetailMainBody>
    </UserDetailPageContainer>
  );
};
