import { RecordType } from "../types/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  DialogActions,
} from "@mui/material";

interface ViewRecordDialogProps {
  open: boolean;
  onClose: () => void;
  record: RecordType | null;
}

function ViewRecordDialog({ open, onClose, record }: ViewRecordDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-gray-800 text-white">
        Детали записи
      </DialogTitle>
      <DialogContent>
        <Box className="p-4">
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>ID:</strong> {record?.id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Дата подписания (компания):</strong>{" "}
            {record?.companySigDate}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Название компании:</strong> {record?.companySignatureName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Название документа:</strong> {record?.documentName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Статус документа:</strong> {record?.documentStatus}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Тип документа:</strong> {record?.documentType}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Номер сотрудника:</strong> {record?.employeeNumber}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Дата подписания (сотрудник):</strong>{" "}
            {record?.employeeSigDate}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Имя сотрудника:</strong> {record?.employeeSignatureName}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className="bg-gray-100">
        <Button onClick={onClose} variant="contained" color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewRecordDialog;
