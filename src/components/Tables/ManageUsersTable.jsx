import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

//API
import usersService from "services/users.service";
import AddUserModal from "components/AddUserModal";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  // const handleClick = () => {
  //   const id = randomId();
  //   setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
  //   setRowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
  //   }));
  // };
  // const handleClick = async () => {
  //   console.log("register user");
  // };

  return (
    <GridToolbarContainer>
      {/* <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button> */}
      <AddUserModal />
    </GridToolbarContainer>
  );
}

export default function ManageUsersTable() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      const result = await usersService.fetchUsers();
      // console.log(result);
      setRows(result);
    };
    fetchUsers();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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
    { field: "id", headerName: "ID", width: 50, editable: true },
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "email", headerName: "Email", width: 180, editable: true },
    { field: "username", headerName: "Username", width: 180, editable: true },

    { field: "role", headerName: "Role", width: 180, editable: true },
    {
      field: "createdAt",
      headerName: "CreatedAt",
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Button variant="contained" onClick={handleSaveClick(id)}>
              Save
            </Button>,
            <GridActionsCellItem
              icon={<CancelIcon sx={{ color: "red" }} />}
              label="Delete"
              onClick={handleCancelClick(id)}
              color="inherit"
              sx={{ border: "1px solid red", borderRadius: 1 }}
            />,
          ];
        }

        return [
          <Button variant="contained" onClick={handleEditClick(id)}>
            Edit
          </Button>,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "red" }} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            sx={{ border: "1px solid red", borderRadius: 1 }}
          />,
        ];
      },
    },
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
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
