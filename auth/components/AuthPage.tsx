import { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { validateUsername, validatePassword } from "../utils/validation";

interface AuthPageProps {
  onLogin: (token: string) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);

    if (usernameValidationError || passwordValidationError) {
      setUsernameError(usernameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const token = await login(username, password);
      if (!token) {
        throw new Error("No token received");
      }
      localStorage.setItem("token", token);
      onLogin(token);
      navigate("/data");
    } catch (err) {
      setError("Не удалось войти");
      console.error("Login error:", err);
    }
  };

  // Добавляем обработку нажатия клавиши Enter
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-200 p-4 flex justify-center">
        <Typography variant="h4" align="center" className="text-blue-600">
          Тестовая авторизация
        </Typography>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="xs" className="p-4">
          <TextField
            label="Логин"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(null);
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            className="mb-2"
            error={!!usernameError}
            helperText={usernameError}
            onKeyDown={handleKeyDown}
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(null);
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            className="mb-2"
            error={!!passwordError}
            helperText={passwordError}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Войти
          </Button>
          {error && (
            <Typography color="error" className="mt-2">
              {error}
            </Typography>
          )}
        </Container>
      </main>
      <footer className="bg-gray-200 p-4">
        <Container maxWidth="lg">
          <Divider />
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            className="mt-2"
          >
            © 2024 Company. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

export default AuthPage;
