const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const fetchSparePartsStrapi = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/spare-parts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
};
