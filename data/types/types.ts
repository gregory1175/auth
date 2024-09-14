// все что связано с api
export type ApiResponse<T> = {
  error_code: number;
  error_message?: string;
  data: T;
};

// все что связано с редактирование таблички
export type RecordType = {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

// Все что связано с табличкой
export interface FormDataInterface {
  companySigDate: string;
  employeeSigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSignatureName: string;
}
