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

//API
import auditService from "services/audit.service";

//export
import { CSVLink, CSVDownload } from "react-csv";

export default function ManageInverntoryTable() {
  const token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      const result = await axios.get(
        "https://13.211.142.147/api/flocks/rep/approved"
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
    {
      field: "additional_flocks",
      headerName: "Additional",
      width: 100,
      editable: true,
    },
    {
      field: "deceased_flocks",
      headerName: "Deceased",
      width: 100,
      editable: true,
    },
    { field: "sick_flocks", headerName: "Sick", width: 100, editable: true },
    { field: "cal", headerName: "Cal", width: 100, editable: true },
    {
      field: "flocks_number_before",
      headerName: "Flocks No. Before",
      width: 180,
      editable: true,
    },
    {
      field: "flocks_number_after",
      headerName: "Flocks No. After",
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
  ];

  const handleExport = async () => {
    await auditService.postAudit(
      `Exported the flocks inventory.`,
      "Download Export",
      token
    );
  };

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
      <CSVLink data={rows} filename="Flocks_Inventory.csv">
        <Button
          variant="contained"
          sx={{ m: "10px", position: "absolute", top: 0, right: 0 }}
          onClick={() => handleExport()}
        >
          Export Data
        </Button>
      </CSVLink>
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
