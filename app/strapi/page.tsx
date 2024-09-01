"use client";

import React, { useEffect, useState } from "react";
import { fetchSparePartsStrapi } from "@/support/strapi/func";

interface SparePart {
  id: number;
  attributes: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

const Page: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpareParts = async () => {
      setLoading(true);
      const { data } = await fetchSparePartsStrapi();

      if (data) {
        setSpareParts(data);
      }

      setLoading(false);
    };

    loadSpareParts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {spareParts.map((sparePart) => (
        <div key={sparePart.id}>
          <h3>Spare Part ID: {sparePart.id}</h3>
          <p>Name: {sparePart.attributes.name}</p>
          <p>Description: {sparePart.attributes.description}</p>
          <p>
            Created At:{" "}
            {new Date(sparePart.attributes.createdAt).toLocaleString()}
          </p>
          <p>
            Updated At:{" "}
            {new Date(sparePart.attributes.updatedAt).toLocaleString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Page;
