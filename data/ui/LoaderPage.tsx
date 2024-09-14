import { CircularProgress } from "@mui/material";

function LoaderPageUI() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <CircularProgress />
    </div>
  );
}

export default LoaderPageUI;
