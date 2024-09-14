import { Button } from "@mui/material";

type AddRecordComponentType = {
  onClick: () => void;
};

function AddRecordComponent({ onClick }: AddRecordComponentType) {
  return (
    <div className="flex border-2 m-1 p-1 min-h-14">
      <Button onClick={onClick} variant="contained">
        Добавить запись
      </Button>
    </div>
  );
}

export default AddRecordComponent;
