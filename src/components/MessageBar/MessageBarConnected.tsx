import React from "react";
import { useGame } from "../../context/GameContext";
import { MessageBar } from "./MessageBar";

export const MessageBarConnected: React.FC = () => {
  const { message } = useGame();
  return <MessageBar text={message} />;
};