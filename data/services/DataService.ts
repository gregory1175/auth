import axios from "axios";
import { ApiResponse, RecordType } from "../types/types";
import { format, parseISO } from "date-fns";

// можно перенести в .evn
const API_HOST = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

const formatRecordDates = (record: RecordType): RecordType => {
  return {
    ...record,
    companySigDate: record.companySigDate
      ? format(parseISO(record.companySigDate), "yyyy-MM-dd'   'HH:mm")
      : "",
    employeeSigDate: record.employeeSigDate
      ? format(parseISO(record.employeeSigDate), "yyyy-MM-dd'   'HH:mm")
      : "",
  };
};

export const fetchData = async (token: string): Promise<RecordType[]> => {
  try {
    const response = await axios.get<ApiResponse<RecordType[]>>(
      `${API_HOST}/userdocs/get`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    return response.data.data.map(formatRecordDates);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const createRecord = async (
  token: string,
  data: Omit<RecordType, "id">
): Promise<RecordType> => {
  try {
    const response = await axios.post<ApiResponse<RecordType>>(
      `${API_HOST}/userdocs/create`,
      data,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    return formatRecordDates(response.data.data);
  } catch (error) {
    throw new Error("Failed to create record");
  }
};

export const deleteRecord = async (
  token: string,
  id: string
): Promise<void> => {
  try {
    const response = await axios.post<ApiResponse<null>>(
      `${API_HOST}/userdocs/delete/${id}`,
      null,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    if (response.data.error_code !== 0) {
      throw new Error("Failed to delete record");
    }
  } catch (error) {
    throw new Error("Failed to delete record");
  }
};

export const updateRecord = async (
  token: string,
  id: string,
  data: Omit<RecordType, "id">
): Promise<RecordType> => {
  try {
    const response = await axios.post<ApiResponse<RecordType>>(
      `${API_HOST}/userdocs/set/${id}`,
      data,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    if (response.data.error_code !== 0) {
      throw new Error("Failed to update record");
    }
    return formatRecordDates(response.data.data);
  } catch (error) {
    throw new Error("Failed to update record");
  }
};
