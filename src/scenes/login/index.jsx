import { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Link,
  Checkbox,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  TextField,
  Avatar,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

//api
import auth from "../../services/auth.service";
import auditService from "services/audit.service";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const username = data.username;
    const password = data.password;

    const result = await auth.login(username, password);
    if (result && result.token) {
      auditService.postAudit(
        "Login to website",
        "Authentication",
        result.token
      );
      sessionStorage.setItem("token", result.token);
      window.location = "/";
    } else {
      toast.error("Invalid Credentials.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = async () => {
    // console.log("forgot password");
    navigate("/forgot/password");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            padding: "2em",
            bgcolor: theme.palette.primary[500],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            // border: "2px solid red",
            width: 400,
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: theme.palette.secondary[200] }}
            fontWeight="bold"
          >
            CUEJILO FARMS
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginBottom: "1.4em", color: theme.palette.secondary[500] }}
            fontWeight="bold"
          >
            Poultry Monitoring System
          </Typography>
          <div className="flex flex-col gap-4 w-full">
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              LOG IN
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-5 justify-between items-center w-full">
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: "username is required",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.9rem",
                          },
                        }}
                        error={error !== undefined}
                        helperText={error ? error.message : ""}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          error={error !== undefined}
                          helperText={error ? error.message : ""}
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <p
                  className="text-xs font-[Poppins] self-end my-1 underline cursor-pointer"
                  onClick={handleForgotPassword}
                >
                  Forgot password ?
                </p>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: theme.palette.secondary[300],
                  color: theme.palette.primary[500],
                  fontWeight: 700,
                  ":hover": { bgcolor: theme.palette.secondary[100] },
                }}
              >
                LOG IN
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
