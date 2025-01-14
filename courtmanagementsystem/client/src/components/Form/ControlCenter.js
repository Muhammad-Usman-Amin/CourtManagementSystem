import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
  // DatePicker,
} from "@material-ui/pickers";

import {
  TextField,
  Container,
  Button,
  // Typography,
  Paper,
  // Radio,
  // RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Checkbox,
  // FormHelperText,
  Divider,
  // CircularProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
// import { green } from "@material-ui/core/colors";
// import { withStyles } from "@material-ui/core/styles";
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
import EditIcon from "@material-ui/icons/Edit";
// import { addDays } from "date-fns";
// import Input from "@material-ui/core/Input";

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);

const useStyles2 = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const ControlCenter = () => {
  const dispatch = useDispatch();
  const poFile = useSelector((state) => state.controlCenter);
  const classes2 = useStyles2();
  const [editView, setEditView] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [poData, setPoData] = useState({
    presidingOfficer: "",
    causeListName: "",
    causeListEnglishName: "",
    designation: "",
    judgeCategory: "",
    courtNumber: "",
    stationDistrict: "",
    backlogDate: new Date(),
    courtStatus: {
      Regular: false,
      CPC: false,
      MCTC: false,
      MTMC: false,
      MCAC: false,
      specialCourt: false,
      GBV: false,
      antiRapeOrd: false,
      familyCourt: false,
      rentCourt: false,
      campCourt: false,
    },
    monthlyData: [
      {
        statementMonth: Date,
        totalDays: "",
        totalSundays: "",
        leaves: "",
        otherHolidays: "",
        nonJudicialWorkingDays: "",
        noOfStrikesDays: "",
        netJudicialWorkingDays: "",
        incumbencyStatus: "",
        quartelrlyBacklogClearanceTarget: "",
      },
    ],
  });

  const [cStatus, setCourtStatus] = useState({
    Regular: false,
    CPC: false,
    MCTC: false,
    MTMC: false,
    MCAC: false,
    specialCourt: false,
    GBV: false,
    antiRapeOrd: false,
    familyCourt: false,
    rentCourt: false,
    campCourt: false,
  });

  // const [selectedCaseType, setSelectedCaseType] = useState("Civil");
  // const poFile = useSelector((state) =>
  //   currentId ? state.controlCenter.find((c) => c._id === currentId) : state.controlCenter.data
  // );

  const getCurrentMonthYear = (date) => {
    const currentDate = new Date(date);
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };
  const [monthlyDate, setMonthlyDate] = useState(
    getCurrentMonthYear(new Date())
  );
  const [backlogDate, setBacklogDate] = useState(new Date());

  const handleBacklogDateChange = (date) => {
    setBacklogDate(date);
    // setPoData(prev => ...prev, backlogDate: date);
    setPoData((prev) => ({
            ...prev,
            backlogDate: date, // Update state date
          }));
  }

  const handleDateChange = (date) => {
    setMonthlyDate(date);
    setPoData({
      ...poData,
      monthlyData: [
        ...poData.monthlyData,
        { statementMonth: getCurrentMonthYear(date) },
      ],
    });
  };
  // console.log(poData);
  // console.log(monthlyDate);
  // const handleDateChangep = (date) => {
  //   setSelectedDate(date);
  // };
  // console.log(poFile);
  useEffect(() => {
    // console.log(caseFile);
    // console.log('useEffect called');
    if (poFile.length) {
      // console.log(poFile);
      setPoData(poFile[0]);
      setCourtStatus(poFile[0].courtStatus);

      // console.log(poData.courtStatus);
      // setCourtStatus(poData.courtStatus);

      // console.log(cStatus);
      // console.log(cStatus.Regular);
      // console.log(poData);
    } else {
      setEditView(true);
    }
  }, [poFile]);

  const classes = useStyles();
  // const classes2 = useStyles2();

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

  const handleCourtStatusChnage = (event) => {
    const { name, checked } = event.target;
    // console.log(name +"-"+ checked);
    // setCourtStatus({ ...cStatus, [name]: checked });
    setCourtStatus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    // console.log(cStatus);
    // setPoData({ ...poData, courtStatus: cStatus });
    // console.log(cStatus);
  };
  useEffect(() => {
    // This block of code will run whenever cStatus changes
    // Copy the updated cStatus to poData.courtStatus
    setPoData({ ...poData, courtStatus: cStatus });
    // console.log(poData.courtStatus);
  }, [cStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      // console.log("update dispatch: ");
      // console.log(poData);
      dispatch(updateControlCenter(currentId, poData));
      setCurrentId(null);
    } else {
      {
        dispatch(createControlCenter(poData));
      }
    }
    setEditView(false);
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

  return !editView ? (
    <>
      <Container>
        {/* <Typography variant="h4" gutterBottom className={classes2.heading}>
        Court Details
      </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Presiding Officer:</Typography>
              <Typography>{poData.presidingOfficer}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Cause List Name:</Typography>
              <Typography
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontFamily: "Jameel Noori Nastaleeq",
                  direction: "rtl",
                }}
              >
                {poData.causeListName}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Designation:</Typography>
              <Typography>{poData.designation}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Judge Category:</Typography>
              <Typography>{poData.judgeCategory}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Court Number:</Typography>
              <Typography>{poData.courtNumber}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Station District:</Typography>
              <Typography>{poData.stationDistrict}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper elevation={3} variant="outlined" className={classes2.paper}>
              <Typography variant="h6">Court Status:</Typography>
              <FormControl component="fieldset">
                <Grid container>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.Regular ? cStatus.Regular : false}
                        onChange={handleCourtStatusChnage}
                        name="Regular"
                      />
                    }
                    label="Regular"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.CPC ? cStatus.CPC : false}
                        onChange={handleCourtStatusChnage}
                        name="CPC"
                      />
                    }
                    label="CPC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.MCTC ? cStatus.MCTC : false}
                        onChange={handleCourtStatusChnage}
                        name="MCTC"
                      />
                    }
                    label="MCTC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.MTMC ? cStatus.MTMC : false}
                        onChange={handleCourtStatusChnage}
                        name="MTMC"
                      />
                    }
                    label="MTMC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.MCAC ? cStatus.MCAC : false}
                        onChange={handleCourtStatusChnage}
                        name="MCAC"
                      />
                    }
                    label="MCAC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={
                          cStatus?.specialCourt ? cStatus.specialCourt : false
                        }
                        onChange={handleCourtStatusChnage}
                        name="specialCourt"
                      />
                    }
                    label="Special Court"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.GBV ? cStatus.GBV : false}
                        onChange={handleCourtStatusChnage}
                        name="GBV"
                      />
                    }
                    label="GBV"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={
                          cStatus?.antiRapeOrd ? cStatus.antiRapeOrd : false
                        }
                        onChange={handleCourtStatusChnage}
                        name="antiRapeOrd"
                      />
                    }
                    label="Anti Rape Ord"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={
                          cStatus?.familyCourt ? cStatus.familyCourt : false
                        }
                        onChange={handleCourtStatusChnage}
                        name="familyCourt"
                      />
                    }
                    label="Family Court"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.rentCourt ? cStatus.rentCourt : false}
                        onChange={handleCourtStatusChnage}
                        name="rentCourt"
                      />
                    }
                    label="Rent Court"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={cStatus?.campCourt ? cStatus.campCourt : false}
                        onChange={handleCourtStatusChnage}
                        name="campCourt"
                      />
                    }
                    label="Camp Court"
                  />
                </Grid>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              size="large"
              color="primary"
              fullWidth
              // component={Link}
              // to="/FormCases"
              variant="contained"
              style={{ borderRadius: 50 }}
              startIcon={<EditIcon />}
              onClick={() => {
                setCurrentId(poData._id);
                setEditView(true);
                // console.log(currentId);
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
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
          <Grid item xs={12} sm={6}>
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

                <MenuItem value={"PHC0604-81-1:Mr. Shah Nofal"}>
                  PHC0604-81-1:Mr. Shah Nofal
                </MenuItem>
                <MenuItem value={"PHC0665-83-1:Mr. Sheik Waqas Ahmad"}>
                  PHC0665-83-1:Mr. Sheik Waqas Ahmad
                </MenuItem>
                <MenuItem value={"PHC0611-83-1:Mr. Hafeez Ullah"}>
                  PHC0611-83-1:Mr. Hafeez Ullah
                </MenuItem>
                <MenuItem value={"PHC0677-82-3:Mr. Muhammad Sajid"}>
                  PHC0677-82-3:Mr. Muhammad Sajid
                </MenuItem>
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

          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={12}>
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

          <Grid item xs={12} sm={5}>
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

          <Grid item xs={12} sm={7}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Station / District
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={poData.stationDistrict}
                onChange={(e) =>
                  setPoData({
                    ...poData,
                    stationDistrict: e.target.value,
                  })
                }
                label="Station / District"
              >
                <MenuItem value="Lower Dir - Balambat">
                  Lower Dir - Balambat
                </MenuItem>
                <MenuItem value="Lower Dir - Timergara">
                  Lower Dir - Timergara
                </MenuItem>
                <MenuItem value="Lower Dir - Chakdara">
                  Lower Dir - Chakdara
                </MenuItem>
                <MenuItem value="Lower Dir - Samarbagh">
                  Lower Dir - Samarbagh
                </MenuItem>
                <MenuItem value="Lower Dir - Lal Qilla">
                  Lower Dir - Lal Qilla
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
              <legend>Court Status</legend>
              <Grid container>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.Regular ? cStatus.Regular : false}
                      onChange={handleCourtStatusChnage}
                      name="Regular"
                    />
                  }
                  label="Regular"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.CPC ? cStatus.CPC : false}
                      onChange={handleCourtStatusChnage}
                      name="CPC"
                    />
                  }
                  label="CPC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.MCTC ? cStatus.MCTC : false}
                      onChange={handleCourtStatusChnage}
                      name="MCTC"
                    />
                  }
                  label="MCTC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.MTMC ? cStatus.MTMC : false}
                      onChange={handleCourtStatusChnage}
                      name="MTMC"
                    />
                  }
                  label="MTMC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.MCAC ? cStatus.MCAC : false}
                      onChange={handleCourtStatusChnage}
                      name="MCAC"
                    />
                  }
                  label="MCAC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        cStatus?.specialCourt ? cStatus.specialCourt : false
                      }
                      onChange={handleCourtStatusChnage}
                      name="specialCourt"
                    />
                  }
                  label="Special Court"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.GBV ? cStatus.GBV : false}
                      onChange={handleCourtStatusChnage}
                      name="GBV"
                    />
                  }
                  label="GBV"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        cStatus?.antiRapeOrd ? cStatus.antiRapeOrd : false
                      }
                      onChange={handleCourtStatusChnage}
                      name="antiRapeOrd"
                    />
                  }
                  label="Anti Rape Ord"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        cStatus?.familyCourt ? cStatus.familyCourt : false
                      }
                      onChange={handleCourtStatusChnage}
                      name="familyCourt"
                    />
                  }
                  label="Family Court"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.rentCourt ? cStatus.rentCourt : false}
                      onChange={handleCourtStatusChnage}
                      name="rentCourt"
                    />
                  }
                  label="Rent Court"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cStatus?.campCourt ? cStatus.campCourt : false}
                      onChange={handleCourtStatusChnage}
                      name="campCourt"
                    />
                  }
                  label="Camp Court"
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
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
              label="Cause List Name in URDU"
              fullWidth
              value={poData.causeListName ? poData.causeListName : ""}
              onChange={(e) =>
                setPoData({ ...poData, causeListName: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              // className={classes.uFont}
              // inputProps={{
              //   style: {
              //     textAlign: "center",
              //     fontSize: 22,
              //     fontFamily: "Jameel Noori Nastaleeq",
              //   },
              // }}
              // InputLabelProps={{ style: { textAlign: "right" } }}
              name="causeListEnglishName"
              variant="outlined"
              label="Cause List Name in ENGLISH"
              fullWidth
              value={
                poData.causeListEnglishName ? poData.causeListEnglishName : ""
              }
              onChange={(e) =>
                setPoData({ ...poData, causeListEnglishName: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Divider></Divider>
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
                views={['year', 'month', 'date']}
                // views={["month"]}
                // disableToolbar
                variant="inline"
                // margin="normal"
                id="date-picker-inline"
                // id="date-picker-dialog"
                label="Select backlog date"
                autoOk
                format="dd MMMM yyyy"
                value={poData.backlogDate ? poData.backlogDate : backlogDate}
                onChange={handleBacklogDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
            {/* </Container> */}
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
                // views={['year', 'month']}
                views={["month"]}
                disableToolbar
                variant="inline"
                // margin="normal"
                id="date-picker-inline"
                // id="date-picker-dialog"
                label="Statement for the Month of"
                autoOk
                format="MMMM yyyy"
                value={
                  monthlyDate
                  // poData.statementMonth ? poData.statementMonth : new Date()
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

          {/* <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <DatePicker
              views={["year", "month"]}
              label="Select Month and Year"
              value={selectedDate}
              onChange={handleDateChangep}
              inputVariant="outlined"
              renderInput={(props) => (
                <TextField
                  {...props}
                  variant="outlined"
                  InputProps={{ ...props.InputProps, readOnly: true }}
                  value={
                    selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : ""
                  }
                />
              )}
            />
            </MuiPickersUtilsProvider>
          </Grid> */}

          <Box
            component="div"
            mt={4}
            style={{ width: "100%", display: "block" }}
          >
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
