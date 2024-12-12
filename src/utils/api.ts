export const API_URL = "https://fakestoreapi.com";

/**
 * Helper fucntion to fetch data.
 */
export const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // TODO
      throw new Error("Failed to fetch.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
