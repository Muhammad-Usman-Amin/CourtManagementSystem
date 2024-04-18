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
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Checkbox,
  FormHelperText,
  Divider,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
// import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";
// import useStyles2 from "../../dashboardExample/dashboard";
// import Container from "@material-ui/core/Container";
import { createCase, updateCase } from "../../actions/cases";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import SaveIcon from "@material-ui/icons/Save";
// import { addDays } from "date-fns";
import Input from '@material-ui/core/Input';


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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

  const [selectedCaseType, setSelectedCaseType] = useState("Civil");
  const caseFile = useSelector((state) =>
    currentId ? state.cases.find((c) => c._id === currentId) : null
  );
  const classes = useStyles();
  // const classes2 = useStyles2();
  const dispatch = useDispatch();

  const [courtNo, setCourtNo] = React.useState(1);

  const handleBlur = () => {
    if (courtNo < 0) {
      setCourtNo(0);
    } else if (courtNo > 50) {
      setCourtNo(50);
    }
  };

  const handleCourtNumberChange = (event) => {
    setCourtNo(event.target.value === '' ? '' : Number(event.target.value));
  };

  useEffect(() => {
    setSelectedCaseType("Civil");
  }, []);
  const [isDisposed, setIsDisposed] = useState(false);
  const [isTransferOut, setIsTransferOut] = useState(false);
  const [isTransferedIn, setIsTransferedIn] = useState(false);
  const [isRemandedRestored, setIsRemandedRestored] = useState(false);
  const [isOtherNature, setIsOtherNature] = useState(false);
  useEffect(() => {
    // console.log(caseFile);
    // console.log('useEffect called');
    if (caseFile) {
      setSelectedCaseType(caseFile["Case Type"]);
      // setInstitutionDate(caseFile["Date of Institution "]);
      // setNextDate(caseFile.nextDate ? caseFile.nextDate : nextDate);
      // console.log(selectedCaseType);
      setPoData(caseFile);
      caseFile["Date of Disposal Transfer Out"]
        ? setIsDisposed(true)
        : setIsDisposed(false);
      caseFile["Date of Transfer In"]
        ? setIsTransferedIn(true)
        : setIsTransferedIn(false);
      caseFile["Date of Other Institution"]
        ? setIsRemandedRestored(true)
        : setIsRemandedRestored(false);
      caseFile["Disposal Mode Flag"] === "Transfer Out"
        ? setIsTransferOut(true)
        : setIsTransferOut(false);
      caseFile.isOtherNature ? setIsOtherNature(true) : setIsOtherNature(false);
    }
  }, [caseFile]);

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
      dispatch(updateCase(currentId, poData));
    } else {
      if (selectedCaseType === "Civil") {
        setPoData({
          ...poData,
          "FIR NO": "",
          Thana: "",
          Section: "",
        });
        dispatch(createCase(poData));
      } else {
        dispatch(createCase(poData));
      }
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setSelectedCaseType("Civil");
    // setCaseData({"Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '', "Date of Institution ": selectedDate ,  "Date of Disposal": '', isTransferedIn: false, "Date of Transfered In": Date});
    // setInstitutionDate(new Date());
    setIsDisposed(false);
    setIsTransferOut(false);
    setIsRemandedRestored(false);
    setIsTransferedIn(false);
    setIsOtherNature(false);
    setPoData({
      "Case Title": "",
      urduTitle: "",
      "Case No": "",
      "Case Type": selectedCaseType,
      "Category Per PQS": "",
      "FIR NO": "",
      "FIR Date": new Date(),
      Thana: "",
      Section: "",
      "Date of Institution ": new Date(),
      "Date of Disposal Transfer Out": null,
      disposed: false,
      transferedOut: false,
      transferedIn: false,
      remandedRestored: false,
      AcquittalORConviction: "", //only for Criminal cases
      "Disposal OR Transfer Out Flag": "",
      "Disposal Mode Flag": "", //used for contested, non-contested etc
      "Date of Transfer In": null,
      "Date of Other Institution": null,
      "Institution Flag": "", //used for Remanded, Restored flags
      // nextDate: nextDate,
      orderNumber: "",
      actionAbstract: "",
      orderDate: new Date(),
      nature: "",
      isOtherNature: false,
    });
    // setSameAsInstitutiondate(false);
  };

  return (
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
                  value={poData.presidingOfficer}
                  onChange={(e) =>
                    setPoData({
                      ...poData,
                      presidingOfficer: e.target.value,
                    })
                  }
                  label="Presiding Officer"
                >
                  <MenuItem value={"PHC0813-90-1:Ms. Zaib Un Nisa Abbasi"}>PHC0813-90-1:Ms. Zaib Un Nisa Abbasi</MenuItem>
                  <MenuItem value={"PHC0747-87-1:Mr. Abdul Sattar Khan"}>PHC0747-87-1:Mr. Abdul Sattar Khan</MenuItem>
                  <MenuItem value={"PHC0693-90-1:Mr. Imran Ahmad"}>PHC0693-90-1:Mr. Imran Ahmad</MenuItem>
                  <MenuItem value={"PHC0745-93-1:Mr. Abdul Basit"}>PHC0745-93-1:Mr. Abdul Basit</MenuItem>
                  <MenuItem value={"PHC0290-73-1:Mr. Amin Said"}>PHC0290-73-1:Mr. Amin Said</MenuItem>
                  <MenuItem value={"PHC0750-92-1:Mr. Ahmad Daniyal Tanoli"}>PHC0750-92-1:Mr. Ahmad Daniyal Tanoli</MenuItem>
                  <MenuItem value={"PHC0797-92-1:Mr. Shabeer Ahmad"}>PHC0797-92-1:Mr. Shabeer Ahmad</MenuItem>
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
                  <MenuItem value={"District & Sessions Judge"}>District & Sessions Judge</MenuItem>
                  <MenuItem value={"Addl: District & Sessions Judge"}>Addl: District & Sessions Judge</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Judicial) \ Judicial Magistrate"}>Senior Civil Judge (Judicial) \ Judicial Magistrate</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Admin) \ Judicial Magistrate"}>Senior Civil Judge (Admin) \ Judicial Magistrate</MenuItem>
                  <MenuItem value={"Civil Judge/Judicial Magistrate"}>Civil Judge/Judicial Magistrate</MenuItem>
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
                  <MenuItem value={"District & Sessions Judge (Both Civil and Criminal Matter)"}>District & Sessions Judge (Both Civil and Criminal Matter)</MenuItem>
                  <MenuItem value={"District Judge (Exclusive Civil Matter)"}>District Judge (Exclusive Civil Matter)</MenuItem>
                  <MenuItem value={"Sessions Judge (Exclusive Criminal Matter)"}>Sessions Judge (Exclusive Criminal Matter)</MenuItem>
                  <MenuItem value={"Addl: District & Sessions Judge (Both Civil and Criminal Matter)"}>Addl: District & Sessions Judge (Both Civil and Criminal Matter)</MenuItem>
                  <MenuItem value={"Addl: District & Sessions Judge (Exclusive Criminal Matter)"}>"Addl: District & Sessions Judge (Exclusive Criminal Matter)</MenuItem>
                  <MenuItem value={"Addl: District & Sessions Judge (Exclusive Civil Matter)"}>Addl: District & Sessions Judge (Exclusive Civil Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Judicial) (Both Civil and Criminal Matter)"}>Senior Civil Judge (Judicial) (Both Civil and Criminal Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Admin) (Both Civil and Criminal Matter)"}>Senior Civil Judge (Admin) (Both Civil and Criminal Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Admin) (Exclusive Civil Matter)"}>Senior Civil Judge (Admin) (Exclusive Civil Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Judicial) (Exclusive Civil Matter)"}>Senior Civil Judge (Judicial) (Exclusive Civil Matter)</MenuItem>
                  <MenuItem value={"Civil Judge/Judicial Magistrate (Both Civil and Criminal Matter)"}>Civil Judge/Judicial Magistrate (Both Civil and Criminal Matter)</MenuItem>
                  <MenuItem value={"Civil Judge (Exclusive Civil Matter)"}>Civil Judge (Exclusive Civil Matter)</MenuItem>
                  <MenuItem value={"Judicial Magistrate (Exclusive Criminal Matter)"}>Judicial Magistrate (Exclusive Criminal Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Admin)\JM (Exclusive Criminal Matter)"}>Senior Civil Judge (Admin)\JM (Exclusive Criminal Matter)</MenuItem>
                  <MenuItem value={"Senior Civil Judge (Judicial)\JM (Exclusive Criminal Matter)"}>Senior Civil Judge (Judicial)\JM (Exclusive Criminal Matter)</MenuItem>
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
                // value={institutionDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
            {/* </Container> */}
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <Grid container alignItems="center"> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // disabled={sameAsInstitutionDate}
                disableToolbar
                variant="inline"
                id="date-picker-inline-order-date"
                label="Order Date"
                format="dd/MM/yyyy"
                autoOk
                value={null
                  // poData.orderDate ? poData.orderDate : institutionDate
                }
                onChange={(date) =>
                  setPoData({ ...poData, orderDate: date })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={sameAsInstitutionDate}
                  // onChange={(e) => {
                  //   setSameAsInstitutiondate(e.target.checked);
                  //   setPoData({ ...poData, orderDate: institutionDate });
                  // }}
                  name="sameAsInstitutionDate"
                  color="primary"
                />
              }
              label="Same as Institution Date"
            />
            {/* <FormHelperText error>Check Box if apply!</FormHelperText> */}
            {/* </Grid> */}
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Divider></Divider>
          </Grid>

          {/* <Grid item xs={12} sm={12}> */}
          <Grid item container xs={12} sm={12} alignItems="center" spacing={1}>
            {/* <FormControl fullWidth component="fieldset"> */}

            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRemandedRestored}
                    color="primary"
                    onChange={(e) => {
                      setPoData({
                        ...poData,
                        remandedRestored: e.target.checked,
                      });
                      setIsRemandedRestored(e.target.checked);
                    }}
                    name="remandedRestored"
                  />
                }
                label="Restored/Remanded"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTransferedIn}
                    color="primary"
                    onChange={(e) => {
                      setPoData({
                        ...poData,
                        transferedIn: e.target.checked,
                      });
                      setIsTransferedIn(e.target.checked);
                    }}
                    name="transferedIn"
                  />
                }
                label="Transfered In"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              {isTransferedIn && (
                <>
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
                      // disableToolbar
                      // variant="inline"
                      // margin="normal"
                      id="date-picker-inline"
                      // id="date-picker-dialog"
                      label="Date of Transfer In"
                      autoOk
                      format="dd/MM/yyyy"
                      value={
                        poData["Date of Transfer In"]
                          ? poData["Date of Transfer In"]
                          : null
                      }
                      onChange={(date) =>
                        setPoData({
                          ...poData,
                          "Date of Transfer In": date,
                        })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date of Transfer In",
                      }}
                    />
                    {/* </Grid> */}
                  </MuiPickersUtilsProvider>
                  {/* </Container> */}
                </>
              )}
            </Grid>
            <Grid container spacing={1} fullWidth>
              {isRemandedRestored && (
                <>
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
                        // disableToolbar
                        // variant="inline"
                        // margin="normal"
                        id="date-picker-inline"
                        // id="date-picker-dialog"
                        label="Date of other Institution"
                        autoOk
                        format="dd/MM/yyyy"
                        value={
                          poData["Date of Other Institution"]
                            ? poData["Date of Other Institution"]
                            : null
                        }
                        onChange={(date) =>
                          setPoData({
                            ...poData,
                            "Date of Other Institution": date,
                          })
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date of other Institution",
                        }}
                      />
                      {/* </Grid> */}
                    </MuiPickersUtilsProvider>
                    {/* </Container> */}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Institution Flag
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={
                          poData["Institution Flag"]
                            ? poData["Institution Flag"]
                            : setPoData({
                                ...poData,
                                "Institution Flag": "-",
                              })
                        }
                        onChange={(e) => {
                          setPoData({
                            ...poData,
                            "Institution Flag": e.target.value,
                          });
                        }}
                        label="Institution Flag"
                      >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value={"Restored"}>Restored</MenuItem>
                        <MenuItem value={"Remanded"}>Remanded</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTransferOut}
                    color="secondary"
                    onChange={(e) => {
                      setPoData({
                        ...poData,
                        transferedOut: e.target.checked,
                        disposed: false,
                      });
                      setIsTransferOut(e.target.checked);
                    }}
                    name="transferedOut"
                  />
                }
                label="Transfered Out"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              {isTransferOut && (
                <>
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
                      // disableToolbar
                      // variant="inline"
                      // margin="normal"
                      id="date-picker-inline"
                      // id="date-picker-dialog"
                      label="Date of Transfer Out"
                      autoOk
                      format="dd/MM/yyyy"
                      value={
                        poData["Date of Disposal Transfer Out"]
                          ? poData["Date of Disposal Transfer Out"]
                          : null
                      }
                      onChange={(date) =>
                        setPoData({
                          ...poData,
                          "Date of Disposal Transfer Out": date,
                          "Disposal Mode Flag": "Transfer Out",
                          "Disposal OR Transfer Out Flag": "Transfer Out",
                        })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date of Transfer Out",
                      }}
                    />
                    {/* </Grid> */}
                  </MuiPickersUtilsProvider>
                  {/* </Container> */}
                </>
              )}
            </Grid>

            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={isDisposed}
                    onChange={(e) => {
                      setPoData({
                        ...poData,
                        disposed: e.target.checked,
                        transferedOut: false,
                      });
                      setIsDisposed(e.target.checked);
                    }}
                    name="disposed"
                  />
                }
                label="Disposed"
              />
            </Grid>
            {/* </FormControl> */}

            {isDisposed && (
              <>
                <Grid container justify="flex-end" spacing={1}>
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
                        // disableToolbar
                        // variant="inline"
                        // margin="normal"
                        id="date-picker-inline"
                        // id="date-picker-dialog"
                        label="Disposed Date"
                        autoOk
                        format="dd/MM/yyyy"
                        value={
                          poData["Date of Disposal Transfer Out"]
                            ? poData["Date of Disposal Transfer Out"]
                            : null
                        }
                        onChange={(date) =>
                          setPoData({
                            ...poData,
                            "Date of Disposal Transfer Out": date,
                          })
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date of disposal",
                        }}
                      />
                      {/* </Grid> */}
                    </MuiPickersUtilsProvider>
                    {/* </Container> */}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Disposal Mode Flag
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={
                          poData["Disposal Mode Flag"]
                            ? poData["Disposal Mode Flag"]
                            : setPoData({
                                ...poData,
                                "Disposal Mode Flag": "-",
                              })
                        }
                        onChange={(e) => {
                          setPoData({
                            ...poData,
                            "Disposal Mode Flag": e.target.value,
                            "Disposal OR Transfer Out Flag": "Disposed",
                          });
                        }}
                        label="Disposal Mode Flag"
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={"Contested-Trial Based"}>
                          Contested-Trial Based
                        </MenuItem>
                        <MenuItem value={"Contested-Non Trial Based"}>
                          Contested-Non Trial Based
                        </MenuItem>
                        <MenuItem value={"Uncontested"}>Uncontested</MenuItem>
                        <MenuItem value={"In Default"}>In Default</MenuItem>
                        {poData["Case Type"] === "Criminal" && (
                          <MenuItem value={"Pleadguilty"}>Pleadguilty</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  {poData["Case Type"] === "Criminal" && (
                    <Grid item xs={12} sm={7}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                          In Case of Criminal Category Select Acquittal or
                          Conviction or Others
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={
                            poData["AcquittalORConviction"]
                              ? poData["AcquittalORConviction"]
                              : setPoData({
                                  ...poData,
                                  AcquittalORConviction: "-",
                                })
                          }
                          onChange={(e) => {
                            setPoData({
                              ...poData,
                              AcquittalORConviction: e.target.value,
                            });
                          }}
                          label="In Case of Criminal Category Select Acquittal or Conviction or Others"
                        >
                          <MenuItem value="Not Applicable">
                            Not Applicable
                          </MenuItem>
                          <MenuItem value="Conviction">Conviction</MenuItem>
                          <MenuItem value="Acquittal-On Merit">
                            Acquittal-On Merit
                          </MenuItem>
                          <MenuItem value="Acquittal-On Compromise">
                            Acquittal-On Compromise
                          </MenuItem>
                          <MenuItem value="Acquittal-On Other Modes">
                            Acquittal-On Other Modes
                          </MenuItem>
                          <MenuItem value="Acquittal-U/Sec 265K/249-A">
                            Acquittal-U/Sec 265K/249-A
                          </MenuItem>
                          <MenuItem value="512 Cr.PC Completed">
                            512 Cr.PC Completed
                          </MenuItem>
                          <MenuItem value="Proceedings Abated">
                            Proceedings Abated
                          </MenuItem>
                          <MenuItem value="Cases Stopped U/Sec 249 Cr.PC">
                            Cases Stopped U/Sec 249 Cr.PC
                          </MenuItem>
                          <MenuItem value="Adjourned Sine-Die">
                            Adjourned Sine-Die
                          </MenuItem>
                          <MenuItem value="Accepted">Accepted</MenuItem>
                          <MenuItem value="Dismissed">Dismissed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Grid>
          {/* </Grid> */}

          {/* <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button> */}
          <Box component="div" mt={4} style={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
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

              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={clear}
                  startIcon={<ClearAllIcon />}
                >
                  Clear All
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
