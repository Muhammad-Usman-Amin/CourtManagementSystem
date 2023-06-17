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
  Box,
  Grid,
  IconButton,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
// import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import useStyles2 from "../../dashboardExample/dashboard";
import Container from "@material-ui/core/Container";
// import { createCase, updateCase } from '../../actions/cases';
import {
  createEmployeeData,
  updateEmployeeData,
} from "../../actions/employeeData";

import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SaveIcon from "@material-ui/icons/Save";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const FormEmployeeData = ({ currentId, setCurrentId, onPageChange }) => {
  const employeeFile = useSelector((state) =>
    currentId ? state.employeeData.find((c) => c._id === currentId) : null
  );

  const initialValues = employeeFile
    ? employeeFile
    : {
        name: "",
        designation: "",
        dutyAs: "",
        attachedToCourt: "",
        fatherName: "",
        dateOfBirth: null,
        gender: "male",
        currentAddress: "",
        permanentAddress: "",
        sameAsCurrentAddress: false,
        email: "",
        mobileNumber: "",
        maritalStatus: "single",
        initialAppointmentAs: "",
        dateOfInitialAppointment: null,
        appointedOnAnySonQuota: false,
        fatherDesignation: "",
        fatherDateOfRetirement: null,
        nearestStationToHome: "",
        nearestStationToHomeC1: "",
        nearestStationToHomeC2: "",
        nearestStationToHomeC3: "",
        nearestStationToHomeC4: "",
        IsSufferingFromDisease: null,
        highestQualification: "",
        professionalQualification: "",
        computerLiteracy: false,
        computerLiteracyLevel: "",
        extraSkill: "",
        children: [],
        promotions: [],
        transferHistory: [],
      };
  // console.log(currentId);
  const classes = useStyles();
  // const classes2 = useStyles2();
  const dispatch = useDispatch();

  useEffect(() => {
    onPageChange(() =>
      currentId ? `Edit Employee "${employeeFile.name}"` : "Add New Employee"
    );
  }, [onPageChange]);
  // const formikContext = useContext(FormikContext);
  // useEffect(() => {
  //     if (employeeFile) {
  //         // formikContext.setValues(employeeFile);
  //         // initialValues = employeeFile;
  //         setInitialValues(employeeFile);
  //         console.log(currentId);
  //         console.log(employeeFile);
  //         console.log(initialValues);
  //     }
  // }, [][employeeFile]);

  // const { values, handleReset } = useFormikContext();

  // useEffect(() => {
  //     // setSelectedCaseType('Civil');
  // }, []);

  // useEffect(() => {
  //     // console.log(caseFile);
  //     // console.log('useEffect called');
  //     if (caseFile) {
  //         // setSelectedCaseType(caseFile["Case Type"]);
  //         // setSelectedDate(caseFile["Date of Institution "]);
  //         // setNextDate(caseFile.nextDate);
  //         // console.log(selectedCaseType);
  //         // setEmployeeData(caseFile);
  //     }
  // }, [caseFile]);

  // const handleSubmit = async (e) => {

  //     e.preventDefault();

  //     if (currentId) {
  //         // dispatch(updateCase(currentId, employeeData));
  //     } else {
  //         // dispatch(createCase(employeeData));
  //     }
  //     clear();
  // };
  // const clear = () => {
  //     setCurrentId(null);
  //     formik.resetForm();
  // }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Name is Required"),

    attachedToCourt: Yup.string().required("Court is Required"),
    dutyAs: Yup.string().required("Duty As is Required"),

    fatherName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Father Name is Required"),

    initialAppointmentAs: Yup.string().required(
      "Initial Appointment As is Required"
    ),

    mobileNumber: Yup.number().required("Mobile Number is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),

    currentAddress: Yup.string()
      .min(5, "Too few words friend")
      .max(50, "Too much, Must be less than 50 characters")
      .required("Address is Required"),
  });
  // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // const formik = useFormikContext();
  // const handleDiaChange = (date) => {
  //     formik.setFieldValue('dateOfInitialAppointment', date);
  // };

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          if (currentId) {
            dispatch(updateEmployeeData(currentId, values));
          } else {
            dispatch(createEmployeeData(values));
          }
          setSubmitting(false);

          // setTimeout(() => {

          //     alert(JSON.stringify(values, null, 2));

          //     setSubmitting(false);

          // }, 400);
          resetForm();
          setCurrentId(null);
        }}
      >
        {({ dirty, values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className={`${classes.root} ${classes.form}`}>
            {isSubmitting && <div>Loading...</div>}
            {/* {console.log(employeeFile)} */}
            <Grid container justify="center">
              <Typography gutterBottom variant="h5">
                {currentId ? "Edit" : "Add New"} Employee
              </Typography>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={7}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  name="name"
                  variant="outlined"
                  label="Name of Employee"
                  fullWidth
                />
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="name"
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={values.fatherName}
                  name="fatherName"
                  variant="outlined"
                  label="Father Name"
                  fullWidth
                />
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="fatherName"
                />
              </Grid>
            </Grid>

            <Grid justify="space-between" container spacing={1}>
              <Grid item xs={12} sm={3}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={values.mobileNumber}
                  name="mobileNumber"
                  variant="outlined"
                  label="Mobile Number"
                  fullWidth
                  placeholder="0346 1234567"
                />
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="mobileNumber"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  name="email"
                  variant="outlined"
                  label="Email"
                  fullWidth
                  placeholder="employee@email.com"
                />
                <FormHelperText component="span" error>
                  <ErrorMessage
                    render={(msg) => <div className={classes.error}>{msg}</div>}
                    name="email"
                  />
                </FormHelperText>
              </Grid>

              <Grid item xs={6} sm={2}>
                <Grid
                  container
                  // direction="row"
                  justify="flex-start" //x-axis alignment
                  // justifyContent="center"      //this wont work in muiv4.9 or lower instead use justify
                  // alignItems="flex-end"        //y-axis alignment
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      name="gender"
                      onChange={handleChange}
                      row
                      defaultValue="male"
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Grid
                  container
                  // direction="row"
                  // justifyContent="center"      //this wont work in muiv4.9 or lower instead use justify
                  justify="flex-end"
                  // alignItems="flex-end"
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Marital Status</FormLabel>
                    <RadioGroup
                      name="maritalStatus"
                      onChange={handleChange}
                      row
                      defaultValue="single"
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="Single"
                      />
                      <FormControlLabel
                        value="married"
                        control={<Radio />}
                        label="Married"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={5}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={values.currentAddress}
                  name="currentAddress"
                  variant="outlined"
                  label="Current Address"
                  fullWidth
                />
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="currentAddress"
                />
              </Grid>

              <Grid item sx={12} sm={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.sameAsCurrentAddress}
                      onChange={handleChange}
                      name="sameAsCurrentAddress"
                      color="primary"
                    />
                  }
                  label="Same as Current Address"
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  onChange={handleChange}
                  type="text"
                  value={
                    values.sameAsCurrentAddress
                      ? values.currentAddress
                      : values.permanentAddress
                  }
                  name="permanentAddress"
                  variant="outlined"
                  label="Permanent Address"
                  fullWidth
                />
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="permanentAddress"
                />
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: "4px" }} container spacing={2}>
              <Grid item xs={12} sm={3} width="25%" p={1}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="designation">Designation</InputLabel>
                  <Select
                    labelId="designation"
                    name="designation"
                    id="designation"
                    onChange={handleChange}
                    value={values.designation}
                    label="Select Sub Type"
                  >
                    <MenuItem value="">
                      <em>Select Designation</em>
                    </MenuItem>
                    <MenuItem value={"Computer Operator"}>
                      Computer Operator
                    </MenuItem>
                    <MenuItem value={"Assistant"}>Assistant</MenuItem>
                    <MenuItem value={"Senior Clerk"}>Senior Clerk</MenuItem>
                    <MenuItem value={"Junior Clerk"}>Junior Clerk</MenuItem>
                    <MenuItem value={"Naib Qasid"}>Naib Qasid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={5} width="40%" p={1}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="attachedToCourt">
                    Attached with the Court/Administration of
                  </InputLabel>
                  <Select
                    labelId="attachedToCourt"
                    name="attachedToCourt"
                    id="attachedToCourt"
                    onChange={handleChange}
                    value={values.attachedToCourt}
                    label="Attached with the Court/Administration of"
                  >
                    <MenuItem value="">
                      {" "}
                      <em>Upper Courts</em>
                    </MenuItem>
                    <MenuItem value={"DSJ"}>DSJ</MenuItem>
                    <MenuItem value={"ADSJ at Timergara"}>
                      ADSJ at Timergara
                    </MenuItem>
                    <MenuItem value={"ADSJ at Chakdara"}>
                      ADSJ at Chakdara
                    </MenuItem>
                    <MenuItem value={"ADSJ at Samarbagh"}>
                      ADSJ at Samarbagh
                    </MenuItem>
                    <MenuItem value={"ADSJ at Lal Qilla"}>
                      ADSJ at Lal Qilla
                    </MenuItem>
                    <MenuItem value={"SCJ ADMIN"}>SCJ ADMIN</MenuItem>

                    <MenuItem value="">
                      <em>Lower Courts</em>
                    </MenuItem>
                    <MenuItem value={"SCJ JUDICIAL at Timergara"}>
                      SCJ JUDICIAL at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-I at Timergara"}>
                      CJ-I at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-II at Timergara"}>
                      CJ-II at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-III at Timergara"}>
                      CJ-III at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-IV at Timergara"}>
                      CJ-IV at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-V at Timergara"}>
                      CJ-V at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-VI at Timergara"}>
                      CJ-VI at Timergara
                    </MenuItem>
                    <MenuItem value={"CJ-I at Chakdara"}>
                      CJ-I at Chakdara
                    </MenuItem>
                    <MenuItem value={"CJ-I at Lal Qilla"}>
                      CJ-I at Lal Qilla
                    </MenuItem>
                    <MenuItem value={"CJ-I at Samarbagh"}>
                      CJ-I at Samarbagh
                    </MenuItem>

                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="attachedToCourt"
                />
              </Grid>

              <Grid item xs={12} sm={4} width="25%" p={1}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="dutyAs">Performing Duty As</InputLabel>
                  <Select
                    labelId="dutyAs"
                    name="dutyAs"
                    id="dutyAs"
                    onChange={handleChange}
                    value={values.dutyAs}
                    label="Performing Duty As"
                  >
                    <MenuItem value={"Computer Operator"}>
                      Computer Operator
                    </MenuItem>
                    <MenuItem value={"Stenographer"}>Stenographer</MenuItem>
                    <MenuItem value={"Reader"}>Reader</MenuItem>
                    <MenuItem value={"Muharrir"}>Muharrir</MenuItem>
                    <MenuItem value={"Naib Qasid"}>Naib Qasid</MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="dutyAs"
                />
              </Grid>
            </Grid>

            <Grid style={{ marginTop: "4px" }} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="initialAppointmentAs">
                    Initial Appointment as
                  </InputLabel>
                  <Select
                    labelId="initialAppointmentAs"
                    name="initialAppointmentAs"
                    id="initialAppointmentAs"
                    onChange={handleChange}
                    value={values.initialAppointmentAs}
                    label="Initial Appointment as"
                  >
                    <MenuItem value="">
                      <em>Select Designation</em>
                    </MenuItem>
                    <MenuItem value={"Computer Operator"}>
                      Computer Operator
                    </MenuItem>
                    <MenuItem value={"Assistant"}>Assistant</MenuItem>
                    <MenuItem value={"Senior Clerk"}>Senior Clerk</MenuItem>
                    <MenuItem value={"Junior Clerk"}>Junior Clerk</MenuItem>
                    <MenuItem value={"Naib Qasid"}>Naib Qasid</MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage
                  render={(msg) => <div className={classes.error}>{msg}</div>}
                  name="initialAppointmentAs"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TextField
                    label="Date Of Initial Appointment"
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      document.getElementById("datepicker-input").focus();
                    }}
                    InputProps={{
                      inputComponent: KeyboardDatePicker,
                      inputProps: {
                        id: "datepicker-input",
                        name: "dateOfInitialAppointment",
                        value: values.dateOfInitialAppointment
                          ? values.dateOfInitialAppointment
                          : new Date("01/01/2000"),
                        format: "dd/MM/yyyy",
                        autoOk: true,
                        onChange: (date) =>
                          setFieldValue("dateOfInitialAppointment", date),
                      },
                    }}
                  ></TextField>
                </MuiPickersUtilsProvider>
                <span>(Must attach appointment Order)</span>
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.appointedOnAnySonQuota}
                    onChange={handleChange}
                    name="appointedOnAnySonQuota"
                    color="primary"
                  />
                }
                label="Appointed On Any Son Quota"
              />
              <FormHelperText error>Check Box if apply!</FormHelperText>
            </Grid>

            {values.appointedOnAnySonQuota ? (
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="fatherDesignation">
                      Father Designation
                    </InputLabel>
                    <Select
                      labelId="fatherDesignation"
                      name="fatherDesignation"
                      id="fatherDesignation"
                      onChange={handleChange}
                      value={values.fatherDesignation}
                      label="Father Designation"
                    >
                      <MenuItem value="">
                        <em>Select Designation</em>
                      </MenuItem>
                      <MenuItem value={"Computer Operator"}>
                        Computer Operator
                      </MenuItem>
                      <MenuItem value={"Assistant"}>Assistant</MenuItem>
                      <MenuItem value={"Senior Clerk"}>Senior Clerk</MenuItem>
                      <MenuItem value={"Junior Clerk"}>Junior Clerk</MenuItem>
                      <MenuItem value={"Naib Qasid"}>Naib Qasid</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TextField
                      label="Father Retirement Date"
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        document
                          .getElementById("fatherDateOfRetirement-input")
                          .focus();
                      }}
                      InputProps={{
                        inputComponent: KeyboardDatePicker,
                        inputProps: {
                          id: "fatherDateOfRetirement-input",
                          name: "fatherDateOfRetirement",
                          value: values.fatherDateOfRetirement
                            ? values.fatherDateOfRetirement
                            : new Date("01/01/2000"),
                          format: "dd/MM/yyyy",
                          autoOk: true,
                          onChange: (date) =>
                            setFieldValue("fatherDateOfRetirement", date),
                        },
                      }}
                    ></TextField>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            ) : null}
            {/* <Box textAlign="center" my={2}>
                            <hr style={{ width: '100vh', borderTop: '1px solid', borderTopColor: 'lightgray', borderTopStyle: 'dashed' }} />
                        </Box> */}

            <Paper
              elevation={2}
              style={{ width: "100%", padding: "16px", margin: "16px 0px" }}
            >
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold" }}
                align="center"
                gutterBottom
              >
                Promotions
              </Typography>
              <FieldArray name="promotions">
                {({ push, remove }) => (
                  <>
                    {values.promotions.map((promotion, index) => (
                      <>
                        <Grid
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          container
                          spacing={3}
                          key={index}
                        >
                          <Grid item xs={12} sm={5}>
                            <MuiPickersUtilsProvider
                              utils={DateFnsUtils}
                              fullWidth
                            >
                              <KeyboardDatePicker
                                style={{ marginRight: "16px" }}
                                label={`No.${index + 1} Promotion Date`}
                                value={
                                  promotion.dateOfPromotion
                                    ? promotion.dateOfPromotion
                                    : new Date("01/01/2010")
                                }
                                format="dd/MM/yyyy"
                                onChange={(date) =>
                                  setFieldValue(
                                    `promotions[${index}].dateOfPromotion`,
                                    date
                                  )
                                }
                                fullWidth
                                autoOk
                              />
                            </MuiPickersUtilsProvider>
                            <span>(Must attach promotion Order)</span>
                          </Grid>

                          <Grid item xs={12} sm={5}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="promotionTo">{`No.${
                                index + 1
                              } Promotion to the Post of`}</InputLabel>
                              <Select
                                name={`promotions[${index}].promotionTo`}
                                onChange={handleChange}
                                value={promotion.promotionTo}
                                label={`No.${
                                  index + 1
                                } Promotion to the Post of`}
                              >
                                <MenuItem value="">
                                  <em>Select Designation</em>
                                </MenuItem>
                                <MenuItem value={"Computer Operator"}>
                                  Computer Operator
                                </MenuItem>
                                <MenuItem value={"Assistant"}>
                                  Assistant
                                </MenuItem>
                                <MenuItem value={"Senior Clerk"}>
                                  Senior Clerk
                                </MenuItem>
                                <MenuItem value={"Junior Clerk"}>
                                  Junior Clerk
                                </MenuItem>
                                <MenuItem value={"Naib Qasid"}>
                                  Naib Qasid
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={2} sm={2}>
                            <IconButton onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                          <Grid item sx={12} sm={12} my={2}>
                            <hr
                              style={{
                                width: "80%",
                                borderTop: "1px solid",
                                borderTopColor: "lightgray",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ))}

                    <Grid container justify="center">
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({ dateOfPromotion: null, promotionTo: "" })
                          }
                          fullWidth
                          // style={{ maxWidth: '50vh' }}
                          startIcon={<AddCircleIcon />}
                        >
                          Add Promotion
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </FieldArray>
            </Paper>

            {!values.maritalStatus ||
            values.maritalStatus === "single" ? null : (
              <Paper
                elevation={2}
                style={{ width: "100%", padding: "16px", margin: "16px 0px" }}
              >
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold" }}
                  align="center"
                  gutterBottom
                >
                  Number/Info of Children
                </Typography>
                <FieldArray name="children">
                  {({ push, remove }) => (
                    <>
                      {values.children.map((child, index) => (
                        <>
                          <Grid
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            container
                            spacing={2}
                            key={index}
                          >
                            <Grid item xs={12} sm={3}>
                              <Field
                                as={TextField}
                                style={{ marginRight: "16px" }}
                                variant="outlined"
                                label={`Child ${index + 1} Name`}
                                name={`children[${index}].name`}
                                fullWidth
                              />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                fullWidth
                              >
                                <KeyboardDatePicker
                                  style={{ marginRight: "16px" }}
                                  label={`Child ${index + 1} Date of Birth`}
                                  value={
                                    child.dob
                                      ? child.dob
                                      : new Date("01/01/2000")
                                  }
                                  format="dd/MM/yyyy"
                                  onChange={(date) =>
                                    setFieldValue(
                                      `children[${index}].dob`,
                                      date
                                    )
                                  }
                                  fullWidth
                                  autoOk
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={5} sm={2}>
                              <Grid
                                container
                                direction="column"
                                // justifyContent="center"
                                alignItems="flex-start"
                              >
                                <FormLabel component="legend">{`Child ${
                                  index + 1
                                } Marital Status`}</FormLabel>
                                <RadioGroup
                                  name={`children[${index}].maritalStatus`}
                                  value={child.maritalStatus}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    value="Single"
                                    control={<Radio />}
                                    label="Single"
                                  >
                                    <Field
                                      component={Radio}
                                      name={`children[${index}].maritalStatus`}
                                      value="single"
                                      label="Single"
                                    />
                                  </FormControlLabel>

                                  <FormControlLabel
                                    value="Married"
                                    control={<Radio />}
                                    label="Married"
                                  >
                                    <Field
                                      as={Radio}
                                      name={`children[${index}].maritalStatus`}
                                      value="married"
                                      label="Married"
                                    />
                                  </FormControlLabel>
                                </RadioGroup>
                              </Grid>
                            </Grid>
                            <Grid item xs={5} sm={2}>
                              <Grid
                                container
                                direction="column"
                                // justifyContent="center"
                                alignItems="flex-start"
                              >
                                <FormLabel component="legend">{`Child ${
                                  index + 1
                                } Gender`}</FormLabel>
                                <RadioGroup
                                  name={`children[${index}].gender`}
                                  value={child.gender}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    value="Male"
                                    control={<Radio />}
                                    label="Male"
                                  >
                                    <Field
                                      component={Radio}
                                      name={`children[${index}].gender`}
                                      value="male"
                                      label="Male"
                                    />
                                  </FormControlLabel>

                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                  >
                                    <Field
                                      as={Radio}
                                      name={`children[${index}].gender`}
                                      value="female"
                                      label="Female"
                                    />
                                  </FormControlLabel>
                                </RadioGroup>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                              <IconButton onClick={() => remove(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                            <Grid item sx={12} sm={12} my={2}>
                              <hr
                                style={{
                                  width: "80%",
                                  borderTop: "1px solid",
                                  borderTopColor: "lightgray",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => push({ name: "", dob: null, age: "" })}
                        fullWidth
                        startIcon={<AddCircleIcon />}
                      >
                        Add Child
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Paper>
            )}

            <Grid
              style={{ marginTop: "4px" }}
              container
              spacing={2}
              justify="center"
            >
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="initialAppointmentAs">
                    Nearest Working Station to home/place of residence
                  </InputLabel>
                  <Select
                    labelId="nearestStationToHome"
                    name="nearestStationToHome"
                    id="nearestStationToHome"
                    onChange={handleChange}
                    value={values.nearestStationToHome}
                    label="Nearest Working Station to home/place of residence"
                  >
                    <MenuItem value="">
                      <em>Select Station</em>
                    </MenuItem>
                    <MenuItem value={"Timergara"}>Timergara</MenuItem>
                    <MenuItem value={"Chakdara"}>Chakdara</MenuItem>
                    <MenuItem value={"Samarbagh"}>Samarbagh</MenuItem>
                    <MenuItem value={"Lal Qilla"}>Lal Qilla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="initialAppointmentAs">
                    Nearest Choice No.1
                  </InputLabel>
                  <Select
                    labelId="nearestStationToHomeC1"
                    name="nearestStationToHomeC1"
                    id="nearestStationToHomeC1"
                    onChange={handleChange}
                    value={values.nearestStationToHomeC1}
                    label="Nearest Choice No.1"
                  >
                    <MenuItem value="">
                      <em>Select Station</em>
                    </MenuItem>
                    <MenuItem value={"Timergara"}>Timergara</MenuItem>
                    <MenuItem value={"Chakdara"}>Chakdara</MenuItem>
                    <MenuItem value={"Samarbagh"}>Samarbagh</MenuItem>
                    <MenuItem value={"Lal Qilla"}>Lal Qilla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="initialAppointmentAs">
                    Nearest Choice No.2
                  </InputLabel>
                  <Select
                    labelId="nearestStationToHomeC2"
                    name="nearestStationToHomeC2"
                    id="nearestStationToHomeC2"
                    onChange={handleChange}
                    value={values.nearestStationToHomeC2}
                    label="Nearest Choice No.2"
                  >
                    <MenuItem value="">
                      <em>Select Station</em>
                    </MenuItem>
                    <MenuItem value={"Timergara"}>Timergara</MenuItem>
                    <MenuItem value={"Chakdara"}>Chakdara</MenuItem>
                    <MenuItem value={"Samarbagh"}>Samarbagh</MenuItem>
                    <MenuItem value={"Lal Qilla"}>Lal Qilla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="initialAppointmentAs">
                    Nearest Choice No.3
                  </InputLabel>
                  <Select
                    labelId="nearestStationToHomeC3"
                    name="nearestStationToHomeC3"
                    id="nearestStationToHomeC3"
                    onChange={handleChange}
                    value={values.nearestStationToHomeC3}
                    label="Nearest Choice No.3"
                  >
                    <MenuItem value="">
                      <em>Select Station</em>
                    </MenuItem>
                    <MenuItem value={"Timergara"}>Timergara</MenuItem>
                    <MenuItem value={"Chakdara"}>Chakdara</MenuItem>
                    <MenuItem value={"Samarbagh"}>Samarbagh</MenuItem>
                    <MenuItem value={"Lal Qilla"}>Lal Qilla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Paper
              elevation={2}
              style={{ width: "100%", padding: "16px", margin: "16px 0px" }}
            >
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold" }}
                align="center"
                gutterBottom
              >
                Previous History of Posting / Transfer i.e. in order of Recent
                to old, older, oldest (Attach order if available)
              </Typography>
              <FieldArray name="transferHistory">
                {({ push, remove }) => (
                  <>
                    {values.transferHistory.map((transfer, index) => (
                      <>
                        <Grid
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          container
                          spacing={3}
                          key={index}
                        >
                          <Grid item xs={12} sm={3}>
                            <MuiPickersUtilsProvider
                              utils={DateFnsUtils}
                              fullWidth
                            >
                              <KeyboardDatePicker
                                style={{ marginRight: "16px" }}
                                label={`Transfer No.${index + 1} Date`}
                                value={
                                  transfer.dateOfTransfer
                                    ? transfer.dateOfTransfer
                                    : new Date("01/01/2010")
                                }
                                format="dd/MM/yyyy"
                                onChange={(date) =>
                                  setFieldValue(
                                    `transferHistory[${index}].dateOfTransfer`,
                                    date
                                  )
                                }
                                fullWidth
                                autoOk
                              />
                            </MuiPickersUtilsProvider>
                            <span>(Attach transfer Order if Available)</span>
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="fromCourt">
                                From Court/Administration of
                              </InputLabel>
                              <Select
                                labelId="fromCourt"
                                name={`transferHistory[${index}].fromCourt`}
                                id="fromCourt"
                                onChange={handleChange}
                                value={transfer.fromCourt}
                                label={`No.${
                                  index + 1
                                } Transfer From Court/Administration of`}
                              >
                                <MenuItem value="">
                                  {" "}
                                  <em>Upper Courts</em>
                                </MenuItem>
                                <MenuItem value={"DSJ"}>DSJ</MenuItem>
                                <MenuItem value={"ADSJ at Timergara"}>
                                  ADSJ at Timergara
                                </MenuItem>
                                <MenuItem value={"ADSJ at Chakdara"}>
                                  ADSJ at Chakdara
                                </MenuItem>
                                <MenuItem value={"ADSJ at Samarbagh"}>
                                  ADSJ at Samarbagh
                                </MenuItem>
                                <MenuItem value={"ADSJ at Lal Qilla"}>
                                  ADSJ at Lal Qilla
                                </MenuItem>
                                <MenuItem value={"SCJ ADMIN"}>
                                  SCJ ADMIN
                                </MenuItem>

                                <MenuItem value="">
                                  <em>Lower Courts</em>
                                </MenuItem>
                                <MenuItem value={"SCJ JUDICIAL at Timergara"}>
                                  SCJ JUDICIAL at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Timergara"}>
                                  CJ-I at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-II at Timergara"}>
                                  CJ-II at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-III at Timergara"}>
                                  CJ-III at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-IV at Timergara"}>
                                  CJ-IV at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-V at Timergara"}>
                                  CJ-V at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-VI at Timergara"}>
                                  CJ-VI at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Chakdara"}>
                                  CJ-I at Chakdara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Lal Qilla"}>
                                  CJ-I at Lal Qilla
                                </MenuItem>
                                <MenuItem value={"CJ-I at Samarbagh"}>
                                  CJ-I at Samarbagh
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="toCourt">
                                To Court/Administration of
                              </InputLabel>
                              <Select
                                labelId="toCourt"
                                name={`transferHistory[${index}].toCourt`}
                                id="toCourt"
                                onChange={handleChange}
                                value={transfer.toCourt}
                                label={`No.${
                                  index + 1
                                } To Court/Administration of`}
                              >
                                <MenuItem value="">
                                  {" "}
                                  <em>Upper Courts</em>
                                </MenuItem>
                                <MenuItem value={"DSJ"}>DSJ</MenuItem>
                                <MenuItem value={"ADSJ at Timergara"}>
                                  ADSJ at Timergara
                                </MenuItem>
                                <MenuItem value={"ADSJ at Chakdara"}>
                                  ADSJ at Chakdara
                                </MenuItem>
                                <MenuItem value={"ADSJ at Samarbagh"}>
                                  ADSJ at Samarbagh
                                </MenuItem>
                                <MenuItem value={"ADSJ at Lal Qilla"}>
                                  ADSJ at Lal Qilla
                                </MenuItem>
                                <MenuItem value={"SCJ ADMIN"}>
                                  SCJ ADMIN
                                </MenuItem>

                                <MenuItem value="">
                                  <em>Lower Courts</em>
                                </MenuItem>
                                <MenuItem value={"SCJ JUDICIAL at Timergara"}>
                                  SCJ JUDICIAL at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Timergara"}>
                                  CJ-I at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-II at Timergara"}>
                                  CJ-II at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-III at Timergara"}>
                                  CJ-III at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-IV at Timergara"}>
                                  CJ-IV at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-V at Timergara"}>
                                  CJ-V at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-VI at Timergara"}>
                                  CJ-VI at Timergara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Chakdara"}>
                                  CJ-I at Chakdara
                                </MenuItem>
                                <MenuItem value={"CJ-I at Lal Qilla"}>
                                  CJ-I at Lal Qilla
                                </MenuItem>
                                <MenuItem value={"CJ-I at Samarbagh"}>
                                  CJ-I at Samarbagh
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={2} sm={1}>
                            <IconButton onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                          <Grid item sx={12} sm={12} my={2}>
                            <hr
                              style={{
                                width: "80%",
                                borderTop: "1px solid",
                                borderTopColor: "lightgray",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ))}

                    <Grid container justify="center">
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({
                              fromCourt: "",
                              toCourt: "",
                              dateOfTransfer: null,
                            })
                          }
                          fullWidth
                          // style={{ maxWidth: '50vh' }}
                          startIcon={<AddCircleIcon />}
                        >
                          Add Transfer
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </FieldArray>
            </Paper>

            <Grid container alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.IsSufferingFromDisease}
                    onChange={handleChange}
                    name="IsSufferingFromDisease"
                    color="primary"
                  />
                }
                label="Whether suffering from any severe permanent/chronic disease/disability? If yes please attach essential proof!"
              />
              <FormHelperText error>(Check Box if apply!)</FormHelperText>
            </Grid>
            <Paper
              elevation={2}
              style={{ width: "100%", padding: "16px", margin: "16px 0px" }}
            >
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold" }}
                align="center"
                gutterBottom
              >
                Qualification, skill and knowledge/experience of Computer
              </Typography>

              <Grid container spacing={1} justify="space-between">
                <Grid item xs={12} sm={7}>
                  <TextField
                    onChange={handleChange}
                    type="text"
                    name="highestQualification"
                    variant="outlined"
                    value={values.highestQualification}
                    label="Highest Qualification"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <TextField
                    onChange={handleChange}
                    type="text"
                    value={values.professionalQualification}
                    name="professionalQualification"
                    variant="outlined"
                    label="Professional Qualification"
                    fullWidth
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={4}
                  // direction="column"
                  // justifyContent="center"
                  // alignItems="flex-start"
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Computer Literacy</FormLabel>
                    <RadioGroup
                      name="computerLiteracy"
                      onChange={handleChange}
                      row
                      value={values.computerLiteracy}
                      // defaultValue=
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {!values.computerLiteracy ||
                values.computerLiteracy !== "yes" ? null : (
                  <Grid
                    item
                    xs={6}
                    sm={8}
                    // direction="column"
                    // justifyContent="center"
                    // alignItems="flex-start"
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Computer Literacy level
                      </FormLabel>
                      <RadioGroup
                        name="computerLiteracyLevel"
                        onChange={handleChange}
                        row
                        value={values.computerLiteracyLevel}
                        // defaultValue=''
                      >
                        <FormControlLabel
                          value="Basic"
                          control={<Radio />}
                          label="Basic"
                        />
                        <FormControlLabel
                          value="Intermediate"
                          control={<Radio />}
                          label="Intermediate"
                        />
                        <FormControlLabel
                          value="Advance"
                          control={<Radio />}
                          label="Advance"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={handleChange}
                    type="text"
                    value={values.extraSkill}
                    name="extraSkill"
                    variant="outlined"
                    label="Mention extra skill if any"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Paper>
            {/* <Box component='div' my={4} style={{ flexGrow: 1 }}>
                            <Grid container xs={12} sm={12} justify="center">
                                <hr style={{ width: '90vh', borderTop: '1px solid', borderTopColor: 'lightgray' }} />
                            </Grid>
                        </Box> */}

            <Box component="div" mt={4} style={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                  <Button
                    fullWidth
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
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
                    disabled={!dirty}
                    size="large"
                    type="reset"
                    startIcon={<ClearAllIcon />}
                  >
                    Clear All
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default FormEmployeeData;

// below is the formik hook method of makin a Form

// const formik = useFormik({

//     initialValues: {
//         name: '',
//         fatherName: '',
//         dateOfBirth: Date,
//         designation: '',
//         currentAddress: '',
//         permanentAddress: '',
//         email: '',
//         mobileNumber: '',
//         maritalStatus: '',
//         dateOfFirstPromotion: Date,
//         firstPromotionToThePostOf: '',
//         dateOfSecondPromotion: Date,
//         secondPromotionToThePostOf: '',
//         dateOfThirdPromotion: Date,
//         thirdPromotionToThePostOf: '',
//         initialAppointmentAs: '',
//         dateOfInitialAppointment: Date,
//         appointedOnAnySonQuota: Boolean,
//         fatherDesignation: '',
//         fatherDateOfRetirement: Date,
//         numberOfChildren: '',
//         detilsOfChildren: [
//         ],
//         nearestStationToHome: '',
//         stationChoice: {

//         },
//         transferHistory: [],
//         sufferingFromDisease: Boolean,
//         highestQualification: '',
//         professionalQualification: '',
//         computerLiteracy: Boolean,
//         computerLiteracyLevel: '',
//         extraSkill: '',
//     },

//     validationSchema: Yup.object({

//         name: Yup.string()

//             .max(20, 'Must be 20 characters or less')

//             .required('Name is a required field'),

//         fatherName: Yup.string()

//             .max(20, 'Must be 20 characters or less')

//             .required('Father Name is Required'),

//         email: Yup.string().email('Invalid email address').required('Required'),

//     }),

//     onSubmit: values => {

//         alert(JSON.stringify(values, null, 2));

//     },

// });

// return (
//     <Paper className={classes.paper} >

//         <form onSubmit={formik.handleSubmit} autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}>
//             <Typography variant='h6'>{currentId ? 'Edit' : 'Add New'} Employee</Typography>

//             <TextField onBlur={formik.handleBlur} onChange={formik.handleChange}
//                 type='text' name='name' variant='outlined' label='Employee Name'
//                 fullWidth value={formik.values.name} />
//             {formik.touched.name && formik.errors.name ? (<div style={{ color: 'red' }}>{formik.errors.name}</div>) : null}

//             <TextField onBlur={formik.handleBlur} fullWidth type='text' name='fatherName' variant='outlined'
//                 label='Father Name' value={formik.values.fatherName} onChange={formik.handleChange} />
//             {formik.touched.fatherName && formik.errors.fatherName ? (<div style={{ color: 'red' }}>{formik.errors.fatherName}</div>) : null}

//             <TextField placeholder='someone@gmail.com' fullWidth type='text' variant='outlined'
//                 {...formik.getFieldProps('email')}
//                 label='Email' />
//             {formik.touched.email && formik.errors.email ? (<div style={{ color: 'red' }}>{formik.errors.email}</div>) : null}

// <FormControl fullWidth variant="outlined" className={classes.formControl}>
//     <InputLabel id="designation">Designation</InputLabel>
//     <Select
//         labelId="designation"
//         name='designation'
//         id="designation"
//         onChange={formik.handleChange}
//         value={formik.values.designation}
//         label="Select Sub Type"
//     >
//         <MenuItem value="">
//             <em>Select Designation</em>
//         </MenuItem>
//         <MenuItem value={'Computer Operator'}>Computer Operator</MenuItem>
//         <MenuItem value={'Assistant'}>Assistant</MenuItem>
//         <MenuItem value={'Senior Clerk'}>Senior Clerk</MenuItem>
//         <MenuItem value={'Junior Clerk'}>Junior Clerk</MenuItem>
//     </Select>
// </FormControl>

{
  /* <FormControl fullWidth component="fieldset">
                        <FormLabel component="legend"><br />Case Type</FormLabel>
                        <RadioGroup required row aria-label="Case Type" name="caseType" value={employeeData["Case Type"]} onChange={e => { setSelectedCaseType(e.target.value); setEmployeeData({ ...employeeData, "Case Type": e.target.value, "Category Per PQS": ''  }); }}>
                            <FormControlLabel checked={selectedCaseType === 'Civil'} value="Civil" control={<GreenRadio />} label="Civil" />
                            <FormControlLabel checked={selectedCaseType === 'Criminal'} value="Criminal" control={<Radio />} label="Criminal" />
                        </RadioGroup>
                    </FormControl>
                    }
                    <TextField name='caseNumber' variant='outlined' label='Case Number' fullWidth value={employeeData["Case No"]} onChange={(e) => setEmployeeData({ ...employeeData, "Case No": e.target.value })} />
        
                        <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                
                    <KeyboardDatePicker
                        id="date-picker-inline"
                        label="Institution Date"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
            </MuiPickersUtilsProvider>
                    <TextField name='title' variant='outlined' label='Title' fullWidth value={employeeData["Case Title"]} onChange={(e) => setEmployeeData({ ...employeeData, "Case Title": e.target.value })} />
                            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                    <KeyboardDatePicker
                        margin="normal"
                        disableToolbar
                        variant="inline"
                        id="date-picker-inline"
                        label="Next Date"
                        format="dd/MM/yyyy"
                        value={employeeData['nextDate'] ? employeeData['nextDate'] : nextDate}
                        onChange={(date) => setEmployeeData({ ...employeeData, nextDate : date })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
            </MuiPickersUtilsProvider>
                    <TextField name='Action Abstract' variant='outlined' label='Action Abstract' fullWidth value={employeeData.actionAbstract} onChange={(e) => setEmployeeData({ ...employeeData, actionAbstract: e.target.value })} />
                
                    {selectedCaseType === 'Criminal' &&
                        <>
                            <TextField name='FIR' variant='outlined' label='FIR Number' fullWidth value={employeeData["FIR NO"]} onChange={(e) => setEmployeeData({ ...employeeData, "FIR NO": e.target.value })} />
                    
                            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                    <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="FIR Date"
                        format="dd/MM/yyyy"
                        value={employeeData['FIR Date'] ? employeeData['FIR Date'] : selectedDate}
                        onChange={(date) => setEmployeeData({ ...employeeData, "FIR Date": date })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
            </MuiPickersUtilsProvider>
                            <TextField name='underSection' variant='outlined' label='Under Section/s' fullWidth value={employeeData.Section} onChange={(e) => setEmployeeData({ ...employeeData, Section: e.target.value })} />
                            <TextField name='policeStation' variant='outlined' label='Police Station Name' fullWidth value={employeeData.Thana} onChange={(e) => setEmployeeData({ ...employeeData, Thana: e.target.value })} />
                        </>
                    } */
}
//                 <Button fullWidth className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit'>Submit</Button>
//                 <Button fullWidth variant='contained' color='secondary' size='small' onClick={clear} >Clear</Button>
//             </form>
//         </Paper>
//     );
// }
