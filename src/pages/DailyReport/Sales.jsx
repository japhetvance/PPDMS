import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function SalesReport() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      date: null,
      eggs: null,
      size: null,
      seller: null,
      buyer: null,
      price: null,
    },
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Generate Report"
        subtitle="Fill in information to generate report about the sales."
      />
      <div className="flex flex-col gap-4 h-[75vh] py-5">
        <p className="text-xl font-bold font-[Poppins]">Add Report</p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "50%",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    {...field}
                    label="Date"
                    slotProps={{ textField: { fullWidth: true } }}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(dayjs(date).format("YYYY-MM-DD"));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />
          <Controller
            name="eggs"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Number of eggs is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for Size",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Number of Eggs"
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
            name="size"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "size is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Size"
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
            name="seller"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "seller is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Seller"
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
            name="buyer"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "buyer is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Buyer"
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
            name="price"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "price is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for Size",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Price"
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

          <div className="w-full flex items-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Box>
  );
}

export default SalesReport;
