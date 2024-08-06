import { createClient } from "@/utils/supabase/server";

export const uploadDataForMainCard = async (insertData: {
  name: string;
  designation: string;
  content: string;
  url: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cardsMain")
    .insert([
      {
        name: insertData.name,
        designation: insertData.designation,
        content: insertData.content,
        url: insertData.url,
      },
    ])
    .select();
};
