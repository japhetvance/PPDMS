import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

export default function ManageInverntoryTable() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      const result = await axios.get(
        "https://13.211.142.147/api/fetch/egg/inventory"
      );
      setRows(result.data);
    };
    fetchUsers();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    { field: "date", headerName: "Date", width: 180, editable: true },
    {
      field: "egg_sm_produced",
      headerName: "Egg Small",
      width: 180,
      editable: true,
    },
    {
      field: "egg_md_produced",
      headerName: "Egg Medium",
      width: 180,
      editable: true,
    },
    {
      field: "egg_lg_produced",
      headerName: "Egg Large",
      width: 180,
      editable: true,
    },
    {
      field: "rejected",
      headerName: "Rejected Egg",
      width: 180,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Approved Date",
      flex: 1,
      renderCell: (params) => {
        const updatedAtString = params.value;
        const updatedAtDate = new Date(updatedAtString);
        updatedAtDate.setHours(updatedAtDate.getHours());

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(updatedAtDate);

        return <div>{formattedDate}</div>;
      },
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 80,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    // },
    // {
    //   field: "joinDate",
    //   headerName: "Join date",
    //   type: "date",
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: "role",
    //   headerName: "Department",
    //   width: 220,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["Market", "Finance", "Development"],
    // },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
