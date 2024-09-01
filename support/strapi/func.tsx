const externalApiUrl: string =
  process.env.NEXT_PUBLIC_STRAPI_EXTERNAL_URL || "";
const localApiUrl: string = process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL || "";
const token: string = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

const fetchFromApi = async (url: string): Promise<any> => {
  try {
    const response = await fetch(`${url}/spare-parts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Ошибка при получении данных с ${url}:`, error);
    return null;
  }
};

export const fetchSparePartsStrapi = async (): Promise<any> => {
  // Сначала пробуем внешний URL
  console.log(`Попытка подключения к локальному API: ${localApiUrl}`);
  let data = await fetchFromApi(localApiUrl);

  // Если внешний URL недоступен, пробуем локальный URL
  if (!data) {
    console.log("Пробую подключение к внешнему API...");
    console.log(`Попытка подключения к внешнему API: ${externalApiUrl}`);
    data = await fetchFromApi(externalApiUrl);
  }

  return data;
};
