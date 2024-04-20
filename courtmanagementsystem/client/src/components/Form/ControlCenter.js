import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  TextField,
  Button,
  // Typography,
  Paper,
  Radio,
  // RadioGroup,
  FormControlLabel,
  FormControl,
  // FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Checkbox,
  // FormHelperText,
  Divider,
  CircularProgress
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
// import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";
// import useStyles2 from "../../dashboardExample/dashboard";
// import Container from "@material-ui/core/Container";
import {
  createControlCenter,
  getControlCenter,
  updateControlCenter,
} from "../../actions/controlCenter";
// import ClearAllIcon from "@material-ui/icons/ClearAll";
import SaveIcon from "@material-ui/icons/Save";
// import { addDays } from "date-fns";
// import Input from "@material-ui/core/Input";


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);

const ControlCenter = ({ currentId, setCurrentId }) => {
  
  const [poData, setPoData] = useState({
    presidingOfficer: "",
    causeListName: "",
    designation: "",
    judgeCategory: "",
    courtNumber: "",
    stationDistrict: "",
    courtStatus: "",
    //Monthly Data
    statementMonth: null,
    totalDays: "",
    totalSundays: "",
    leaves: "",
    otherHolidays: "",
    nonJudicialWorkingDays: "",
    noOfStrikesDays: "",
    netJudicialWorkingDays: "",
    incumbencyStatus: "",
    quartelrlyBacklogClearanceTarget: "",
  });

  const handleDateChange = (date) => {
    setPoData({ ...poData, statementMonth: date });
  };

  // const [selectedCaseType, setSelectedCaseType] = useState("Civil");
  // const poFile = useSelector((state) =>
  //   currentId ? state.controlCenter.find((c) => c._id === currentId) : state.controlCenter.data
  // );
  const poFile = useSelector((state) => state.controlCenter);
  console.log(poFile);
  useEffect(() => {
    // console.log(caseFile);
    // console.log('useEffect called');
    if (poFile) {
      // console.log(selectedCaseType);
      setPoData(poFile[0]);
      console.log(poFile[0]);
    }
  }, [poFile]);

  const classes = useStyles();
  // const classes2 = useStyles2();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getControlCenter());
  }, [dispatch]);

  // useEffect(() => {
  //   setSelectedCaseType("Civil");
  // }, []);

  // useEffect(() => {
  //   onPageChange(() =>
  //     currentId
  //       ? `Editing Case "${caseFile["Case Title"]}"`
  //       : "Creating New Case"
  //   );
  // }, [onPageChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateControlCenter(currentId, poData));
    } else {
      {
        dispatch(createControlCenter(poData));
      }
    }
    // clear();
  };
  // const clear = () => {
  //   setCurrentId(null);
  //   setSelectedCaseType("Civil");
  //   // setCaseData({"Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '', "Date of Institution ": selectedDate ,  "Date of Disposal": '', isTransferedIn: false, "Date of Transfered In": Date});
  //   // setInstitutionDate(new Date());
  //   setIsDisposed(false);
  //   setIsTransferOut(false);
  //   setIsRemandedRestored(false);
  //   setIsTransferedIn(false);
  //   setIsOtherNature(false);
  //   setPoData({
  //     "Case Title": "",
  //     urduTitle: "",
  //     "Case No": "",
  //     "Case Type": selectedCaseType,
  //     "Category Per PQS": "",
  //     "FIR NO": "",
  //     "FIR Date": new Date(),
  //     Thana: "",
  //     Section: "",
  //     "Date of Institution ": new Date(),
  //     "Date of Disposal Transfer Out": null,
  //     disposed: false,
  //     transferedOut: false,
  //     transferedIn: false,
  //     remandedRestored: false,
  //     AcquittalORConviction: "", //only for Criminal cases
  //     "Disposal OR Transfer Out Flag": "",
  //     "Disposal Mode Flag": "", //used for contested, non-contested etc
  //     "Date of Transfer In": null,
  //     "Date of Other Institution": null,
  //     "Institution Flag": "", //used for Remanded, Restored flags
  //     // nextDate: nextDate,
  //     orderNumber: "",
  //     actionAbstract: "",
  //     orderDate: new Date(),
  //     nature: "",
  //     isOtherNature: false,
  //   });
  // setSameAsInstitutiondate(false);
  // };

  return !poFile.length ? (
    <CircularProgress />
  ) : (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        {/* <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Case
        </Typography> */}

        <Grid container spacing={2} alignContent="center" justify="center">
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Presiding Officer
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={poData.presidingOfficer ? poData.presidingOfficer : ""}
                onChange={(e) =>
                  setPoData({
                    ...poData,
                    presidingOfficer: e.target.value,
                  })
                }
                label="Presiding Officer"
              >
                <MenuItem value="">Select Any</MenuItem>
                <MenuItem value={"PHC0813-90-1:Ms. Zaib Un Nisa Abbasi"}>
                  PHC0813-90-1:Ms. Zaib Un Nisa Abbasi
                </MenuItem>
                <MenuItem value={"PHC0747-87-1:Mr. Abdul Sattar Khan"}>
                  PHC0747-87-1:Mr. Abdul Sattar Khan
                </MenuItem>
                <MenuItem value={"PHC0693-90-1:Mr. Imran Ahmad"}>
                  PHC0693-90-1:Mr. Imran Ahmad
                </MenuItem>
                <MenuItem value={"PHC0745-93-1:Mr. Abdul Basit"}>
                  PHC0745-93-1:Mr. Abdul Basit
                </MenuItem>
                <MenuItem value={"PHC0290-73-1:Mr. Amin Said"}>
                  PHC0290-73-1:Mr. Amin Said
                </MenuItem>
                <MenuItem value={"PHC0750-92-1:Mr. Ahmad Daniyal Tanoli"}>
                  PHC0750-92-1:Mr. Ahmad Daniyal Tanoli
                </MenuItem>
                <MenuItem value={"PHC0797-92-1:Mr. Shabeer Ahmad"}>
                  PHC0797-92-1:Mr. Shabeer Ahmad
                </MenuItem>
                {/* <MenuItem value={""}></MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              className={classes.uFont}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontSize: 22,
                  fontFamily: "Jameel Noori Nastaleeq",
                },
              }}
              InputLabelProps={{ style: { textAlign: "right" } }}
              name="causeListName"
              variant="outlined"
              label="Cause List Name"
              fullWidth
              value={poData.causeListName ? poData.causeListName : ""}
              onChange={(e) =>
                setPoData({ ...poData, causeListName: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Designation
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={poData.designation}
                onChange={(e) =>
                  setPoData({
                    ...poData,
                    designation: e.target.value,
                  })
                }
                label="Designation"
              >
                <MenuItem value={"District & Sessions Judge"}>
                  District & Sessions Judge
                </MenuItem>
                <MenuItem value={"Addl: District & Sessions Judge"}>
                  Addl: District & Sessions Judge
                </MenuItem>
                <MenuItem
                  value={"Senior Civil Judge (Judicial)  Judicial Magistrate"}
                >
                  Senior Civil Judge (Judicial) \ Judicial Magistrate
                </MenuItem>
                <MenuItem
                  value={"Senior Civil Judge (Admin)  Judicial Magistrate"}
                >
                  Senior Civil Judge (Admin) \ Judicial Magistrate
                </MenuItem>
                <MenuItem value={"Civil Judge/Judicial Magistrate"}>
                  Civil Judge/Judicial Magistrate
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Judge Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={poData.judgeCategory}
                onChange={(e) =>
                  setPoData({
                    ...poData,
                    judgeCategory: e.target.value,
                  })
                }
                label="Judge Category"
              >
                <MenuItem
                  value={
                    "District & Sessions Judge (Both Civil and Criminal Matter)"
                  }
                >
                  District & Sessions Judge (Both Civil and Criminal Matter)
                </MenuItem>
                <MenuItem value={"District Judge (Exclusive Civil Matter)"}>
                  District Judge (Exclusive Civil Matter)
                </MenuItem>
                <MenuItem value={"Sessions Judge (Exclusive Criminal Matter)"}>
                  Sessions Judge (Exclusive Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Addl: District & Sessions Judge (Both Civil and Criminal Matter)"
                  }
                >
                  Addl: District & Sessions Judge (Both Civil and Criminal
                  Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Addl: District & Sessions Judge (Exclusive Criminal Matter)"
                  }
                >
                  "Addl: District & Sessions Judge (Exclusive Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Addl: District & Sessions Judge (Exclusive Civil Matter)"
                  }
                >
                  Addl: District & Sessions Judge (Exclusive Civil Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Senior Civil Judge (Judicial) (Both Civil and Criminal Matter)"
                  }
                >
                  Senior Civil Judge (Judicial) (Both Civil and Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Senior Civil Judge (Admin) (Both Civil and Criminal Matter)"
                  }
                >
                  Senior Civil Judge (Admin) (Both Civil and Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={"Senior Civil Judge (Admin) (Exclusive Civil Matter)"}
                >
                  Senior Civil Judge (Admin) (Exclusive Civil Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Senior Civil Judge (Judicial) (Exclusive Civil Matter)"
                  }
                >
                  Senior Civil Judge (Judicial) (Exclusive Civil Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Civil Judge/Judicial Magistrate (Both Civil and Criminal Matter)"
                  }
                >
                  Civil Judge/Judicial Magistrate (Both Civil and Criminal
                  Matter)
                </MenuItem>
                <MenuItem value={"Civil Judge (Exclusive Civil Matter)"}>
                  Civil Judge (Exclusive Civil Matter)
                </MenuItem>
                <MenuItem
                  value={"Judicial Magistrate (Exclusive Criminal Matter)"}
                >
                  Judicial Magistrate (Exclusive Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Senior Civil Judge (Admin)JM (Exclusive Criminal Matter)"
                  }
                >
                  Senior Civil Judge (Admin)\JM (Exclusive Criminal Matter)
                </MenuItem>
                <MenuItem
                  value={
                    "Senior Civil Judge (Judicial)JM (Exclusive Criminal Matter)"
                  }
                >
                  Senior Civil Judge (Judicial)\JM (Exclusive Criminal Matter)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Court Number
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={poData.courtNumber}
                onChange={(e) =>
                  setPoData({
                    ...poData,
                    courtNumber: e.target.value,
                  })
                }
                label="Court Number"
              >
                <MenuItem value="DSJ-1">DSJ-1</MenuItem>
                <MenuItem value="ASJ-1">ASJ-1</MenuItem>
                <MenuItem value="ADJ-1">ADJ-1</MenuItem>
                <MenuItem value="ADSJ-1">ADSJ-1</MenuItem>
                <MenuItem value="SCJ">SCJ</MenuItem>
                <MenuItem value="CJ/JM-1">CJ/JM-1</MenuItem>
                <MenuItem value="CJ/JM-2">CJ/JM-2</MenuItem>
                <MenuItem value="CJ/JM-3">CJ/JM-3</MenuItem>
                <MenuItem value="CJ/JM-4">CJ/JM-4</MenuItem>
                <MenuItem value="CJ/JM-5">CJ/JM-5</MenuItem>
                <MenuItem value="CJ/JM-6">CJ/JM-6</MenuItem>
                <MenuItem value="CJ-1">CJ-1</MenuItem>
                <MenuItem value="CJ-2">CJ-2</MenuItem>
                <MenuItem value="CJ-3">CJ-3</MenuItem>
                <MenuItem value="CJ-4">CJ-4</MenuItem>
                <MenuItem value="CJ-5">CJ-5</MenuItem>
                <MenuItem value="CJ-6">CJ-6</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              {/* <Grid container justifyContent="space-around"> */}
              {/* <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Institution Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                /> */}
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                // margin="normal"
                id="date-picker-inline"
                // id="date-picker-dialog"
                label="Statement for the Month of"
                autoOk
                format="dd/MM/yyyy"
                value={
                  poData.statementMonth ? poData.statementMonth : new Date()
                }
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
            {/* </Container> */}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Divider></Divider>
          </Grid>

          <Box component="div" mt={4} style={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  className={classes.buttonSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  SAVE
                </Button>
              </Grid>

              {/* <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  // onClick={clear}
                  startIcon={<ClearAllIcon />}
                >
                  Clear All
                </Button>
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
      </form>
    </Paper>
  );
};

export default ControlCenter;

// import React from 'react';
// import Grid from '@material-ui/core/Grid';

// export default function FormCases() {
//     // The first commit of Material-UI

//     return (

//     );
// }
