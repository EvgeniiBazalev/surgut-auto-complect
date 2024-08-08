"use client";

import React, { useState } from "react";
import { Button, Input, Spin, Modal, Upload } from "antd";

import { uploadDataForMainCard } from "@/support/functions/uploadDataForMainCard";
import { uploadImageToStorage } from "@/support/functions/uploadImageToStorage";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
export const AddCardsUI = () => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    designation: "",
    content: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setCardInfo({ ...cardInfo, [field]: value });
  };

  const handleAddCard = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (file) {
        console.log("File найден");
        const imageUploadResponse = await uploadImageToStorage(file);
        imageUrl = imageUploadResponse?.publicURL || "";
        console.log("Image URL:", imageUrl);
      }

      await uploadDataForMainCard({ ...cardInfo, url: imageUrl });
      setCardInfo({
        name: "",
        designation: "",
        content: "",
        url: "",
      });
      setFile(null); // сброс файла
      setFileList([]); // сброс списка файлов
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info: any) => {
    const { fileList } = info;
    if (fileList.length > 0) {
      const uploadedFile = fileList[0].originFileObj;
      if (uploadedFile) {
        console.log("File info:", uploadedFile);
        setFile(uploadedFile);
        setFileList(fileList); // Обновите список файлов
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 my-4 bg-white shadow-md rounded-lg border border-gray-200 w-[600px] h-full">
      <h2 className="text-2xl font-bold mb-4">Добавить промо</h2>
      <Spin spinning={loading}>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Название акции"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={cardInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Промо акции"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={cardInfo.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
            />
          </div>
          <div>
            <TextArea
              rows={4}
              placeholder="Описание акции"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={cardInfo.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
            />
          </div>
          <div>
            <Upload
              beforeUpload={() => false} // Отключить автоматическую загрузку
              onChange={handleFileChange}
              fileList={fileList} // Передайте обновленный список файлов
              className="w-full"
            >
              <Button
                icon={<UploadOutlined />}
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Загрузить изображение
              </Button>
            </Upload>
          </div>
          <div>
            <Button
              type="default"
              className="w-full bg-green-500 text-white hover:bg-green-600"
              onClick={handleAddCard}
              disabled={loading}
            >
              Добавить промо
            </Button>
          </div>
        </div>
      </Spin>
      <Modal
        title="Успех"
        open={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
        }}
      >
        <p>Промо акция добавлена на сайт!</p>
      </Modal>
    </div>
  );
};
