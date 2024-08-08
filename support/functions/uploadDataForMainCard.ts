import { createClient } from "@/utils/supabase/client";

export const uploadDataForMainCard = async (data: {
  name: string;
  designation: string;
  content: string;
  url: string;
}): Promise<void> => {
  const supabaseClient = createClient();
  const { data: insertedData, error } = await supabaseClient
    .from("cardsMain")
    .insert([data])
    .select();

  if (error) {
    console.error("Error uploading data:", error);
    throw error;
  }

  console.log("Data uploaded successfully:", insertedData);
};

export const uploadDataSpareParts = async (data: {
  name: string;
  description1: string;
  description2: string;
  price: number;
  priceSale: number;
  categoryHL: string;
  categoryLL: string;
  quantity: string;
  src: string;
  reserve: string;
}): Promise<void> => {
  const supabaseClient = createClient();

  const { data: insertedData, error } = await supabaseClient
    .from("spareParts")
    .insert([data])
    .select();

  if (error) {
    console.error("Error uploading data:", error);
    throw error;
  }

  console.log("Data uploaded successfully:", insertedData);
};
