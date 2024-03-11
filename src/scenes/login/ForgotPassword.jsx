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

//api
import authService from "services/auth.service";

export default function ForgotPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const email = data.email;

    try {
      const result = await authService.forgotPassword(email);
      if (result) {
        console.log("result: ", result.token);
        navigate("/reset/password", { state: { token: result.token } });
      } else {
        toast.error("There was an error.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
              Trouble logging in?
            </Typography>
            <p className="text-xs text-center">
              Enter the email address associated with your account and we'll
              send you a link to reset your password
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {/* <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              Enter your email:
            </Typography> */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-5 justify-between items-center w-full">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: "email is required",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Email"
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
                Continue
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
