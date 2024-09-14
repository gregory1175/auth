import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

/**
 * Функция для генерации столбцов DataGrid.
 * @param handleEdit - Функция для обработки редактирования записи.
 * @param handleDelete - Функция для обработки удаления записи.
 * @returns Массив конфигураций столбцов для DataGrid.
 */

const dataGridColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string, event: React.MouseEvent) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "companySigDate",
    headerName: "Дата подписания (компания)",
    width: 210,
  },
  {
    field: "companySignatureName",
    headerName: "Название компании",
    width: 200,
  },
  { field: "documentName", headerName: "Название документа", width: 200 },
  { field: "documentStatus", headerName: "Статус документа", width: 150 },
  { field: "documentType", headerName: "Тип документа", width: 150 },
  { field: "employeeNumber", headerName: "Номер сотрудника", width: 150 },
  {
    field: "employeeSigDate",
    headerName: "Дата подписания (сотрудник)",
    width: 215,
  },
  {
    field: "employeeSignatureName",
    headerName: "Имя сотрудника",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Действия с таблицей",
    width: 200,
    renderCell: (params) => (
      <>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(event) => {
            event.stopPropagation();
            handleEdit(params.id as string);
          }}
          style={{ marginLeft: 8 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={(event) => handleDelete(params.id as string, event)}
          style={{ marginLeft: 8 }}
        >
          Delete
        </Button>
      </>
    ),
  },
];

export default dataGridColumns;
