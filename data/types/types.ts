// все что связано с api
export type ApiResponse<T> = {
  error_code: number;
  error_message?: string;
  data: T;
};

// Все что связано с табличкой
export type FormDataType = {
  companySigDate: string;
  employeeSigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSignatureName: string;
};

// все что связано с редактирование таблички
export type RecordType = {
  id: string;
} & FormDataType;
