"use client";

import React, { useEffect, useState } from "react";
import { fetchSparePartsStrapi } from "@/support/strapi/func";

const page = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpareParts = async () => {
      setLoading(true);
      const data = await fetchSparePartsStrapi();

      if (data) {
        console.log(data);
        setSpareParts(data);
      }

      setLoading(false);
    };

    loadSpareParts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return <div>{JSON.stringify(spareParts)}</div>;
};

export default page;
