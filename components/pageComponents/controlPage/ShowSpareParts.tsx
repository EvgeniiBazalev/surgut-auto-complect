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

        // Устанавливаем первую категорию верхнего уровня по умолчанию, если она есть
        if (uniqueHlCategories.length > 0) {
          setSelectedHlCategory(uniqueHlCategories[0]);
          // Опционально, можно также установить первую подкатегорию
          /* const defaultLlCategories = uniqueLlCategories.filter((category) =>
            data.some(
              (part) =>
                part.categoryHL === uniqueHlCategories[0] &&
                part.categoryLL === category
            )
          );
          if (defaultLlCategories.length > 0) {
            setSelectedLlCategory(defaultLlCategories[0]);
          } */
        }
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
    <div className="p-6 mt-4 bg-white shadow-md rounded-lg border border-gray-200 w-full sm:w-11/12 md:w-9/12 lg:w-8/12 xl:w-8/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Товары по категориям
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2 flex-wrap">
          <p className="mb-2 text-gray-700 font-medium">Выберите категорию</p>
          <Select
            placeholder="Выберите категорию высокого уровня"
            className="w-full"
            onChange={handleHlCategoryChange}
            value={selectedHlCategory}
            allowClear
            size="large"
            style={{ borderRadius: "8px" }}
          >
            {hlCategories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <div className="w-full md:w-1/2 flex-wrap">
          <p className="mb-2 text-gray-700 font-medium">
            Выберите подкатегорию
          </p>
          <Select
            placeholder="Выберите категорию низкого уровня"
            className="w-full"
            onChange={handleLlCategoryChange}
            value={selectedLlCategory}
            allowClear
            size="large"
            style={{ borderRadius: "8px" }}
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
      </div>

      <Spin spinning={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSpareParts.map((part) => (
            <Card
              key={part.id}
              hoverable
              className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              cover={
                <img
                  alt={part.name}
                  src={part.src}
                  className="h-48 object-cover w-full"
                />
              }
            >
              <Card.Meta
                title={
                  <span className="text-lg font-semibold text-gray-800">
                    {part.name}
                  </span>
                }
                description={
                  <span className="text-md text-gray-700">
                    Цена: {part.price} руб. / Скидка: {part.priceSale} руб.
                  </span>
                }
              />
              <p className="mt-2 text-gray-600">{part.description1}</p>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};
