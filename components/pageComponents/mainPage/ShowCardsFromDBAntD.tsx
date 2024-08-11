"use client";

import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { fetchDataSpareParts } from "@/support/functions/uploadDataForMainCard";
import { SparePart } from "@/support/interfaces/dataFromDB";

const { Meta } = Card;

export const ShowCardsFromDBAntD: React.FC = () => {
  const [data, setData] = useState<SparePart[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const dataFromDB = await fetchDataSpareParts();
        if (dataFromDB) {
          setData(dataFromDB);
          console.log(dataFromDB);
        }
      };
    } catch (error) {
      console.log(`Произошла ошибка загрузки данных с БД: ${error}`);
    }
  }, []);

  return !data ? (
    <>loading</>
  ) : (
    <p>Загрузились{JSON.stringify(data)}</p>
    // <Card
    //   hoverable
    //   style={{ width: 240 }}
    //   cover={<img alt="example" src={data[0].src} />}
    // >
    //   <Meta title={data[0].name} description={data[0].price} />
    // </Card>
  );
};
