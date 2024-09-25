import React, { useEffect, useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
// import { deleteEmployeeData, getQueryData } from "../../actions/employeeData";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
// import { useReactToPrint } from "react-to-print";
import {
  deleteCase,
  getDisposalCases,
  getInstitutionCases,
  getPendingCases,
} from "../../actions/cases";
import { getCases } from "../../actions/cases";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar,
  Tab,
  Tabs,
  Button,
  CircularProgress,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import TabPanel from "./TabPanel";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getEmployeeData } from "../../actions/causeLists";
import { getControlCenter } from "../../actions/controlCenter";


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    dateValue: {
      // minWidth: "100px",
      whiteSpace: "nowrap",
    },
  });
  
  export default function PendingCasesTab({
    selectedTab,
    setCurrentId,
    currentId
}) {

  const classes = useStyles();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();

  
    const handleDelete = (id) => {
      setSelectedRow(id);
      setOpenDeleteDialog(true);
    };
  
    const handleDeleteConfirmation = () => {
      // Dispatch your delete action using Redux here, passing the selectedRow to identify the item to delete
      // console.log("Delete item:", selectedRow);
      dispatch(deleteCase(selectedRow));
      setOpenDeleteDialog(false);
    };
  
    const handleCancelDelete = () => {
      setOpenDeleteDialog(false);
    };

    useEffect(() => {
      dispatch(
        getPendingCases({ reqQuery: "PendingCases", datePendency: new Date() })
      );
    }, [dispatch]);
    const pendingCases = useSelector((state) => state.pendingCases);
  const tableRef = React.useRef();


  return(
    <>
  <TabPanel value={selectedTab} index={1}>
    {/* Render your All Cases table component here */}
    {/* Pending Cases */}
    <TableContainer component={Paper}>
      <Table
        ref={tableRef}
        stickyHeader
        size="small"
        className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell
              // component="th"
              // scope="row"
              align="left"
            >
              Case No
            </TableCell>
            <TableCell className={classes.dateValue} align="left">
              Date Of Institution
            </TableCell>
            <TableCell align="left">Case Title</TableCell>
            {/* <TableCell align="left">Case Type</TableCell> */}
            <TableCell align="left">Action Abstract</TableCell>
            {/* <TableCell align="left">Institution Year</TableCell> */}
            <TableCell className={classes.dateValue} align="left">
              Next Date
            </TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingCases.length &&
            pendingCases.map((row) => (
              <TableRow hover key={row._id}>
                <TableCell component="th" scope="row">
                  {pendingCases.indexOf(row) + 1}
                </TableCell>
                <TableCell align="left">{row["Case No"]}</TableCell>
                <TableCell align="left">
                  {!row["Date of Institution "]
                    ? "null"
                    : format?.(
                        parseISO(row["Date of Institution "]),
                        "dd-MM-yyy"
                      )}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color:
                      row.disposed ||
                      row["Disposal OR Transfer Out Flag"] === "Transfer Out"
                        ? "red"
                        : "inherit",
                  }}
                >
                  {row["Case Title"]}
                </TableCell>
                {/* <TableCell align="left">{row["Case Type"]}</TableCell> */}
                <TableCell
                  align="right"
                  style={{
                    fontFamily: "Jameel Noori Nastaleeq",
                    fontSize: 20,
                  }}
                >
                  {row.actionAbstract?.replace(
                    /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
                    ""
                  )}
                </TableCell>
                {/* <TableCell align="left">{row["Institution Year"]}</TableCell> */}
                <TableCell
                  style={{
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  {!row.nextDate
                    ? "null"
                    : format?.(parseISO(row.nextDate), "dd-MM-yyy")}
                </TableCell>

                <TableCell align="left">
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to="/FormCases"
                    variant="outlined"
                    style={{ borderRadius: 50 }}
                    onClick={() => {
                      setCurrentId(row._id);
                      console.log(currentId);
                    }}
                  >
                    {<EditIcon />}
                  </Button>{" "}
                </TableCell>

                <TableCell align="left">
                  <Button
                    fontSize="small"
                    color="secondary"
                    size="small"
                    variant="outlined"
                    style={{ borderRadius: 50 }}
                    onClick={
                      () => handleDelete(row._id)

                      // () => dispatch(deleteCase(row._id))
                      // setCurrentId(row._id);
                      // console.log(currentId);
                    }
                  >
                    {<DeleteIcon fontSize="small" />}
                  </Button>
                </TableCell>

                {/* <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* <Button component={Link} to="/PrintDataTable">
          Print
        </Button> */}
    </TableContainer>

    {/* Delete confirmation dialog */}
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item
            {selectedRow && selectedRow.urduTitle}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </TabPanel>
  </>
  )
}