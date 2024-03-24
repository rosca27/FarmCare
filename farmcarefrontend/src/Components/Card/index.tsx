import React, { ReactNode } from "react";
import "./CardStyle.css";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="cardComponent">{children}</div>;
};

export default Card;
