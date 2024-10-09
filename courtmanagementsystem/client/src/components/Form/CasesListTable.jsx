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

// import { getEmployeeData } from './actions/employeeData';
// import { parseISO } from 'date-fns/parseISO';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  dateValue: {
    // minWidth: "100px",
    whiteSpace: "nowrap",
  },
});

// const Tab1Content = React.lazy(() => import('./TabPanel'));
// const Tab1Content = React.lazy(() => import('./PendingCasesTab'));
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
export default function CasesListTable({
  currentId,
  setCurrentId,
  onPageChange,
}) {
  const dispatch = useDispatch();
  const tableRef = React.useRef();

  // useEffect(() => {
  //   dispatch(getEmployeeData());
  //   dispatch(getCases({ reqQuery: "All" }));
  //   dispatch(
  //     getPendingCases({ reqQuery: "PendingCases", datePendency: new Date() })
  //   );
  //   dispatch(
  //     getInstitutionCases({
  //       reqQuery: "InstitutionCases",
  //       dateInstitution: new Date(),
  //     })
  //   );
  //   dispatch(
  //     getDisposalCases({ reqQuery: "DisposalCases", dateDisposal: new Date() })
  //   );
  //   dispatch(getControlCenter());
  // }, [dispatch]);

  // const handlePrint = useReactToPrint({
  //   content: () => tableRef.current,
  // });

  // const queryData = useSelector((state) => state.queryData);
  const classes = useStyles();

  useEffect(() => {
    return () => {
      // Cleanup function runs when navigating away from the component (unmount)
      // console.log('Navigating away...');
      // Call your function here
      
      dispatch(
        getPendingCases({ reqQuery: "PendingCases", datePendency: new Date() })
      );
      dispatch(
        getInstitutionCases({
          reqQuery: "InstitutionCases",
          dateInstitution: new Date(),
        })
      );
      dispatch(
        getDisposalCases({ reqQuery: "DisposalCases", dateDisposal: new Date() })
      );
    };
  }, []);

  useEffect(() => {
    dispatch(getCases({ reqQuery: "All" }));
  }, [dispatch]);

  useEffect(() => {
    setCurrentId(null);
    onPageChange("Cases List");
  }, [onPageChange, setCurrentId]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
  const [datePendency, setDatePendency] = useState(new Date());
  const [dateInstitution, setDateInstitution] = useState(new Date());
  const [dateDisposal, setDateDisposal] = useState(new Date());
  const cases = useSelector((state) => state.cases);
  const pendingCases = useSelector((state) => state.pendingCases);
  const institutionCases = useSelector((state) => state.institutionCases);
  const disposalCases = useSelector((state) => state.disposalCases);

  const getInst = async (data) => {
    // console.log(data);
    dispatch(
      getInstitutionCases({
        reqQuery: "InstitutionCases",
        dateInstitution: data,
      })
    );
    // console.log(cases);
  };
  const getPend = async (data) => {
    // console.log(data);
    dispatch(getPendingCases({ reqQuery: "PendingCases", datePendency: data }));
    // console.log(cases);
  };
  const getDisp = async (data) => {
    // console.log(data);
    dispatch(
      getDisposalCases({ reqQuery: "DisposalCases", dateDisposal: data })
    );
    // console.log(cases);
  };

  useEffect(() => {
    getInst(dateInstitution);
  }, [dateInstitution]);

  useEffect(() => {
    getPend(datePendency);
  }, [datePendency]);

  useEffect(() => {
    getDisp(dateDisposal);
  }, [dateDisposal]);

  return !cases.length ? (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "75vh", width: "75vw" }}
    >
      {/* <Grid item xs={12} sm={12} style={{ height: '100vh' }}> */}
      <CircularProgress />
      {/* </Grid> */}
    </Grid>
  ) : (
    <>
      {selectedTab === 0 && (
        <Grid container spacing={1} alignItems="center" justify="center">
          {/* justifyContent not working so use justify=center */}
          {/* <Grid item xs={12} sm={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // margin="normal"
                views={["month"]}
                id="date-picker-causeList"
                label="Select Pendency Month"
                autoOk
                variant="inline"
                format="MMMM yyyy"
                value={datePendency}
                onChange={(date) => {
                  // setCaseId(caseFile._id);
                  // setCurrentId(caseFile._id);
                  setDatePendency(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} sm={3} justify="space-between">
            
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintPendency",
                // pathname: "/PrintButton",
                state: {
                  datePendency: datePendency,
                },
              }}
            >
              Print Pendency
            </Button>
            <Divider orientation="vertical" flexItem />
          </Grid> */}
          <Grid item xs={12} sm={12}>
            {pendingCases.length && (
              <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Total Registered Cases : {cases.length}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
            <Divider orientation="horizontal" />
          </Grid>
        </Grid>
      )}
      {selectedTab === 1 && (
        <Grid container spacing={1} alignItems="center" justify="center">
          {/* justifyContent not working so use justify=center */}
          <Grid item xs={12} sm={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // margin="normal"
                views={["month"]}
                id="date-picker-causeList"
                label="Select Pendency Month"
                autoOk
                variant="inline"
                format="MMMM yyyy"
                value={datePendency}
                onChange={(date) => {
                  // setCaseId(caseFile._id);
                  // setCurrentId(caseFile._id);
                  setDatePendency(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} sm={6} justify="space-between">
            {/* <Divider orientation="vertical" flexItem /> */}
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintPendency",
                // pathname: "/PrintButton",
                state: {
                  datePendency: datePendency,
                  backlog: "false",
                },
              }}
            >
              Print Pendency
            </Button>
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintPendency",
                // pathname: "/PrintButton",
                state: {
                  datePendency: datePendency,
                  backlog: "true",
                },
              }}
            >
              Print Backlog
            </Button>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={12} sm={3}>
            {pendingCases.length && (
              <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Total Pendency : {pendingCases.length}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
            <Divider orientation="horizontal" />
          </Grid>
        </Grid>
      )}
      {selectedTab === 2 && (
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item xs={12} sm={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // margin="normal"
                views={["month"]}
                id="date-picker-causeList"
                label="Select Institutions Month"
                autoOk
                variant="inline"
                format="MMMM yyyy"
                value={dateInstitution}
                onChange={(date) => {
                  // setCaseId(caseFile._id);
                  // setCurrentId(caseFile._id);
                  setDateInstitution(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} sm={6} justify="space-between">
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintInstitution",
                state: {
                  dateInstitution: dateInstitution,
                },
              }}
            >
              Print Institutions
            </Button>
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintFortnitely",
                state: {
                  dateInstitution: dateInstitution,
                },
              }}
            >
              Print Fortnitely
            </Button>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Total Institutions : {institutionCases.length}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
            <Divider orientation="horizontal" />
          </Grid>
        </Grid>
      )}
      {selectedTab === 3 && (
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item xs={12} sm={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // margin="normal"
                views={["month"]}
                id="date-picker-causeList"
                label="Select Disposal Month"
                autoOk
                variant="inline"
                format="MMMM yyyy"
                value={dateDisposal}
                onChange={(date) => {
                  // setCaseId(caseFile._id);
                  // setCurrentId(caseFile._id);
                  setDateDisposal(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} sm={3} justify="space-between">
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              size="large"
              // startIcon={<EditIcon />}
              color="primary"
              style={{ borderRadius: 5, marginBottom: 10 }}
              component={Link}
              to={{
                pathname: "/PrintDisposal",
                state: {
                  dateDisposal: dateDisposal,
                },
              }}
            >
              Print Disposal
            </Button>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Total Disposal : {disposalCases.length}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
            <Divider orientation="horizontal" />
          </Grid>
        </Grid>
      )}

      <div>
        <AppBar position="static">
          <Tabs
            centered
            value={selectedTab}
            onChange={handleChange}
            aria-label="Case tabs"
          >
            <Tab label="All Cases" />
            <Tab label="Pending Cases" />
            <Tab label="Institution Cases" />
            <Tab label="Disposal Cases" />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          {/* Render your Pending Cases table component here */}
          {/* <PendingCasesTable /> */}
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
                {cases.map((row) => (
                  <TableRow hover key={row._id}>
                    <TableCell component="th" scope="row">
                      {cases.indexOf(row) + 1}
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
                          row["Disposal OR Transfer Out Flag"] ===
                            "Transfer Out"
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
                        // fontFamily: "Jameel Noori Nastaleeq",
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
                      style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
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
                <Button
                  onClick={handleDeleteConfirmation}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
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
                            row["Disposal OR Transfer Out Flag"] ===
                              "Transfer Out"
                              ? "red"
                              : "inherit",
                        }}
                      >
                        {row["Case Title"]}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          // fontFamily: "Jameel Noori Nastaleeq",
                          fontSize: 20,
                        }}
                      >
                        {row.actionAbstract?.replace(
                          /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
                          ""
                        )}
                      </TableCell>
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                <Button
                  onClick={handleDeleteConfirmation}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
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
                  <TableCell align="left">Date of Transfer In</TableCell>
                  {/* <TableCell align="left">Institution Year</TableCell> */}
                  <TableCell className={classes.dateValue} align="left">
                    Date of other Institution
                  </TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                  {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {console.log(institutionCases)} */}
                {!institutionCases.length ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No Cases Found
                    </TableCell>
                  </TableRow>
                ) : (
                  institutionCases.map((row) => (
                    <TableRow hover key={row._id}>
                      <TableCell component="th" scope="row">
                        {institutionCases.indexOf(row) + 1}
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
                        style={{ color: row.disposed ? "red" : "inherit" }}
                      >
                        {row["Case Title"]}
                        {row["Date of Transfer In"] ? (
                          <span style={{ color: "red" }}> (Transfered In)</span>
                        ) : (
                          ""
                        )}

                        {row["Date of Other Institution"] ? (
                          <span style={{ color: "red" }}>
                            {" "}
                            ({row["Institution Flag"]})
                          </span>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      {/* <TableCell align="left">{row["Case Type"]}</TableCell> */}
                      {/* <TableCell
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
                    </TableCell> */}
                      <TableCell align="left">
                        {!row["Date of Transfer In"]
                          ? ""
                          : format?.(
                              parseISO(row["Date of Transfer In"]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>

                      <TableCell align="left">
                        {!row["Date of Other Institution"]
                          ? ""
                          : format?.(
                              parseISO(row["Date of Other Institution"]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      {/* <TableCell align="left">{row["Institution Year"]}</TableCell> */}
                      {/* <TableCell
                      style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                      align="left"
                    >
                      {!row.nextDate
                        ? "null"
                        : format?.(parseISO(row.nextDate), "dd-MM-yyy")}
                    </TableCell> */}

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
                            // console.log(currentId);
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
                  ))
                )}
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
                <Button
                  onClick={handleDeleteConfirmation}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
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
                  <TableCell align="left">Date of Transfer In</TableCell>
                  {/* <TableCell align="left">Institution Year</TableCell> */}
                  <TableCell className={classes.dateValue} align="left">
                    Date of Disposal
                  </TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                  {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {!disposalCases.length ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No Cases Found
                    </TableCell>
                  </TableRow>
                ) : (
                  disposalCases.map((row) => (
                    <TableRow hover key={row._id}>
                      <TableCell component="th" scope="row">
                        {disposalCases.indexOf(row) + 1}
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
                        style={{ color: row.disposed ? "red" : "inherit" }}
                      >
                        {row["Case Title"]}
                        {row["Date of Transfer In"] ? (
                          <span style={{ color: "red" }}> (Transfered In)</span>
                        ) : (
                          ""
                        )}

                        {row["Date of Other Institution"] ? (
                          <span style={{ color: "red" }}>
                            {" "}
                            ({row["Institution Flag"]})
                          </span>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      {/* <TableCell align="left">{row["Case Type"]}</TableCell> */}
                      {/* <TableCell
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
                    </TableCell> */}
                      <TableCell align="left">
                        {!row["Date of Transfer In"]
                          ? ""
                          : format?.(
                              parseISO(row["Date of Transfer In"]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>

                      <TableCell align="left">
                        {!row["Date of Disposal Transfer Out"]
                          ? ""
                          : format?.(
                              parseISO(row["Date of Disposal Transfer Out"]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      {/* <TableCell align="left">{row["Institution Year"]}</TableCell> */}
                      {/* <TableCell
                      style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                      align="left"
                    >
                      {!row.nextDate
                        ? "null"
                        : format?.(parseISO(row.nextDate), "dd-MM-yyy")}
                    </TableCell> */}

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
                            // console.log(currentId);
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
                  ))
                )}
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
                <Button
                  onClick={handleDeleteConfirmation}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>
      </div>
    </>
  );
}
