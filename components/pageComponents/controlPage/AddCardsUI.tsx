"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { uploadDataForMainCard } from "@/support/functions/uploadDataForMainCard";

export const AddCardsUI = ({ user }: { user: string }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    designation: "",
    content: "",
    url: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCardInfo({ ...cardInfo, [field]: value });
  };

  const handleAddCard = async () => {
    try {
      await uploadDataForMainCard(cardInfo);
      setCardInfo({
        name: "",
        designation: "",
        content: "",
        url: "",
      });
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Name"
        className="mt-4 w-full"
        value={cardInfo.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Input
        placeholder="Designation"
        className="mt-4 w-full"
        value={cardInfo.designation}
        onChange={(e) => handleInputChange("designation", e.target.value)}
      />
      <TextArea
        placeholder="Description"
        className="mt-4 w-full"
        value={cardInfo.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
      />
      <Input
        placeholder="URL"
        className="mt-4 w-full"
        value={cardInfo.url}
        onChange={(e) => handleInputChange("url", e.target.value)}
      />
      <Button type="default" className="mt-4" onClick={handleAddCard}>
        Add Card
      </Button>
    </div>
  );
};
