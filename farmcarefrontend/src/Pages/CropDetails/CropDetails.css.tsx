import styled from "styled-components";

export const CropDetailPageContainer = styled.div`
  display: flex;
  background: url("../../images/pexels-karol-wiśniewski-878297.jpg") no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const CropDetailMainBody = styled.div`
  background-color: transparent;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 95%;
  border-radius: 10px;
  color: white;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const CropInfoWrapper = styled.div`
  background-color: transparent;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
  border-radius: 10px;
  color: white;
`;

export const CropsPropertiesWrapper = styled.div`
  display: flex;
  height: 95%;
  padding-left: 20px;
  padding-top: 20px;
  width: 50%;
  margin: 20px;
  border-radius: 10px;
  justify-content: center;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1);
  scrollbar-width: none;
  -ms-overflow-style: none;
  }
`;
