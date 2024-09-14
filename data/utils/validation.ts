import { FormDataInterface } from "../types/types";
import { DATE_REGEX } from "../constants/constants";
import { isValid, parseISO } from "date-fns";

export const isValidDate = (date: string): boolean => DATE_REGEX.test(date);
export const isRequired = (value: string): boolean => value.trim() !== "";

export const validateForm = (
  formData: FormDataInterface,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
  const newErrors: { [key: string]: string } = {};

  if (!isValid(parseISO(formData.companySigDate))) {
    newErrors.companySigDate = "Неверный формат даты.";
  }

  if (!isValid(parseISO(formData.employeeSigDate))) {
    newErrors.employeeSigDate = "Неверный формат даты.";
  }

  if (!formData.companySignatureName.trim()) {
    newErrors.companySignatureName = "Имя компании обязательно.";
  }

  if (!formData.documentName.trim()) {
    newErrors.documentName = "Имя документа обязательно.";
  }

  if (!formData.documentStatus.trim()) {
    newErrors.documentStatus = "Статус документа обязателен.";
  }

  if (!formData.documentType.trim()) {
    newErrors.documentType = "Тип документа обязателен.";
  }

  if (!formData.employeeNumber.trim()) {
    newErrors.employeeNumber = "Номер сотрудника обязателен.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
