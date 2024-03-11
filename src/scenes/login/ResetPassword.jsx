import { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
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
import authService from "services/auth.service";

export default function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state;
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log("passed token: ", token);
  }, []);

  const onSubmit = async (data) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password === confirmPassword) {
      try {
        const result = await authService.resetPassword(password, token);
        if (result) {
          console.log("result: ", result);
          toast.success("Password successfully changed");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error("There was an error.");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Passwords doesn't match");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            gap: 3,
          }}
        >
          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <Typography
              variant="h2"
              sx={{ color: theme.palette.secondary[200] }}
              fontWeight="bold"
            >
              Reset Password
            </Typography>
            <p className="text-xs text-center">
              Enter a new password to continue and log in to your account.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-5 justify-between items-center w-full">
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
                        <InputLabel htmlFor="password">New Password</InputLabel>
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
                          label="New Password"
                          error={error !== undefined}
                          helperText={error ? error.message : ""}
                        />
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="confirmPassword"
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
                        <InputLabel htmlFor="password">
                          Confirm New Password
                        </InputLabel>
                        <OutlinedInput
                          id="confirmPassword"
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
                          label="Confirm New Password"
                          error={error !== undefined}
                          helperText={error ? error.message : ""}
                        />
                      </FormControl>
                    )}
                  />
                </div>
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
                Finish
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
