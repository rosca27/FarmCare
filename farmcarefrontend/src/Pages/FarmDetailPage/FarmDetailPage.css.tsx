import styled from "styled-components";

export const FarmsPropertiesWrapper = styled.div`
  display: flex;
  height: 100%;
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px;
  border-radius: 10px;
  justify-content: center;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const FarmListContainer = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const FarmDetailInfoContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  height: 100%;
  border-radius: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const FarmDetailCard = styled.div`
  background: transparent;
  backdrop-filter: blur(20px);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const FarmPropertyWrapper = styled.div`
  display: flex;
  height: 100%;
  padding-left: 20px;
  width: 80%;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
`;

export const TitleComponent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
`;

export const FarmDetailButton = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export const FarmDetailsListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;
