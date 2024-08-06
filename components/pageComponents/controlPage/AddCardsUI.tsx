"use client";

import React, { useState } from "react";
import { Button, Input, Spin, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { uploadDataForMainCard } from "@/support/functions/uploadDataForMainCard";
import { uploadImageToStorage } from "@/support/functions/uploadImageToStorage";
import { UploadOutlined } from "@ant-design/icons";

export const AddCardsUI = ({ user }: { user: string }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    designation: "",
    content: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setCardInfo({ ...cardInfo, [field]: value });
  };

  const handleAddCard = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (file) {
        const imageUploadResponse = await uploadImageToStorage(file, user);
        imageUrl = imageUploadResponse?.path || "";
      }

      await uploadDataForMainCard({ ...cardInfo, url: imageUrl });
      setCardInfo({
        name: "",
        designation: "",
        content: "",
        url: "",
      });
      setFile(null); // сброс файла
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ file }: any) => {
    setFile(file.originFileObj);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Input
          placeholder="Название акции"
          className="mt-4 w-full"
          value={cardInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <Input
          placeholder="Промо акции"
          className="mt-4 w-full"
          value={cardInfo.designation}
          onChange={(e) => handleInputChange("designation", e.target.value)}
        />
        <TextArea
          placeholder="Описание акции"
          className="mt-4 w-full"
          value={cardInfo.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
        <Upload
          beforeUpload={() => false} // Отключить автоматическую загрузку
          onChange={handleFileChange}
          className="mt-4 w-full"
        >
          <Button icon={<UploadOutlined />} className="mt-4">
            Загрузить изображение
          </Button>
        </Upload>
        <Button
          type="default"
          className="mt-4"
          onClick={handleAddCard}
          disabled={loading}
        >
          Добавить промо
        </Button>
      </Spin>
      <Modal
        title="Успех"
        open={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        }}
      >
        <p>Промо акция добавлена на сайт!</p>
      </Modal>
    </div>
  );
};
