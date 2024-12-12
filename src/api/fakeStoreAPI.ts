import { Product } from "../types/Product";
import { API_URL, fetchData } from "../utils/api";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchData(`${API_URL}/products`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to fetch products.");
    }
  }
};

export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const data = await fetchData(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    // the API returns status 200 even if the product doesn't exist, hence the default error message
    console.error(error);
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
};
