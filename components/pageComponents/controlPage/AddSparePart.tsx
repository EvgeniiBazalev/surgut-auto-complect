"use client";

import React, { useState } from "react";
import { Button, Input, Spin, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { uploadDataSpareParts } from "@/support/functions/uploadDataForMainCard";
import { uploadImageToStorage } from "@/support/functions/uploadImageToStorage";

const { TextArea } = Input;

export const AddSparePart = () => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    description1: "",
    description2: "",
    price: 0,
    priceSale: 0,
    categoryHL: "",
    categoryLL: "",
    quantity: "",
    src: "",
    reserve: "",
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
        const imageUploadResponse = await uploadImageToStorage(file);
        imageUrl = imageUploadResponse?.publicURL || "";
      }

      await uploadDataSpareParts({ ...cardInfo, src: imageUrl });

      setCardInfo({
        name: "",
        description1: "",
        description2: "",
        price: 0,
        priceSale: 0,
        categoryHL: "",
        categoryLL: "",
        quantity: "",
        src: "",
        reserve: "",
      });
      setFile(null);
      setFileList([]);
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
        setFile(uploadedFile);
        setFileList(fileList);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 my-4 bg-white shadow-md rounded-lg border border-gray-200 w-[600px] h-full">
      <h2 className="text-2xl font-bold mb-4">Добавить товар</h2>
      <Spin spinning={loading}>
        <div className="space-y-4">
          <Input
            placeholder="Название товара"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextArea
            rows={4}
            placeholder="Описание 1"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.description1}
            onChange={(e) => handleInputChange("description1", e.target.value)}
          />
          <TextArea
            rows={4}
            placeholder="Описание 2"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.description2}
            onChange={(e) => handleInputChange("description2", e.target.value)}
          />
          <p>Цена без скидки</p>
          <Input
            placeholder="Цена"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          <p>Цена со скидкой</p>
          <Input
            placeholder="Цена со скидкой"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.priceSale}
            onChange={(e) => handleInputChange("priceSale", e.target.value)}
          />
          <Input
            placeholder="Категория HL"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.categoryHL}
            onChange={(e) => handleInputChange("categoryHL", e.target.value)}
          />
          <Input
            placeholder="Категория LL"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.categoryLL}
            onChange={(e) => handleInputChange("categoryLL", e.target.value)}
          />
          <Input
            placeholder="Количество"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
          />
          <Input
            placeholder="Резерв"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            value={cardInfo.reserve}
            onChange={(e) => handleInputChange("reserve", e.target.value)}
          />
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            className="w-full"
          >
            <Button
              icon={<UploadOutlined />}
              className="mt-2 w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Загрузить изображение
            </Button>
          </Upload>
          <Button
            type="default"
            className="w-full bg-green-500 text-white hover:bg-green-600"
            onClick={handleAddCard}
            disabled={loading}
          >
            Добавить товар
          </Button>
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
        <p>Товар добавлен на сайт!</p>
      </Modal>
    </div>
  );
};
