import React, { useMemo, useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, useTheme, Stack, Pagination, Modal, Typography, Button } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetEggsQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Employee = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetEggsQuery();
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(1);
  const [deleteModal, setDeleteModal] = useState("");
  const [validateModal, setValidateModal] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openValidateModal, setOpenValidateModal] = useState(false);
  const [validateBody, setValidateBody] = useState({});
  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setDeleteModal(id);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenValidateModal = async (id) => {
    setOpenValidateModal(true);
    setValidateModal(id);
  }
  const handleCloseValidateModal = () => setOpenValidateModal(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:5001/general/temp');
        const validateFetch = await axios.get(`http://localhost:5001/general/temp/${validateModal}`);
        if (response) {
          setRows(response.data);
          console.log(response.data)
        }
        if (validateFetch.data != undefined) {
          console.log("hi hell oo oo oo"+validateModal)
          const validateData = validateFetch.data;
          setValidateBody({
            id: validateData._id,
            eggs: validateData.eggs, 
            userName: validateData.userName, 
            rejected: validateData.rejected, 
            sold: validateData.sold, 
            others: validateData.others, 
            flock: validateData.flock, 
            cages: validateData.cages
          });
        }
      } catch (error) {
        console.log('Error sending form data:', error);
      }
    }
    fetch();
    
  }, [page, validateModal])
  // console.table(validateBody);

  const handleDelete = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/general/delete', JSON.stringify({ id: deleteModal }), {
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

  const handleValidate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/general/validate', JSON.stringify(validateBody), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response) {
        setRows(response.data);
        console.log(response.data);
        handleCloseValidateModal();
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  }

  function dateToYMD(date) {
    var dateParse = new Date(date);
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = dateParse.getDate();
    var m = strArray[dateParse.getMonth()];
    var y = dateParse.getFullYear();
    return m + " " + (d <= 9 ? '0' + d : d) + ', ' + y;
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const indexOfLastRecord = page * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;

  return (
    <Box m="1.5rem 2.5rem">

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleDelete} >
          <input type="hidden" name="id" value={deleteModal} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Report
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

      <Modal
        open={openValidateModal}
        onClose={handleCloseValidateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleValidate}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Validate Report
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to validate this record?
          </Typography>
          <Box sx={{display: "flex", justifyContent: "end", gap: 3, mt: 4}}>
            <Button
                onClick={handleCloseValidateModal}
                  variant="contained"
                  sx={{ bgcolor: theme.palette.primary[200], color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
                >
                  Cancel
                </Button>
            <Button
                type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#40ff53", color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
                >
                  Validate
                </Button>
          </Box>
        </Box>
      </Modal>

      <Header title="MANAGER REPORT" subtitle="Record of eggs sold and produced " />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <label style={{ fontSize: '14px' }}>From:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <label style={{ fontSize: '14px' }}>To:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{mt: "2em", bgcolor: theme.palette.primary[700]}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{bgcolor: theme.palette.primary[700]}}>
              <TableRow>
                {/* <TableCell>Name</TableCell> */}
                <TableCell>Date</TableCell>
                <TableCell align="right">Eggs</TableCell>
                <TableCell align="right">Rejected</TableCell>
                <TableCell align="right">Sold</TableCell>
                <TableCell align="right">Others</TableCell>
                <TableCell align="right">Flock</TableCell>
                <TableCell align="right">Cages</TableCell>
                <TableCell align="right" sx={{paddingRight: "4.5em"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(indexOfFirstRecord, 
      indexOfLastRecord).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.userName}
                  </TableCell> */}
                  <TableCell>{dateToYMD(Date.parse(row.createdAt))}</TableCell>
                  <TableCell align="right">{row.eggs}</TableCell>
                  <TableCell align="right">{row.rejected}</TableCell>
                  <TableCell align="right">{row.sold}</TableCell>
                  <TableCell align="right">{row.others}</TableCell>
                  <TableCell align="right">{row.flock}</TableCell>
                  <TableCell align="right">{row.cages}</TableCell>
                  <TableCell align="right" sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8em"}}>
                    <ClearIcon sx={{color: "#ff4040", cursor: "pointer"}} onClick={() => handleOpenDeleteModal(row._id)} />
                    <CheckIcon sx={{color: "#40ff53", cursor: "pointer"}} onClick={() => handleOpenValidateModal(row._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box fullWidth display="flex" justifyContent="center">
          <Stack spacing={2} sx={{mt: "2em"}}>
            <Pagination count={Math.ceil(rows.length / 10)} shape="rounded" page={page} onChange={handlePageChange} />
          </Stack>
        </Box>

      </Box>
    </Box>
  );
};

export default Employee;