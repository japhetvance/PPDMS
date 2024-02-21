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
import { toast } from "react-toastify";

//API
import dailyService from "services/daily.service";

function FlocksReport() {
  const token = sessionStorage.getItem("token");
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      date: null,
      additional_flocks: null,
      deceased_flocks: null,
      sick_flocks: null,
      cal: null,
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const result = await dailyService.flocksReport(data, token);
      toast.success("Successfully Added.");

      setTimeout(() => {
        window.location.reload();
      }, 1500);

      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Generate Report"
        subtitle="Fill in information to generate report about the flocks."
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
            name="additional_flocks"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for this field",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Active"
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
            name="deceased_flocks"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for this field",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Deceased"
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
            name="sick_flocks"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for this field",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Sick"
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
            name="cal"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number for this field",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Cal"
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

export default FlocksReport;
