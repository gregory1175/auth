import { AppBar, Toolbar, Typography, Button } from "@mui/material";

type HeaderType = {
  title: string;
  onLogout: () => void;
};

function Header({ onLogout, title }: HeaderType) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button onClick={onLogout} color="inherit">
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
