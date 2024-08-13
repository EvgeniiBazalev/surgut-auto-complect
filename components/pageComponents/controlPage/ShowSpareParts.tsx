"use client";

import React, { useEffect, useState } from "react";
import { Card, Select, Spin } from "antd";
import { fetchDataSpareParts } from "@/support/functions/uploadDataForMainCard";
import { SparePart } from "@/support/interfaces/dataFromDB";

const { Option } = Select;

export const ShowSpareParts = () => {
  const [loading, setLoading] = useState(true);
  const [hlCategories, setHlCategories] = useState<string[]>([]);
  const [llCategories, setLlCategories] = useState<string[]>([]);
  const [selectedHlCategory, setSelectedHlCategory] = useState("");
  const [selectedLlCategory, setSelectedLlCategory] = useState("");
  const [spareParts, setSpareParts] = useState<SparePart[] | null>([]);

  useEffect(() => {
    const loadSpareParts = async () => {
      setLoading(true);

      const data = await fetchDataSpareParts();

      if (data) {
        // Собираем уникальные категории высокого уровня (HL) и низкого уровня (LL)
        const uniqueHlCategories = Array.from(
          new Set(data.map((part) => part.categoryHL))
        );
        const uniqueLlCategories = Array.from(
          new Set(data.map((part) => part.categoryLL))
        );

        setHlCategories(uniqueHlCategories);
        setLlCategories(uniqueLlCategories);
        setSpareParts(data);
      }

      setLoading(false);
    };

    loadSpareParts();
  }, []);

  const handleHlCategoryChange = (value: string) => {
    setSelectedHlCategory(value);
    setSelectedLlCategory(""); // Сбрасываем LL категорию при изменении HL категории
  };

  const handleLlCategoryChange = (value: string) => {
    setSelectedLlCategory(value);
  };

  const filteredSpareParts =
    spareParts?.filter((part) => {
      return (
        (!selectedHlCategory || part.categoryHL === selectedHlCategory) &&
        (!selectedLlCategory || part.categoryLL === selectedLlCategory)
      );
    }) || [];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 w-full">
      <h2 className="text-2xl font-bold mb-4">Товары по категориям</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select
          placeholder="Выберите категорию высокого уровня"
          className="w-full md:w-1/2"
          onChange={handleHlCategoryChange}
          value={selectedHlCategory}
          allowClear
        >
          {hlCategories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Выберите категорию низкого уровня"
          className="w-full md:w-1/2"
          onChange={handleLlCategoryChange}
          value={selectedLlCategory}
          allowClear
          disabled={!selectedHlCategory} // Отключаем, если HL категория не выбрана
        >
          {llCategories
            .filter((category) =>
              spareParts?.some(
                (part) =>
                  part.categoryHL === selectedHlCategory &&
                  part.categoryLL === category
              )
            )
            .map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            )) || []}
        </Select>
      </div>

      <Spin spinning={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSpareParts.map((part) => (
            <Card
              key={part.id}
              hoverable
              className="bg-gray-100 border border-gray-300 rounded-lg"
              cover={
                <img
                  alt={part.name}
                  src={part.src}
                  className="h-48 object-cover rounded-t-lg"
                />
              }
            >
              <Card.Meta
                title={part.name}
                description={`Цена: ${part.price} руб. / Скидка: ${part.priceSale} руб.`}
              />
              <p className="mt-2 text-gray-700">{part.description1}</p>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};
