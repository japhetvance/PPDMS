import React, { useState } from "react";
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
import auditService from "services/audit.service";

function EggsReport() {
  const token = sessionStorage.getItem("token");
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      egg_sm_produced: null,
      egg_md_produced: null,
      egg_lg_produced: null,
      rejected: null,
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      const result = await dailyService.eggReport(data, token);
      toast.success("Successfully Added.");
      auditService.postAudit("Made a report on eggs.", "Daily Report", token);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      console.log(result);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Generate Egg Report"
        subtitle="Fill in information to generate report about the eggs."
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
                    value={dayjs(field.value)}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(dayjs(date).format("YYYY-MM-DD"));
                    }}
                    maxDate={dayjs()}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />
          <Controller
            name="egg_sm_produced"
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
                label="Small"
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
            name="egg_md_produced"
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
                label="Medium"
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
            name="egg_lg_produced"
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
                label="Large"
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
            name="rejected"
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
                label="Rejected"
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

export default EggsReport;
