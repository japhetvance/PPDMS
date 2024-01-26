import React, { useMemo, useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, useTheme, Typography, Button, Modal, Pagination, Stack, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetEggsQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Employee = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetEggsQuery();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [role, setRole] = useState('');
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState([]);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userPage, setUserPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [table, setTable] = useState("");
  const [deleteModal, setDeleteModal] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:5001/general/user');
        const fetchReport = await axios.get('http://localhost:5001/general/reports');
        const fetchUser = await axios.get(`http://localhost:5001/general/user/${userId}`);
        if (response) {
          setRows(response.data);
        }
        if (fetchReport) {
          console.log(fetchReport.data)
          setReport(fetchReport.data);
        }
        if (fetchUser) {
          setUser(fetchUser.data);
          console.log(fetchUser)
        }
      } catch (error) {
        console.log('Error sending form data:', error);
      }
    }
    fetch();
    
  }, [userId])
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setUserPage(value);
  };

  const handleReportPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setReportPage(value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleOpenDeleteModal = (table, id) => {
    setOpenDeleteModal(true);
    setDeleteModal(id);
    setTable(table);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEditModal = async (id) => {
    await setUserId(id);
    await setOpenEditModal(true);
  }
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleDelete = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/general/deleteRecord', JSON.stringify({ id: deleteModal, table }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response) {
        setRows(response.data);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/general/edit', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response) {
        setRows(response.data);
        handleCloseEditModal();
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40em",
    bgcolor: 'background.paper',
    border: '2px solid primary.main',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/general/add', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response.data)
      if (response) {
        const token = await response.data;
        handleClose();
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/general/edit', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response.data)
      if (response) {
        const token = await response.data;
        handleClose();
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  };

  const indexOfLastRecord = userPage * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;

  const iL = reportPage * 10;
  const iF = iL - 10;

  return (
    <Box m="1.5rem 2.5rem">



<Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  component="form" onSubmit={handleEditSubmit}>
                <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" gutterBottom sx={{mb: "2em"}}>
            EDIT USER
          </Typography>
          <input type="hidden" name="id" value={user._id} />
          <TextField
            onChange={handleEditChange}
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            value={user.name || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={user.email || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            value={user.city || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            id="state"
            name="state"
            label="State"
            fullWidth
            value={user.state || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            value={user.country || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            autoComplete="occupation"
            value={user.occupation || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phoneNumber"
            value={user.phoneNumber || " "}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleSelectChange}
            >
              <MenuItem value={"superadmin"}>Farm Owner</MenuItem>
              <MenuItem value={"admin"}>Manager</MenuItem>
              <MenuItem value={"user"}>Employee</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleEditChange}
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="password"
            value={user.password || " "}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
              type="submit"
              
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#4070ff", color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
              >
                APPLY
              </Button>
        </Grid>
      </Grid>
                </Box>
      </Modal>




      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={() => handleDelete} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Record
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            Are you sure you want to delete this record?
          </Typography>
          <Box sx={{display: "flex", justifyContent: "end", gap: 3, mt: 4}}>
            <Button
                onClick={handleCloseDeleteModal}
                  variant="contained"
                  sx={{ bgcolor: theme.palette.primary[200], color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
                >
                  Cancel
                </Button>
            <Button
                type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#ff4040", color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
                >
                  Delete
                </Button>
          </Box>
        </Box>
      </Modal>

      <Header title="ADMIN" subtitle="Record of users and recent updates" />
      <Box sx={{m: "4em 0", pb: "5em"}}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" gutterBottom>
            MANAGE USERS
          </Typography>
              <Button onClick={handleOpen}
                variant="contained"
                sx={{ bgcolor: "#40ff53", color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
              >
                ADD
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}  component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" gutterBottom sx={{mb: "2em"}}>
            ADD USER
          </Typography>
          <TextField
          onChange={handleChange}
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            id="state"
            name="state"
            label="State"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            autoComplete="occupation"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phoneNumber"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleSelectChange}
            >
              <MenuItem value={"superadmin"}>Farm Owner</MenuItem>
              <MenuItem value={"admin"}>Manager</MenuItem>
              <MenuItem value={"user"}>Employee</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange}
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="password"
            
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
              type="submit"
              
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#40ff53", color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
              >
                ADD
              </Button>
        </Grid>
      </Grid>
                </Box>
              </Modal>
        </Box>
        <TableContainer component={Paper} sx={{mt: '2em', bgcolor: theme.palette.primary[700]}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{bgcolor: theme.palette.primary[700]}}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right" sx={{paddingRight: "4.5em"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(indexOfFirstRecord, 
      indexOfLastRecord).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.occupation}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right" sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8em"}}>
                    <DeleteIcon sx={{color: "#ff4040", cursor: "pointer"}} onClick={() => handleOpenDeleteModal} />
                    <EditIcon sx={{color: "#4070ff", cursor: "pointer"}} onClick={() => handleOpenEditModal(row._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box fullWidth display="flex" justifyContent="center">
          <Stack spacing={2} sx={{mt: "2em"}}>
            <Pagination count={Math.ceil(rows.length / 10)} shape="rounded" page={userPage} onChange={handlePageChange} />
          </Stack>
        </Box>
      </Box>


    </Box>
  );
};

export default Employee;