import React, { useState, useEffect } from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import {
  Button,
  Container,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createRecord,
  deleteRecord,
  fetchData,
  updateRecord,
} from "../services/DataService";
import RecordForm from "./RecordForm";
import ViewRecordDialog from "./ViewRecordDialog";

import { RecordType } from "../types/types";
import LoaderPageUI from "../ui/LoaderPage";
import HeaderPage from "./Header";
import AddRecordComponent from "./AddRecordComponent";
import dataGridColumns from "../utils/dataGridUtils";
import { formatISO } from "date-fns";

interface DataTableProps {
  token: string;
  onLogout: () => void;
}

const DataTable = ({ token, onLogout }: DataTableProps) => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);
  const [currentRecord, setCurrentRecord] = useState<RecordType | null>(null);
  const [formData, setFormData] =
    useState<Omit<RecordType, "id">>(initialFormData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<RecordType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(token);
        setRows(data);
      } catch (err) {
        setError("Ошибка при получении данных");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const handleAdd = () => {
    setFormData(initialFormData);
    setCurrentRecord(null);
    setDialogType("add");
    setOpenDialog(true);
  };

  const handleEdit = (id: string) => {
    const record = rows.find((row) => row.id === id) as RecordType;
    if (record) {
      setCurrentRecord(record);
      setFormData({
        companySigDate: formatISO(new Date(record.companySigDate)),
        employeeSigDate: formatISO(new Date(record.employeeSigDate)),
        companySignatureName: record.companySignatureName,
        documentName: record.documentName,
        documentStatus: record.documentStatus,
        documentType: record.documentType,
        employeeNumber: record.employeeNumber,
        employeeSignatureName: record.employeeSignatureName,
      });
      setDialogType("edit");
      setOpenDialog(true);
    }
  };

  const handleView = (id: string) => {
    const record = rows.find((row) => row.id === id) as RecordType;
    if (record) {
      setCurrentRecord(record);
      setViewDialogOpen(true);
    }
  };

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const record = rows.find((row) => row.id === id) as RecordType;
    if (record) {
      setRecordToDelete(record);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (recordToDelete) {
      try {
        await deleteRecord(token, recordToDelete.id);
        setRows(rows.filter((row) => row.id !== recordToDelete.id));
      } catch (err) {
        setError("Произошла ошибка при удалении записи");
      } finally {
        setDeleteDialogOpen(false);
        setRecordToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleFormSubmit = async (data: Omit<RecordType, "id">) => {
    try {
      if (dialogType === "add") {
        const newRecord = await createRecord(token, data);
        setRows([...rows, newRecord]);
      } else if (dialogType === "edit" && currentRecord) {
        const updatedRecord = await updateRecord(token, currentRecord.id, data);
        setRows(
          rows.map((row) => (row.id === updatedRecord.id ? updatedRecord : row))
        );
      }
      setOpenDialog(false);
      setCurrentRecord(null);
      setFormData(initialFormData);
    } catch (err) {
      setError("Произошла ошибка при сохранении записи");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  if (loading) return <LoaderPageUI />;

  return (
    <Container>
      <HeaderPage
        onLogout={handleLogout}
        title={"Система управления записями"}
      />
      <Box className="flex items-center justify-center mt-4">
        <Box className="w-full max-w-4xl h-full">
          <AddRecordComponent onClick={handleAdd} />
          <div style={{ height: "calc(100% - 64px)", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={dataGridColumns(handleEdit, handleDelete)}
              onRowClick={({ row }) => handleView(row.id)}
            />
          </div>
          {error && (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
          )}
        </Box>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Внимание!</DialogTitle>
        <DialogContent>
          <p>Вы точно хотите удалить эту запись?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Отменить
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Принять
          </Button>
        </DialogActions>
      </Dialog>
      <RecordForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        dialogType={dialogType}
      />
      <ViewRecordDialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        record={currentRecord}
      />
    </Container>
  );
};

const initialFormData = {
  companySigDate: "",
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: "",
  employeeSignatureName: "",
};

export default DataTable;
