"use client";

import React from "react";
import { Button } from "antd";
import { uploadDataForMainCard } from "@/support/functions/uploadDataForMainCard";

const inserData = {
  name: "Имя",
  designation: "Обозначение",
  content: "Описание",
  url: "Ссылка",
};

const AddCardsUI = ({ user }: { user: string }) => {
  return (
    <div>
      <p>Это данные из user: {user}</p>
      <Button type="dashed" onClick={() => uploadDataForMainCard(inserData)}>
        Добавить карточку
      </Button>
    </div>
  );
};

export default AddCardsUI;
