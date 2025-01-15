import { Product } from "../types/Product";

const API_URL = "https://fakestoreapi.com";

export const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch data from ${endpoint}: ${error.message}`
      );
    } else {
      throw new Error(`Failed to fetch data from ${endpoint}.`);
    }
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  return fetchFromApi<Product[]>("/products");
};
