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
  // FormHelperText,
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
import { addDays } from "date-fns";
// import { useNavigate } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from "react-router-dom";
import { getControlCenter } from "../../actions/controlCenter";
import {
  getCasesStatistics,
  getDisposalCases,
  getGroupedCases,
  getInstitutionCases,
  getInstitutionsStatistics,
  getInstVsDispStats,
  getPendingCases,
} from "../../actions/cases";
import FormatCaseNumber from "../FormatCaseNumber";

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

const FormCases = ({ currentId, setCurrentId, onPageChange }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const caseFile = useSelector((state) =>
    currentId ? state.cases.find((c) => c._id === currentId) : null
  );
  const [selectedCaseType, setSelectedCaseType] = useState("Civil");
  // const [cNo, setCNo] = useState("");
  // const [tempCNo, setTempCNo] = useState("");
  const [institutionDate, setInstitutionDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(addDays(new Date(), 1));
  const [sameAsInstitutionDate, setSameAsInstitutiondate] = useState(false);
  const [isDisposed, setIsDisposed] = useState(false);
  const [isTransferOut, setIsTransferOut] = useState(false);
  const [isTransferedIn, setIsTransferedIn] = useState(false);
  const [isRemandedRestored, setIsRemandedRestored] = useState(false);
  const [isOtherNature, setIsOtherNature] = useState(false);
  const [isOtherPoliceStation, setIsOtherPoliceStation] = useState(false);
  const predefinedPoliceStations = [
    "تیمرگرہ",
    "تالاش",
    "خال",
    "بلامبٹ",
    "چکدرہ",
    "ثمرباغ",
    "لعل قلعہ",
  ];
  const [isPredefinedThana, setIsPredefinedThana] = useState(false);
  const [caseData, setCaseData] = useState({
    // "Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '',"Date of Institution ": Date,  "Date of Disposal": Date, isTransferedIn: false, transferedInDate: Date, "Date of Transfer In": Date,
    "Case Title": "",
    urduTitle: "",
    "Case No": "",
    "Case Type": "Civil",
    "Category Per PQS": "",
    "FIR NO": "",
    "FIR Date": null,
    Thana: "",
    Section: "",
    "Date of Institution ": institutionDate,
    "Date of Disposal Transfer Out": null,
    disposed: false,
    transferedOut: false,
    transferedIn: false,
    remandedRestored: false,
    AcquittalORConviction: "",
    "Disposal OR Transfer Out Flag": "",
    "Disposal Mode Flag": "", //used for contested, non-contested etc
    "Date of Transfer In": null,
    "Date of Other Institution": null,
    "Institution Flag": "", // used for Remander, Restored flags
    nextDate: nextDate,
    orderNumber: "",
    actionAbstract: "",
    orderDate: new Date(),
    nature: "",
    isOtherNature: false,
    isOtherPoliceStation: false,
  });
  // console.log(caseData);

  const handleDateChange = (date) => {
    // const userInputDate = format(new Date(date), 'yyyy-MM-dd'); // format the date to 'yyyy-MM-dd'
    // console.log(date);
    // setInstitutionDate(startOfDay(date));
    // setCaseData({ ...caseData, "Date of Institution ": date});

    setInstitutionDate(date);
    setCaseData({ ...caseData, "Date of Institution ": date });

    // console.log(caseData["Date of Institution "]);
  };

  // useEffect(() => {
  // setCaseData({ ...caseData, "Date of Institution ": institutionDate });
  // console.log(institutionDate);
  // }, [institutionDate]);

  // const classes2 = useStyles2();

  useEffect(() => {
    setSelectedCaseType("Civil");

    return () => {
      // Cleanup function runs when navigating away from the component (unmount)
      // console.log('Navigating away...');
      // Call your function here
      clear();
      dispatch(getControlCenter());
      dispatch(
        getInstitutionsStatistics({ reqQuery: "InstitutionsStatistics" })
      );
      dispatch(
        getPendingCases({ reqQuery: "PendingCases", datePendency: new Date() })
      );
      dispatch(
        getGroupedCases({ reqQuery: "GroupedCases", datePendency: new Date() })
      );
      dispatch(
        getInstitutionCases({
          reqQuery: "InstitutionCases",
          dateInstitution: new Date(),
        })
      );
      dispatch(
        getDisposalCases({
          reqQuery: "DisposalCases",
          dateDisposal: new Date(),
        })
      );
      dispatch(getCasesStatistics({ reqQuery: "CaseStatistics" }));
      dispatch(
        getInstVsDispStats({
          reqQuery: "InstVsDispStats",
          dateYear: new Date(),
        })
      );
    };
  }, []);

  useEffect(() => {
    // console.log(caseFile);
    // console.log('useEffect called');
    if (caseFile) {
      setSelectedCaseType(caseFile["Case Type"]);
      setInstitutionDate(caseFile["Date of Institution "]);
      setNextDate(caseFile.nextDate ? caseFile.nextDate : nextDate);
      // console.log(selectedCaseType);
      setCaseData(caseFile);
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
      caseFile.isOtherPoliceStation
        ? setIsOtherPoliceStation(true)
        : setIsOtherPoliceStation(false);
      if (caseFile["Case Type"] === "Criminal") {
        predefinedPoliceStations.includes(caseData?.Thana)
          ? setIsPredefinedThana(true)
          : setIsPredefinedThana(false);
      }
      // setCNo(FormatCaseNumber(caseFile));
      // console.log(caseFile["Case No"]);
      // setTempCNo(caseFile["Case No"]);
      setCaseData((prev) => ({
        ...prev,
        "Case No": FormatCaseNumber(caseFile), // Update state with formatted number
      }));
    }
  }, [caseFile]);

  useEffect(() => {
    onPageChange(() =>
      currentId
        ? `Editing Case "${caseFile["Case Title"]}"`
        : "Creating New Case"
    );
  }, [onPageChange, currentId, caseFile]);

  // Handle blur event
  const handleBlurCaseNumber = () => {
    // setTempCNo(e.target.value);
    setCaseData((prev) => ({
      ...prev,
      "Case No": FormatCaseNumber(caseData), // Update state with formatted number
    }));
  };

  // Handle input change
  const handleCaseNumberChange = (e) => {
    const { value } = e.target;
    setCaseData((prev) => ({
      ...prev,
      "Case No": value, // Update state with raw input
    }));
  };

  // function getCaseNo(str) {
  //   switch (str) {
  //     case "Civil-001-Civil Suits (Original Jurisdiction)":
  //       return "Suit - /1";
  //     case "Civil-006-Family Court Cases":
  //       return "FC - /III";
  //     case "Civil-018-Other Civil Misc Applications":
  //       return "MA - /6";
  //     case "Civil-015-Execution Petitions":
  //       return "Ex - /10";
  //     case "Civil-021-Objection Petitions":
  //       return "OP - /11";

  //     default:
  //       return "";
  //   }
  // }

  useEffect(() => {
    // setCNo(getCaseNo(caseData["Category Per PQS"]));
    // console.log(caseData);
    if (caseFile === null) {
      setCaseData((prev) => ({
        ...prev,
        "Case No": FormatCaseNumber(caseData), // Update state with formatted number
      }));
      // setCNo(FormatCaseNumber(caseData));
      // setTempCNo(FormatCaseNumber(caseData));
      // console.log('category format exec---');
    }
  }, [caseData["Category Per PQS"]]);

  // useEffect(()=>{
  // console.log(`tempCno exec & value:${tempCNo}`)
  // console.log(caseData);
  // const formattedCaseNumber = FormatCaseNumber(caseData);
  // console.log("formatted: "+formattedCaseNumber);

  // setCaseData((prev) => ({
  // ...prev,
  // "Case No": formattedCaseNumber, // Update state with formatted number
  // }));
  // setCaseData({ ...caseData, "Case No": tempCNo });
  // console.log('tempCno exec--')
  // },[tempCNo])

  // useEffect(() => {
  // setCaseData({ ...caseData, "Case No": cNo });
  // console.log(`cNo exec & value:${cNo}`)
  // console.log(cNo);
  // if (!currentId) setCaseData({ ...caseData, "Case No": cNo });
  // if (currentId) setCaseData({ ...caseData, "Case No": cNo });
  // console.log(cNo);
  // console.log(caseData['Case No']);
  // setCaseData({ ...caseData, "Case No": cNo });
  // console.log(cNo);
  // }, [cNo]);

  // useEffect(() => {
  // setCNo(FormatCaseNumber(caseData));

  // console.log(`Case No exec & value:${caseData["Case No"]}`);
  // console.log(caseData["Case No"]);
  // }, [caseData["Case No"]]);

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(caseData);

    if (currentId) {
      dispatch(updateCase(currentId, caseData));
    } else {
      if (selectedCaseType === "Civil") {
        setCaseData({
          ...caseData,
          "FIR NO": "",
          Thana: "",
          Section: "",
        });
        dispatch(createCase(caseData));
      } else {
        dispatch(createCase(caseData));
      }
    }
    clear();
    history.push("/CasesListTable"); // Navigate to the CasesListTable route
  };
  const clear = () => {
    setCurrentId(null);
    setSelectedCaseType("Civil");
    // setCaseData({"Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '', "Date of Institution ": selectedDate ,  "Date of Disposal": '', isTransferedIn: false, "Date of Transfered In": Date});
    setInstitutionDate(new Date());
    setIsDisposed(false);
    setIsTransferOut(false);
    setIsRemandedRestored(false);
    setIsTransferedIn(false);
    setIsOtherNature(false);
    setIsOtherPoliceStation(false);
    setCaseData({
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
      nextDate: nextDate,
      orderNumber: "",
      actionAbstract: "",
      orderDate: new Date(),
      nature: "",
      isOtherNature: false,
      isOtherPoliceStation: false,
    });
    setSameAsInstitutiondate(false);
    // setCNo("");
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
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth component="fieldset">
              <FormLabel component="legend">
                {/* <br /> */}
                Case Type
              </FormLabel>
              <RadioGroup
                required
                row
                aria-label="Case Type"
                name="caseType"
                value={caseData["Case Type"]}
                onChange={(e) => {
                  setSelectedCaseType(e.target.value);
                  setCaseData({
                    ...caseData,
                    "Case Type": e.target.value,
                    "Category Per PQS": "",
                  });
                }}
              >
                <FormControlLabel
                  checked={selectedCaseType === "Civil"}
                  value="Civil"
                  control={<GreenRadio />}
                  label="Civil"
                />
                <FormControlLabel
                  checked={selectedCaseType === "Criminal"}
                  value="Criminal"
                  control={<Radio />}
                  label="Criminal"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            {selectedCaseType === "Civil" ? (
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Sub Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={caseData["Category Per PQS"]}
                  onChange={(e) =>
                    setCaseData({
                      ...caseData,
                      "Category Per PQS": e.target.value,
                    })
                  }
                  label="Select Sub Type"
                >
                  <MenuItem value="">
                    <em>Mostly Used</em>
                  </MenuItem>
                  <MenuItem
                    value={"Civil-001-Civil Suits (Original Jurisdiction)"}
                  >
                    Suit/1
                  </MenuItem>
                  <MenuItem value={"Civil-006-Family Court Cases"}>
                    FC/III
                  </MenuItem>
                  <MenuItem value={"Civil-018-Other Civil Misc Applications"}>
                    MA/6
                  </MenuItem>
                  <MenuItem value={"Civil-015-Execution Petitions"}>
                    Ex/10
                  </MenuItem>
                  <MenuItem value={"Civil-021-Objection Petitions"}>
                    Objection Petititons (OP/11)
                  </MenuItem>
                  <MenuItem value={"Civil-022-Civil Appeals"}>
                    Civil Appeal/13
                  </MenuItem>
                  <MenuItem value={"Civil-025-Family Appeals"}>
                    Family Appeal (FCA)
                  </MenuItem>
                  <MenuItem value={"Civil-027-Civil Appeals against Order"}>
                    MCA/14
                  </MenuItem>

                  <MenuItem value="">
                    <em>All Categories</em>
                  </MenuItem>
                  <MenuItem
                    value={"Civil-001-Civil Suits (Original Jurisdiction)"}
                  >
                    Civil-001 Civil Suits (Original Jurisdiction)
                  </MenuItem>
                  <MenuItem value={"Civil-002-Civil Suit"}>
                    Civil-002 Civil Suit
                  </MenuItem>
                  <MenuItem value={"Civil-003-Suits under Order 37 CPC"}>
                    Civil-003 Suits under Order 37 CPC
                  </MenuItem>
                  <MenuItem value={"Civil-004-Custody of Minors"}>
                    Civil-004 Custody of Minors
                  </MenuItem>
                  <MenuItem value={"Civil-005-Defamation"}>
                    Civil-005 Defamation
                  </MenuItem>
                  <MenuItem value={"Civil-006-Family Court Cases"}>
                    Civil-006 Family Court Cases
                  </MenuItem>
                  <MenuItem value={"Civil-007-Succession Cases"}>
                    Civil-007 Succession Cases
                  </MenuItem>
                  <MenuItem value={"Civil-008-Guardianship Cases"}>
                    Civil-008 Guardianship Cases
                  </MenuItem>
                  <MenuItem value={"Civil-009-Land Acquisition Cases"}>
                    Civil-009 Land Acquisition Cases
                  </MenuItem>
                  <MenuItem value={"Civil-010-Rent Cases"}>
                    Civil-010 Rent Cases
                  </MenuItem>
                  <MenuItem
                    value={
                      "Civil-011-Proceeding under KP Mental Health Act 2017"
                    }
                  >
                    Civil-011 Proceeding under KP Mental Health Act 2017
                  </MenuItem>
                  <MenuItem value={"Civil-012-Tribunal Cases"}>
                    Civil-012 Tribunal Cases
                  </MenuItem>
                  <MenuItem value={"Civil-013-Small Claims"}>
                    Civil-013 Small Claims
                  </MenuItem>
                  <MenuItem
                    value={
                      "Civil-014-Execution in which periodic payments are made"
                    }
                  >
                    Civil-014 Execution in which periodic payments are made
                  </MenuItem>
                  <MenuItem value={"Civil-015-Execution Petitions"}>
                    Civil-015 Execution Petitions
                  </MenuItem>
                  <MenuItem value={"Civil-016-Cases under other laws"}>
                    Civil-016 Cases under other laws
                  </MenuItem>
                  <MenuItem value={"Civil-017-Others"}>
                    Civil-017 Others
                  </MenuItem>
                  <MenuItem value={"Civil-018-Other Civil Misc Applications"}>
                    Civil-018-Other Civil Misc Applications
                  </MenuItem>
                  <MenuItem
                    value={"Civil-019-Application under section 12(2) CPC"}
                  >
                    Civil-019 Application under section 12(2) CPC
                  </MenuItem>
                  <MenuItem value={"Civil-020-Review Petition"}>
                    Civil-020 Review Petition
                  </MenuItem>
                  <MenuItem value={"Civil-021-Objection Petitions"}>
                    Civil-021 Objection Petitions
                  </MenuItem>
                  <MenuItem value={"Civil-022-Civil Appeals"}>
                    Civil-022 Civil Appeals
                  </MenuItem>
                  <MenuItem value={"Civil-023-Civil Revisions"}>
                    Civil-023 Civil Revisions
                  </MenuItem>
                  <MenuItem
                    value={"Civil-024-Guardianship and Succession Appeals"}
                  >
                    Civil-024 Guardianship and Succession Appeals
                  </MenuItem>
                  <MenuItem value={"Civil-025-Family Appeals"}>
                    Civil-025 Family Appeals
                  </MenuItem>
                  <MenuItem value={"Civil-026-Rent Appeals"}>
                    Civil-026 Rent Appeals
                  </MenuItem>
                  <MenuItem value={"Civil-027-Civil Appeals against Orders"}>
                    Civil-027 Civil Appeals against Orders
                  </MenuItem>
                  <MenuItem value={"Civil-028-Insolvency Cases"}>
                    Civil-028 Insolvency Cases
                  </MenuItem>
                  <MenuItem
                    value={"Civil-029-Execution Petition Against Government"}
                  >
                    Civil-029 Execution Petition Against Government
                  </MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Sub Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={caseData["Category Per PQS"]}
                  onChange={(e) =>
                    setCaseData({
                      ...caseData,
                      "Category Per PQS": e.target.value,
                    })
                  }
                  label="Select Sub Type"
                >
                  <MenuItem value="">
                    <em>Mostly Used</em>
                  </MenuItem>
                  <MenuItem value={"CR-001-Homicide"}>
                    Homicide Session Case
                  </MenuItem>
                  <MenuItem value={"CR-011-Narcotics Substances"}>
                    CNSA Case
                  </MenuItem>
                  <MenuItem value={"CR-020-Bail Applications"}>
                    BA, BBA, BCA, CrMisc /IV
                  </MenuItem>
                  <MenuItem value="">
                    <em>All Categories</em>
                  </MenuItem>
                  <MenuItem value={"CR-001-Homicide"}>CR-001 Homicide</MenuItem>
                  <MenuItem value={"CR-002-Attempt to Murder"}>
                    CR-002 Attempt to Murder
                  </MenuItem>
                  <MenuItem value={"CR-003-Cases triable u/s 30 Cr.PC"}>
                    CR-003 Cases triable u/s 30 Cr.PC
                  </MenuItem>
                  <MenuItem value={"CR-004-Hurt Cases"}>
                    CR-004 Hurt Cases
                  </MenuItem>
                  <MenuItem value={"CR-005-Abduction/Kidnapping"}>
                    CR-005 Abduction/Kidnapping
                  </MenuItem>
                  <MenuItem value={"CR-006-Arms & Amunation"}>
                    CR-006 Arms & Amunation
                  </MenuItem>
                  <MenuItem value={"CR-007-Hudood Laws"}>
                    CR-007 Hudood Laws
                  </MenuItem>
                  <MenuItem value={"CR-008-Financial Crimes"}>
                    CR-008 Financial Crimes
                  </MenuItem>
                  <MenuItem value={"CR-009-Foreigner Act"}>
                    CR-009 Foreigner Act
                  </MenuItem>
                  <MenuItem value={"CR-010-Complaint Cases"}>
                    CR-010 Complaint Cases
                  </MenuItem>
                  <MenuItem value={"CR-011-Norcotics Substances"}>
                    CR-011 Narcotics Substances
                  </MenuItem>
                  <MenuItem value={"CR-012-Habeas Corpus (491 Cr.PC.)"}>
                    CR-012 Habeas Corpus (491 Cr.PC.)
                  </MenuItem>
                  <MenuItem value={"CR-013-Offences against Children"}>
                    CR-013 Offences against Children
                  </MenuItem>
                  <MenuItem value={"CR-014-Offences Against Property"}>
                    CR-014 Offences Against Property
                  </MenuItem>
                  <MenuItem value={"CR-015-Sexual Offences"}>
                    CR-015 Sexual Offences
                  </MenuItem>
                  <MenuItem value={"CR-016-Minor Offences"}>
                    CR-016 Minor Offences
                  </MenuItem>
                  <MenuItem value={"CR-017-Proceedings u/s 514 Cr. P.C"}>
                    CR-017 Proceedings u/s 514 Cr. P.C
                  </MenuItem>
                  <MenuItem
                    value={
                      "CR-018-Proceedings Under Section 133 and 145 Cr. P.C"
                    }
                  >
                    CR-018 Proceedings Under Section 133 and 145 Cr. P.C
                  </MenuItem>
                  <MenuItem value={"CR-019-Security Proceedings u/s 107/51"}>
                    CR-019 Security Proceedings u/s 107/51
                  </MenuItem>
                  <MenuItem value={"CR-020-Bail Applications"}>
                    CR-020 Bail Applications
                  </MenuItem>
                  <MenuItem value={"CR-021-Other Criminal Misc. Applications"}>
                    CR-021 Other Criminal Misc. Applications
                  </MenuItem>
                  <MenuItem
                    value={
                      "CR-022-Case under Forest Laws, Motor Vehicle Laws, Food Law"
                    }
                  >
                    CR-022 Case under Forest Laws, Motor Vehicle Laws, Food Law
                  </MenuItem>
                  <MenuItem value={"CR-023-Other Local and Special Laws"}>
                    CR-023 Other Local and Special Laws
                  </MenuItem>
                  <MenuItem value={"CR-024-Cases under other laws"}>
                    CR-024 Cases under other laws
                  </MenuItem>
                  <MenuItem value={"CR-025-Criminal Appeals"}>
                    CR-025 Criminal Appeals
                  </MenuItem>
                  <MenuItem value={"CR-026-Criminal Revisions"}>
                    CR-026 Criminal Revisions
                  </MenuItem>
                  <MenuItem
                    value={
                      "CR-027-Other PPC related cases(Not Listed in above Categories)"
                    }
                  >
                    CR-027-Other PPC related cases(Not Listed in above
                    Categories)
                  </MenuItem>
                  <MenuItem value={"CR-028-Financial Crimes-489-F PPC"}>
                    CR-028-Financial Crimes-489-F PPC
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <TextField
              name="caseNumber"
              variant="outlined"
              label="Case Number"
              fullWidth
              value={caseData["Case No"] ? caseData["Case No"] : cNo}
              onChange={(e) =>
                setCaseData({ ...caseData, "Case No": e.target.value })
              }
            />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <TextField
              name="caseNumber"
              variant="outlined"
              label="Case Number"
              fullWidth
              // value={caseData["Case No"] ? caseData["Case No"] : cNo}
              // onChange={(e) =>
              //   setCaseData({ ...caseData, "Case No": e.target.value })
              // }
              // value={cNo !== "" ? cNo : caseData["Case No"]}
              value={caseData["Case No"]}
              // onBlur={(e) => {
              //   setTempCNo(e.target.value)
              // }}
              onBlur={handleBlurCaseNumber}
              onChange={handleCaseNumberChange}
              // onChange={(e) => {
              //   setCaseData({ ...caseData, "Case No": e.target.value })
              //   // setTempCNo(e.target.value)
              //   // setCaseData({ ...caseData, "Case No": cNo });
              // }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            {isOtherNature ? (
              <TextField
                name="other nature"
                variant="outlined"
                label="Other Nature"
                fullWidth
                value={caseData.nature}
                onChange={(e) =>
                  setCaseData({ ...caseData, nature: e.target.value })
                }
              />
            ) : (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Case Nature (نوعیت)
                </InputLabel>
                <Select
                  className={classes.uFont}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={caseData.nature}
                  onChange={(e) => {
                    setCaseData({
                      ...caseData,
                      nature: e.target.value,
                    });
                  }}
                  label="Case Nature (نوعیت)"
                >
                  <MenuItem value="">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isOtherNature}
                          color="primary"
                          onChange={(e) => {
                            setCaseData({
                              ...caseData,
                              isOtherNature: e.target.checked,
                            });
                            setIsOtherNature(e.target.checked);
                          }}
                          name="isOtherNature"
                        />
                      }
                      label="Other Nature"
                    />
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="استقرارحق">
                    استقرارحق
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="دِلاپانے">
                    دِلاپانے
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حق شفع">
                    حق شفع
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حتمی ڈگری">
                    حتمی ڈگری
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="دعویٰ ہرجانہ">
                    دعویٰ ہرجانہ
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حکم امتناعی">
                    حکم امتناعی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حکم تاکیدی">
                    حکم تاکیدی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="12(2)">
                    12(2)
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="دخلیابی">
                    دخلیابی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="تعمیل مختص">
                    تعمیل مختص
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="فہمیدگی">
                    فہمیدگی
                  </MenuItem>
                  <Divider />
                  <MenuItem className={classes.uFont} value="تنسیخ نکاح">
                    تنسیخ نکاح
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="نان نفقہ">
                    نان نفقہ
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حق مہر">
                    حق مہر
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="کذب النکاح">
                    کذب النکاح
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="زن اشوئی">
                    زن اشوئی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="فیملی کیس">
                    فیملی کیس
                  </MenuItem>
                  <Divider />
                  <MenuItem className={classes.uFont} value="درخواست">
                    درخواست
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="منسوخی یکطرفہ">
                    منسوخی یکطرفہ
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حضانت">
                    حضانت
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="سرسبزگی">
                    سرسبزگی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="حکم عدولی">
                    حکم عدولی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="درخواست بحالی">
                    درخواست بحالی
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="پرت">
                    پرت
                  </MenuItem>
                  <Divider />
                  <MenuItem className={classes.uFont} value="اِجراء">
                    اِجراء
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="عزرداری">
                    عزرداری
                  </MenuItem>
                  <Divider />
                  <MenuItem className={classes.uFont} value="ضمانت">
                    ضمانت
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="سپرداری">
                    سپرداری
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="کاروائی 514">
                    کاروائی 514
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="کاروائی 512">
                    کاروائی 512
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="فوجداری">
                    فوجداری
                  </MenuItem>
                  <MenuItem className={classes.uFont} value="استغاثہ">
                    استغاثہ
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={isOtherNature}
                    color="primary"
                    onChange={(e) =>
                      {setCaseData({
                        ...caseData,
                        isOtherNature: e.target.checked,
                      }); setIsOtherNature(e.target.checked)}
                    }
                    name="isOtherNature"
                  />
                }
                label="Other Nature"
              />   */}
          </Grid>
          <Grid item xs={12} sm={2}>
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
                label="Original Institution Date"
                autoOk
                format="dd/MM/yyyy"
                value={institutionDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
            {/* </Container> */}
          </Grid>

          {/* <Container fullwidth>
                    <TextField name='institutionDate' variant='outlined' label='Institution Date' fullWidth value={caseData.institutionDate} onChange={(e) => setCaseData({ ...caseData, institutionDate: e.target.value })} /> */}
          <Grid item xs={12} sm={5}>
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
              name="urduTitle"
              variant="outlined"
              label="Urdu Title"
              fullWidth
              value={caseData.urduTitle ? caseData.urduTitle : ""}
              onChange={(e) =>
                setCaseData({ ...caseData, urduTitle: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={caseData["Case Title"]}
              onChange={(e) =>
                setCaseData({ ...caseData, "Case Title": e.target.value })
              }
            />
          </Grid>

          {selectedCaseType === "Criminal" && (
            <>
              <Grid item xs={12} sm={3}>
                {/* <TextField name='FIRdate' variant='outlined' label='FIR Date' fullWidth value={caseData["FIR Date"]} onChange={(e) => setCaseData({ ...caseData, "FIR Date": e.target.value })} /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                  <KeyboardDatePicker
                    // margin="normal"
                    id="date-picker-dialog"
                    label="FIR Date"
                    format="dd/MM/yyyy"
                    autoOk
                    value={
                      caseData["FIR Date"]
                        ? caseData["FIR Date"]
                        : institutionDate
                    }
                    onChange={(date) =>
                      setCaseData({ ...caseData, "FIR Date": date })
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="FIR"
                  variant="outlined"
                  label="FIR Number"
                  fullWidth
                  value={caseData["FIR NO"]}
                  onChange={(e) =>
                    setCaseData({ ...caseData, "FIR NO": e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="underSection"
                  variant="outlined"
                  label="Under Section/s"
                  fullWidth
                  value={caseData.Section}
                  onChange={(e) =>
                    setCaseData({ ...caseData, Section: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {/* <TextField
                  name="policeStation"
                  variant="outlined"
                  label="Police Station Name"
                  fullWidth
                  value={caseData.Thana}
                  onChange={(e) =>
                    setCaseData({ ...caseData, Thana: e.target.value })
                  }
                /> */}
                {isOtherPoliceStation ? (
                  <TextField
                    className={classes.uFont}
                    name="Other Police Station"
                    variant="outlined"
                    label="Other Police Station"
                    fullWidth
                    value={caseData?.Thana}
                    onChange={(e) =>
                      setCaseData({ ...caseData, Thana: e.target.value })
                    }
                  />
                ) : (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Police Station Name
                    </InputLabel>
                    <Select
                      className={classes.uFont}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={caseData.Thana}
                      onChange={(e) => {
                        setCaseData({
                          ...caseData,
                          Thana: e.target.value,
                        });
                      }}
                      label="Police Station Name"
                    >
                      <MenuItem value="">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isOtherPoliceStation}
                              color="primary"
                              onChange={(e) => {
                                setCaseData({
                                  ...caseData,
                                  isOtherPoliceStation: e.target.checked,
                                });
                                setIsOtherPoliceStation(e.target.checked);
                              }}
                              name="isOtherPoliceStation"
                            />
                          }
                          label="Other Police Station"
                        />
                      </MenuItem>
                      <MenuItem value=""></MenuItem>
                      {predefinedPoliceStations.map((station) => (
                        <MenuItem
                          key={station}
                          className={classes.uFont}
                          value={station}
                        >
                          {station}
                        </MenuItem>
                      ))}
                      {!isPredefinedThana && (
                        <MenuItem
                          className={classes.uFont}
                          value={caseData.Thana}
                        >
                          {caseData.Thana}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                id="date-picker-inline"
                label="Next Date"
                format="dd/MM/yyyy"
                autoOk
                value={
                  caseData.nextDate
                    ? caseData.nextDate
                    : setCaseData({ ...caseData, nextDate: nextDate })
                }
                onChange={(date) =>
                  setCaseData({ ...caseData, nextDate: date })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <Grid container alignItems="center"> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                disabled={sameAsInstitutionDate}
                disableToolbar
                variant="inline"
                id="date-picker-inline-order-date"
                label="Order Date"
                format="dd/MM/yyyy"
                autoOk
                value={
                  caseData.orderDate ? caseData.orderDate : institutionDate
                }
                onChange={(date) =>
                  setCaseData({ ...caseData, orderDate: date })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsInstitutionDate}
                  onChange={(e) => {
                    setSameAsInstitutiondate(e.target.checked);
                    setCaseData({ ...caseData, orderDate: institutionDate });
                  }}
                  name="sameAsInstitutionDate"
                  color="primary"
                />
              }
              label="Same as Institution Date"
            />
            {/* <FormHelperText error>Check Box if apply!</FormHelperText> */}
            {/* </Grid> */}
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              name="Order Number"
              variant="outlined"
              label="Order Number"
              fullWidth
              value={caseData.orderNumber}
              onChange={(e) =>
                setCaseData({ ...caseData, orderNumber: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="demo-simple-select-outlined-label"
                className={classes.uFont}
              >
                خلاصہ کاروائی
              </InputLabel>
              <Select
                className={classes.uFont}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={
                  caseData.actionAbstract
                    ? caseData.actionAbstract
                    : setCaseData({ ...caseData, actionAbstract: "حاضری" })
                }
                onChange={(e) => {
                  setCaseData({ ...caseData, actionAbstract: e.target.value });
                  // setActionAbstract({
                  //   orderDate: new Date(),
                  //   actionAbstract: e.target.value,
                  // });
                }}
                label="خلاصہ کاروائی"
              >
                <MenuItem value="" style={{ backgroundColor: "lightgray" }}>
                  <em>Mostly Used</em>
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حاضری"}>
                  حاضری
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث"}>
                  بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت"}>
                  شہادت
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حکم"}>
                  حکم
                </MenuItem>
                <MenuItem value="" style={{ backgroundColor: "lightgrey" }}>
                  <em>All Categories</em>
                </MenuItem>
                <Divider />

                <MenuItem
                  className={[classes.boldThis, classes.uFont]}
                  style={{ backgroundColor: "lightblue" }}
                  value={"حاضری، ریکارڈ"}
                >
                  حاضری، ریکارڈ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"مختارنامہ، حاضری"}>
                  مختارنامہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"تقرری وکیل، حاضری"}>
                  تقرری وکیل، حاضری
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"حاضری، وکالت نامہ، حاضری"}
                >
                  وکالت نامہ، حاضری
                </MenuItem>
                <MenuItem className={classes.uFont} value={"وکالت نامہ، حاضری"}>
                  وکالت نامہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حاضری، اشتہار"}>
                  حاضری، اشتہار
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"حاضری، جواب دعویٰ، حاضری"}
                >
                  حاضری، جواب دعویٰ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"جواب دعویٰ، حاضری"}>
                  جواب دعویٰ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"جواب درخواست، حاضری"}
                >
                  جواب درخواست
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"پروفارمہ جات، حاضری"}
                >
                  پروفارمہ جات
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"پروفارمہ ای، حاضری"}
                >
                  پرفارمہ ای
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"پروفارمہ سی، حاضری"}
                >
                  پرفارمہ سی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"فرد جرم، حاضری"}>
                  فرد جرم
                </MenuItem>
                <MenuItem className={classes.uFont} value={"فرد تعلیقہ، حاضری"}>
                  فرد تعلیقہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"راضی نامہ، حاضری"}>
                  راضی نامہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بیلف رپورٹ، حاضری"}>
                  بیلف رپورٹ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"حاضری، بیلف رپورٹ، حاضری"}
                >
                  حاضری، بیلف رپورٹ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"نیلامی، حاضری"}>
                  نیلامی
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"نوٹس نیلامی، حاضری"}
                >
                  نوٹس نیلامی
                </MenuItem>
                <MenuItem className={classes.uFont} value={" نوٹس قرقی، حاضری"}>
                  نوٹس قرقی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"وارنٹ قرقی، حاضری"}>
                  وارنٹ قرقی
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"اِنکوائیری رپورٹ، حاضری"}
                >
                  اِنکوائیری رپورٹ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"نادرا رپورٹ، حاضری"}
                >
                  نادرا رپورٹ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"آدائیگی، حاضری"}>
                  آدائیگی
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"بقایا آدائیگی، حاضری"}
                >
                  بقایا آدائیگی
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"مزید کاروائی، حاضری"}
                >
                  مزید کاروائی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"انتظار AD، حاضری"}>
                  انتظار AD
                </MenuItem>
                <MenuItem className={classes.uFont} value={"انتظار مسل، حاضری"}>
                  انتظار مسل
                </MenuItem>
                <MenuItem className={classes.uFont} value={"کمنٹس، حاضری"}>
                  کمنٹس
                </MenuItem>
                <MenuItem className={classes.uFont} value={"رپورٹ SHO، حاضری"}>
                  رپورٹ SHO
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بیان DFC, حاضری"}>
                  بیان DFC
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"طلبی انکوائری، حاضری"}
                >
                  طلبی انکوائری، حاضری
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"ترمیمی عرضیدعویٰ، حاضری"}
                >
                  ترمیمی عرضیدعویٰ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"ترمیمی جواب دعویٰ، حاضری"}
                >
                  ترمیمی جواب دعویٰ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"ترمیمی جواب درخواست، حاضری"}
                >
                  ترمیمی جواب درخواست
                </MenuItem>

                <MenuItem
                  className={classes.uFont}
                  value={"تقرری اہل کمیشن، حاصری"}
                >
                  تقرری اہل کمیشن، حاصری
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"حاضری، رپورٹ اہل کمیشن"}
                >
                  حاضری، رپورٹ اہل کمیشن
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"رپورٹ اہل کمیشن، حاضری"}
                >
                  رپورٹ اہل کمیشن
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حاضری، عزرات"}>
                  حاضری، عزرات
                </MenuItem>
                <MenuItem className={classes.uFont} value={"عزرات، حاضری"}>
                  عزرات
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"شیڈولنگ کانفرنس، حاضری"}
                >
                  شیڈولنگ کانفرنس
                </MenuItem>
                <MenuItem className={classes.uFont} value="جواب الجواب، حاضری">
                  جواب الجواب
                </MenuItem>
                <MenuItem className={classes.uFont} value="شوکازنوٹس، حاضری">
                  شوکازنوٹس
                </MenuItem>
                <MenuItem className={classes.uFont} value="جواب نوٹس، حاضری">
                  جواب نوٹس
                </MenuItem>
                <MenuItem className={classes.uFont} value={"ہمراہ، حاضری"}>
                  ہمراہ، حاضری
                </MenuItem>
                <Divider />

                <MenuItem
                  className={[classes.boldThis, classes.uFont]}
                  style={{ backgroundColor: "lightgreen" }}
                  value={"شہادت مدعی"}
                >
                  شہادت مدعی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"تنقیحات، شہادت"}>
                  تنقیحات
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"مجوزہ تنقیحات، شہادت"}
                >
                  مجوزہ تنقیحات
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مدعیہ"}>
                  شہادت مدعیہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مدعا علیہ"}>
                  شہادت مدعا علیہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مدعا علیہا"}>
                  شہادت مدعا علیہا
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مدعیان"}>
                  شہادت مدعیان
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مدعاعلیہم"}>
                  شہادت مدعا علیہم
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت سائیل"}>
                  شہادت سائیل
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت مسئول الیہ"}>
                  شہادت مسئول الیہ
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"طلبیدہ گواہان، شہادت"}
                >
                  طلبیدہ گواہان، شہادت
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"جرح بر گواہان، شہادت"}
                >
                  جرح بر گواہان، شہادت
                </MenuItem>
                <MenuItem className={classes.uFont} value={"شہادت استغاثہ"}>
                  شہادت استغاثہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"یکطرفہ شہادت"}>
                  یکطرفہ شہادت
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"جرح بر گواہ، شہادت"}
                >
                  جرح بر گواہ، شہادت
                </MenuItem>
                <MenuItem className={classes.uFont} value={"ہمراہ، شہادت"}>
                  ہمراہ، شہادت
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"بیان اہل کمیشن، شہادت"}
                >
                  بیان اہل کمیشن
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"تحریری بیانات، شہادت"}
                >
                  تحریری بیانات
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بیان ملزم، شہادت"}>
                  بیان ملزم
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"بیان ملزمان، شہادت"}
                >
                  بیان ملزمان
                </MenuItem>
                <MenuItem className={classes.uFont} value={"راضی نامہ، شہادت"}>
                  راضی نامہ
                </MenuItem>
                <Divider />

                <MenuItem
                  className={[classes.boldThis, classes.uFont]}
                  style={{
                    backgroundColor: "lightsalmon",
                  }}
                  value={"ابتدائی بحث"}
                >
                  ابتدائی بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"جواب و بحث"}>
                  جواب و بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر پزیرائی"}>
                  بحث بر پزیرائی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر درخواست"}>
                  بحث بر درخواست
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر نکتہ"}>
                  بحث بر نکتہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"یکطرفہ بحث"}>
                  یکطرفہ بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر مقدمہ"}>
                  بحث بر مقدمہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بقایا بحث"}>
                  بقایا بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث، ریکارڈ"}>
                  بحث، ریکارڈ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر اپیل"}>
                  بحث بر اپیل
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر نگرانی"}>
                  بحث بر نگرانی
                </MenuItem>
                <MenuItem
                  className={classes.uFont}
                  value={"مصالحت ابتدائی، بحث"}
                >
                  مصالحت ابتدائی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"مصالحت ثانی، بحث"}>
                  مصالحت ثانی
                </MenuItem>
                <MenuItem className={classes.uFont} value={"ہمراہ، بحث"}>
                  ہمراہ، بحث
                </MenuItem>
                <MenuItem className={classes.uFont} value={"بحث بر رپورٹ"}>
                  بحث بر رپورٹ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"راضی نامہ، بحث"}>
                  راضی نامہ
                </MenuItem>
                <Divider />

                <MenuItem
                  className={[classes.boldThis, classes.uFont]}
                  style={{ backgroundColor: "lightcoral" }}
                  value={"حکم بر درخواست"}
                >
                  حکم بر درخواست
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حکم بر کمیشن"}>
                  حکم بر کمیشن
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حکم یکطرفہ"}>
                  حکم یکطرفہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"حکم بر مقدمہ"}>
                  حکم بر مقدمہ
                </MenuItem>
                <MenuItem className={classes.uFont} value={"راضی نامہ، حکم"}>
                  راضی نامہ، حکم
                </MenuItem>
                <MenuItem className={classes.uFont} value={"ہمراہ، حکم"}>
                  ہمراہ، حکم
                </MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              name="Action Abstract"
              variant="outlined"
              label="Action Abstract"
              fullWidth
              value={caseData.actionAbstract}
              onChange={(e) =>
                setCaseData({ ...caseData, actionAbstract: e.target.value })
              }
            /> */}
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
                      setCaseData({
                        ...caseData,
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
                      setCaseData({
                        ...caseData,
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
                        caseData["Date of Transfer In"]
                          ? caseData["Date of Transfer In"]
                          : null
                      }
                      onChange={(date) =>
                        setCaseData({
                          ...caseData,
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
            <Grid container spacing={1}>
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
                          caseData["Date of Other Institution"]
                            ? caseData["Date of Other Institution"]
                            : null
                        }
                        onChange={(date) =>
                          setCaseData({
                            ...caseData,
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
                          caseData["Institution Flag"]
                            ? caseData["Institution Flag"]
                            : setCaseData({
                                ...caseData,
                                "Institution Flag": "-",
                              })
                        }
                        onChange={(e) => {
                          setCaseData({
                            ...caseData,
                            "Institution Flag": e.target.value,
                          });
                        }}
                        label="Institution Flag"
                      >
                        <MenuItem value="">None</MenuItem>
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
                      setCaseData({
                        ...caseData,
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
                        caseData["Date of Disposal Transfer Out"]
                          ? caseData["Date of Disposal Transfer Out"]
                          : null
                      }
                      onChange={(date) =>
                        setCaseData({
                          ...caseData,
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
                      setCaseData({
                        ...caseData,
                        disposed: e.target.checked,
                        "Disposal OR Transfer Out Flag": e.target.checked
                          ? "Disposed"
                          : "",
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
                          caseData["Date of Disposal Transfer Out"]
                            ? caseData["Date of Disposal Transfer Out"]
                            : null
                        }
                        onChange={(date) =>
                          setCaseData({
                            ...caseData,
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
                          caseData["Disposal Mode Flag"]
                            ? caseData["Disposal Mode Flag"]
                            : setCaseData({
                                ...caseData,
                                "Disposal Mode Flag": "-",
                              })
                        }
                        onChange={(e) => {
                          setCaseData({
                            ...caseData,
                            "Disposal Mode Flag": e.target.value,
                            "Disposal OR Transfer Out Flag": "Disposed",
                          });
                        }}
                        label="Disposal Mode Flag"
                      >
                        <MenuItem value={"Contested-Trial Based"}>
                          Contested-Trial Based
                        </MenuItem>
                        <MenuItem value={"Contested-Non Trial Based"}>
                          Contested-Non Trial Based
                        </MenuItem>
                        <MenuItem value={"Uncontested"}>Uncontested</MenuItem>
                        <MenuItem value={"In Default"}>In Default</MenuItem>
                        <MenuItem value="Transfer Out">Transfer Out</MenuItem>
                        <MenuItem value="">Empty</MenuItem>
                        {caseData["Case Type"] === "Criminal" && (
                          <MenuItem value={"Pleadguilty"}>Pleadguilty</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  {caseData["Case Type"] === "Criminal" && (
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
                            caseData["AcquittalORConviction"]
                              ? caseData["AcquittalORConviction"]
                              : setCaseData({
                                  ...caseData,
                                  AcquittalORConviction: "-",
                                })
                          }
                          onChange={(e) => {
                            setCaseData({
                              ...caseData,
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

export default FormCases;

// import React from 'react';
// import Grid from '@material-ui/core/Grid';

// export default function FormCases() {
//     // The first commit of Material-UI

//     return (

//     );
// }
