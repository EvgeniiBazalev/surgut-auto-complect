"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin } from "antd";
import { fetchDataSpareParts } from "@/support/functions/uploadDataForMainCard";
import { SparePart } from "@/support/interfaces/dataFromDB";

const { Meta } = Card;

export const ShowCardsFromDBAntD: React.FC = () => {
  const [data, setData] = useState<SparePart[] | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const dataFromDB = await fetchDataSpareParts();
        if (dataFromDB) {
          setData(dataFromDB);
          console.log(dataFromDB);
        }
      };

      fetchData();
    } catch (error) {
      console.log(`Произошла ошибка загрузки данных с БД: ${error}`);
    }
  }, []);

  return !data ? (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    <div className="p-4">
      <Row gutter={[16, 16]} justify="center">
        {data.map((item) => (
          <Col
            key={item.id}
            xs={24} // 100% ширины на маленьких экранах
            sm={12} // 50% ширины на экранах среднего размера
            md={8} // 33% ширины на экранах большого размера
            lg={6} // 25% ширины на экранах очень большого размера
          >
            <Card
              hoverable
              cover={
                <img
                  alt={item.name}
                  src={item.src}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Meta title={item.name} description={`${item.price} ₽`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
