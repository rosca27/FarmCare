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
  TitleComponent,
} from "../FarmDetailPage/FarmDetailPage.css";

export const Finances = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [finance, setFinance] = useState([]);
  const navigate = useNavigate();

  const { data: financeIndividual, customFetch: financeFetcher } =
    useCustomFetch(`http://localhost:4000/api/finances/farm/${id}`, "GET");

  useEffect(() => {
    financeFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (financeIndividual) {
      setFinance((financeIndividual as any).data);
    }
  }, [financeIndividual]);

  return (
    <UserDetailPageContainer>
      <Sidebar />
      <UserDetailMainBody>
        <FarmDetailHeader>
          <FarmDetailTitle>Finances</FarmDetailTitle>
        </FarmDetailHeader>
        <UserInfoContainer>
          {(finance as any).total_cost != null &&
            (finance as any).total_income != null && (
              <div>
                <p>
                  <strong>Total Costs Amount:</strong>{" "}
                  {(finance as any).total_cost}
                </p>
                <p>
                  <strong>Total Income Amount:</strong>{" "}
                  {(finance as any).total_income}
                </p>
                <p>
                  <strong>Net Income:</strong>{" "}
                  {(finance as any).total_income - (finance as any).total_cost}
                </p>
              </div>
            )}
        </UserInfoContainer>
        <FarmsPropertiesWrapper>
          <FarmPropertyWrapper>
            <TitleComponent>
              <h2>Costs</h2>
            </TitleComponent>
            <FarmDetailInfoContainer>
              {(finance as any).costs?.length > 0 ? (
                <div>
                  <FarmDetailsListContainer>
                    {(finance as any).costs.map((cost: any) => (
                      <div
                        onClick={() =>
                          navigate(
                            `/costs/${+cost.id}?farm_id=${
                              (finance as any).farm.id
                            }`
                          )
                        }
                      >
                        <FarmDetailCard key={(finance as any).costs.id}>
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
                <p>No costs found</p>
              )}
            </FarmDetailInfoContainer>
          </FarmPropertyWrapper>
          <FarmPropertyWrapper>
            <TitleComponent>
              <h2>Crops</h2>
            </TitleComponent>
            <FarmDetailInfoContainer>
              {(finance as any).crops?.length > 0 ? (
                <div>
                  <FarmDetailsListContainer>
                    {(finance as any).crops.map((crop: any) => (
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
        </FarmsPropertiesWrapper>
      </UserDetailMainBody>
    </UserDetailPageContainer>
  );
};
