import { createClient } from "@/utils/supabase/client";
import { SparePart, SparePartInsert } from "../interfaces/dataFromDB";

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

export const uploadDataSpareParts = async (
  data: SparePartInsert
): Promise<void> => {
  console.log(data);
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

export const fetchDataSpareParts = async (): Promise<SparePart[] | null> => {
  const supabaseClient = createClient();
  console.log("начинаем загружать данные из БД");

  const { data, error } = await supabaseClient.from("spareParts").select();

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  console.log(data);
  return data;
};
