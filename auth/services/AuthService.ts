import axios from "axios";
import { ApiResponse } from "../types/types";

const API_HOST = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<{ token: string }>>(
      `${API_HOST}/login`,
      {
        username,
        password,
      }
    );
    if (response.data.error_code !== 0) {
      throw new Error(response.data.error_message || "Не удалось войти!");
    }
    return response.data.data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Не удалось войти!");
  }
};
