import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { TextField, useTheme, Select, MenuItem } from "@mui/material";

//api
import authService from "services/auth.service";
import auditService from "services/audit.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  backgroundColor: "white",
};

export default function AddUserModal() {
  const theme = useTheme();
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const type = ["superadmin", "admin", "manager", "employee"];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: null,
      email: null,
      role: null,
      username: null,
      password: null,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const result = await authService.register(data, token);
      toast.success("Successfully Registered.");

      auditService.postAudit("Registed a user", "Registraition", token);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    // const { name, email, role, username, password } = data;
    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("role:", role);
    // console.log("username:", username);
    // console.log("password:", password);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button color="secondary" startIcon={<AddIcon />} onClick={handleOpen}>
        Add record
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: theme.palette.primary[500] }}>
          <div className="flex flex-col gap-4 py-5">
            <p className="text-xl font-bold font-[Poppins]">Add Record</p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Name"
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
                    helperText={error?.message || ""}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
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
                    helperText={error?.message || ""}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      inputProps={{
                        style: {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                        },
                      }}
                      error={error !== undefined}
                    >
                      {type.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item === "superadmin"
                            ? "superadmin"
                            : item === "admin"
                            ? "admin"
                            : item === "manager"
                            ? "manager"
                            : item === "employee"
                            ? "employee"
                            : ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
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

              <div className="w-full flex items-center">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
