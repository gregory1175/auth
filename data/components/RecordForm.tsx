import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { validateForm } from "../utils/validation";
import { RecordType } from "../types/types";

interface RecordFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<RecordType, "id">) => void;
  formData: Omit<RecordType, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<RecordType, "id">>>;
  dialogType: "add" | "edit" | null;
}

function RecordForm({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  dialogType,
}: RecordFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "companySigDate" || name === "employeeSigDate") {
      const date = new Date(value);
      setFormData({
        ...formData,
        [name]: date.toISOString(),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = () => {
    if (validateForm(formData, setErrors)) {
      onSubmit(formData);
      onClose();
    }
  };
  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch {
      return "";
    }
  };

  const initialFormData: Omit<RecordType, "id"> = {
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  };

  useEffect(() => {
    if (!open) {
      setErrors({});
      setFormData(initialFormData);
    }
  }, [open, setFormData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {dialogType === "add" ? "Добавить запись" : "Редактировать запись"}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="companySigDate"
          label="Дата и время подписи компании"
          type="datetime-local"
          value={formatDateForDisplay(formData.companySigDate)}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.companySigDate}
          helperText={errors.companySigDate}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          name="companySignatureName"
          label="Название компании"
          value={formData.companySignatureName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.companySignatureName}
          helperText={errors.companySignatureName}
        />
        <TextField
          name="employeeSigDate"
          label="Дата и время подписи сотрудника"
          type="datetime-local"
          value={formatDateForDisplay(formData.employeeSigDate)}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.employeeSigDate}
          helperText={errors.employeeSigDate}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          name="documentName"
          label="Имя документа"
          value={formData.documentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.documentName}
          helperText={errors.documentName}
        />
        <TextField
          name="documentStatus"
          label="Статус документа"
          value={formData.documentStatus}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.documentStatus}
          helperText={errors.documentStatus}
        />
        <TextField
          name="documentType"
          label="Тип документа"
          value={formData.documentType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.documentType}
          helperText={errors.documentType}
        />
        <TextField
          name="employeeNumber"
          label="Номер сотрудника"
          value={formData.employeeNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.employeeNumber}
          helperText={errors.employeeNumber}
        />
        <TextField
          name="employeeSignatureName"
          label="Имя сотрудника"
          value={formData.employeeSignatureName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.employeeSignatureName}
          helperText={errors.employeeSignatureName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleFormSubmit} variant="contained">
          {dialogType === "add" ? "Добавить" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecordForm;
