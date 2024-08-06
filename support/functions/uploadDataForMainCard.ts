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
