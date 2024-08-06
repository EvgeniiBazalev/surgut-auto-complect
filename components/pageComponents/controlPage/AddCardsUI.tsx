"use client";

import React, { useState } from "react";
import { Button, Input, Spin, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { uploadDataForMainCard } from "@/support/functions/uploadDataForMainCard";

export const AddCardsUI = ({ user }: { user: string }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    designation: "",
    content: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCardInfo({ ...cardInfo, [field]: value });
  };

  const handleAddCard = async () => {
    setLoading(true);
    try {
      await uploadDataForMainCard(cardInfo);
      setCardInfo({
        name: "",
        designation: "",
        content: "",
        url: "",
      });
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Input
          placeholder="Наименование промо акции"
          className="mt-4 w-full"
          value={cardInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <Input
          placeholder="Обозначение"
          className="mt-4 w-full"
          value={cardInfo.designation}
          onChange={(e) => handleInputChange("designation", e.target.value)}
        />
        <TextArea
          placeholder="Описание"
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
        <Button
          type="default"
          className="mt-4"
          onClick={handleAddCard}
          disabled={loading}
        >
          Add Card
        </Button>
      </Spin>
      <Modal
        title="Успех"
        open={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded type-default",
        }}
      >
        <p>Товар добавлен на сайт!</p>
      </Modal>
    </div>
  );
};
