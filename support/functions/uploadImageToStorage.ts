import { createClient } from "@/utils/supabase/client";

export const uploadImageToStorage = async (file: File, userId: string) => {
  const supabaseClient = createClient();
  const filePath = `${userId}/${file.name}`;

  const { data, error } = await supabaseClient.storage
    .from("fileStorageMainPage")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
