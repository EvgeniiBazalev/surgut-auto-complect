import { createClient } from "@/utils/supabase/client";

export const uploadImageToStorage = async (file: File) => {
  const supabaseClient = createClient();
  const filePath = `public/${file.name}`;

  const { data, error } = await supabaseClient.storage
    .from("fileStorageMainPage")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error(error.message);
  }

  return data;
};

export const getBucket = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.storage.getBucket(
    "fileStorageMainPage"
  );

  if (error) {
    console.error("Error getting bucket:", error);
    throw error;
  }

  console.log("Bucket data:", data);
};
