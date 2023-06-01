import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {
    TextField, Button, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl,
    FormLabel, Select, MenuItem, InputLabel, Box
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
// import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import useStyles2 from '../../dashboardExample/dashboard';
import Container from '@material-ui/core/Container';
// import { createCase, updateCase } from '../../actions/cases';
import { createEmployeeData, updateEmployeeData } from '../../actions/empoyeeData';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const FormEmployeeData = ({ currentId, setCurrentId }) => {

    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    // const [employeeData, setEmployeeData] = useState({
    //     name: '', fatherName: '', dateOfBirth: new Date(), designation: '',
    // });

    const handleDateChange = (date) => {
        // setSelectedDate(date);

        // setEmployeeData({ ...employeeData, "Date of Institution ": date });
        // console.log(caseData["Date of Institution "]);
    };

    // const [selectedCaseType, setSelectedCaseType] = useState('Civil');

    const caseFile = useSelector((state) => currentId ? state.cases.find((c) => c._id === currentId) : null);
    const classes = useStyles();
    const classes2 = useStyles2();
    const dispatch = useDispatch();
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

    return (
        <Paper className={classes.paper} >
            <Formik
                initialValues={{
                    name: '',
                    designation: '',
                    dutyAs: '',
                    attachedToCourt: '',
                    fatherName: '',
                    dateOfBirth: Date,
                    currentAddress: '',
                    permanentAddress: '',
                    email: '',
                    mobileNumber: '',
                    maritalStatus: '',
                    dateOfFirstPromotion: Date,
                    firstPromotionToThePostOf: '',
                    dateOfSecondPromotion: Date,
                    secondPromotionToThePostOf: '',
                    dateOfThirdPromotion: Date,
                    thirdPromotionToThePostOf: '',
                    initialAppointmentAs: '',
                    dateOfInitialAppointment: Date,
                    appointedOnAnySonQuota: Boolean,
                    fatherDesignation: '',
                    fatherDateOfRetirement: Date,
                    numberOfChildren: '',
                    detilsOfChildren: [
                    ],
                    nearestStationToHome: '',
                    stationChoice: {

                    },
                    transferHistory: [],
                    sufferingFromDisease: Boolean,
                    highestQualification: '',
                    professionalQualification: '',
                    computerLiteracy: Boolean,
                    computerLiteracyLevel: '',
                    extraSkill: '',
                }}

                validationSchema={Yup.object({

                    name: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Name is Required'),

                    attachedToCourt: Yup.string()
                        .required('Court is Required'),
                    dutyAs: Yup.string()
                        .required('Duty As is Required'),

                    fatherName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Father Name is Required'),

                    email: Yup.string().email('Invalid email address').required('Email Required'),

                    currentAddress: Yup.string().min(5, 'Too few words friend')
                        .max(50, 'Too much, Must be less than 50 characters').required('Address is Required'),

                })}

                onSubmit={async (values, { setSubmitting, resetForm }) => {

                    // if (currentId) {
                    //     dispatch(updateEmployeeData(currentId, values));
                    // } else {
                    //     dispatch(createEmployeeData(values));
                    // }
                    setSubmitting(false);

                    setTimeout(() => {

                        alert(JSON.stringify(values, null, 2));

                        setSubmitting(false);

                    }, 400);
                    resetForm();

                }}
            >
                {({ dirty, values, handleChange, isSubmitting }) => (
                    <Form className={`${classes.root} ${classes.form}`}>
                        {isSubmitting && <div>Loading...</div>}

                        <Typography variant='h6'>{currentId ? 'Edit' : 'Add New'} Employee</Typography>

                        <TextField onChange={handleChange} type="text" value={values.name} name="name" variant='outlined'
                            label='Name of Employee' fullWidth />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="name" />

                        <Box boxSizing='border-box' width="30%" p={1}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="designation">Designation</InputLabel>
                                <Select
                                    labelId="designation"
                                    name='designation'
                                    id="designation"
                                    onChange={handleChange}
                                    value={values.designation}
                                    label="Select Sub Type"
                                >
                                    <MenuItem value="">
                                        <em>Select Designation</em>
                                    </MenuItem>
                                    <MenuItem value={'Computer Operator'}>Computer Operator</MenuItem>
                                    <MenuItem value={'Assistant'}>Assistant</MenuItem>
                                    <MenuItem value={'Senior Clerk'}>Senior Clerk</MenuItem>
                                    <MenuItem value={'Junior Clerk'}>Junior Clerk</MenuItem>
                                    <MenuItem value={'Junior Clerk'}>Junior Clerk</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/* <Box display="flex" justifyContent="center" flexDirection="row" flexGrow={1} style={{ backgroundColor: 'yellow' }}> */}
                        <Box boxSizing='border-box' width="40%" p={1}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="attachedToCourt">Attached with the Court/Administration of</InputLabel>
                                <Select
                                    labelId="attachedToCourt"
                                    name="attachedToCourt"
                                    id="attachedToCourt"
                                    onChange={handleChange}
                                    value={values.attachedToCourt}
                                    label="Attached with the Court/Administration of"
                                >
                                    <MenuItem value=""> <em>Upper Courts</em></MenuItem>
                                    <MenuItem value={'DSJ'}>DSJ</MenuItem>
                                    <MenuItem value={'ADSJ at Timergara'}>ADSJ at Timergara</MenuItem>
                                    <MenuItem value={'ADSJ at Chakdara'}>ADSJ at Chakdara</MenuItem>
                                    <MenuItem value={'ADSJ at Samarbagh'}>ADSJ at Samarbagh</MenuItem>
                                    <MenuItem value={'ADSJ at Lal Qilla'}>ADSJ at Lal Qilla</MenuItem>
                                    <MenuItem value={'SCJ ADMIN'}>SCJ ADMIN</MenuItem>

                                    <MenuItem value=""><em>Lower Courts</em></MenuItem>
                                    <MenuItem value={'SCJ JUDICIAL at Timergara'}>SCJ JUDICIAL at Timergara</MenuItem>
                                    <MenuItem value={'CJ-I at Timergara'}>CJ-I at Timergara</MenuItem>
                                    <MenuItem value={'CJ-II at Timergara'}>CJ-II at Timergara</MenuItem>
                                    <MenuItem value={'CJ-III at Timergara'}>CJ-III at Timergara</MenuItem>
                                    <MenuItem value={'CJ-IV at Timergara'}>CJ-IV at Timergara</MenuItem>
                                    <MenuItem value={'CJ-V at Timergara'}>CJ-V at Timergara</MenuItem>
                                    <MenuItem value={'CJ-VI at Timergara'}>CJ-VI at Timergara</MenuItem>
                                    <MenuItem value={'CJ-I at Chakdara'}>CJ-I at Chakdara</MenuItem>
                                    <MenuItem value={'CJ-I at Lal Qilla'}>CJ-I at Lal Qilla</MenuItem>
                                    <MenuItem value={'CJ-I at Samarbagh'}>CJ-I at Samarbagh</MenuItem>

                                    <MenuItem value=""><em></em></MenuItem>
                                </Select>
                            </FormControl>
                            <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="attachedToCourt" />
                        </Box>
                        <Box width="30%" p={1}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="dutyAs">Performing Duty As</InputLabel>
                                <Select
                                    labelId="dutyAs"
                                    name="dutyAs"
                                    id="dutyAs"
                                    onChange={handleChange}
                                    value={values.dutyAs}
                                    label="Performing Duty As"
                                >
                                    <MenuItem value=""> <em>Grade 1</em></MenuItem>
                                    <MenuItem value={'Computer Operator'}>Computer Operator</MenuItem>
                                    <MenuItem value={'Stenographer'}>Stenographer</MenuItem>
                                    <MenuItem value={'Reader'}>Reader</MenuItem>

                                    <MenuItem value=""><em>Grade 2</em></MenuItem>
                                    <MenuItem value={'Muharrir'}>Muharrir</MenuItem>

                                    <MenuItem value=""><em>Grade 3</em></MenuItem>
                                    <MenuItem value={'Naib Qasid'}>Naib Qasid</MenuItem>
                                </Select>
                            </FormControl>
                            <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="dutyAs" />
                        </Box>
                        {/* </Box> */}

                        <TextField onChange={handleChange} type="text" value={values.fatherName} name="fatherName" variant='outlined'
                            label='Father Name' fullWidth />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="fatherName" />

                        <TextField onChange={handleChange} type="text" value={values.currentAddress} name="currentAddress" variant='outlined'
                            label='Current Address' fullWidth />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="currentAddress" />

                        <TextField onChange={handleChange} type="text" value={values.permanentAddress} name="permanentAddress" variant='outlined'
                            label='Permanent Address' fullWidth />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="permanentAddress" />

                        <TextField onChange={handleChange} type="text" value={values.mobileNumber} name="mobileNumber" variant='outlined'
                            label='Mobile Number' fullWidth placeholder='0346 1234567' />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="mobileNumber" />

                        <TextField onChange={handleChange} type="text" value={values.email} name="email" variant='outlined'
                            label='Email' fullWidth placeholder='employee@email.com' />
                        <ErrorMessage render={msg => <div className={classes.error}>{msg}</div>} name="email" />


                        <Button fullWidth className={classes.buttonSubmit} variant='contained' color='primary'
                            size='large' disabled={isSubmitting} type='submit' startIcon={<SaveIcon />}>
                            SAVE</Button>
                        <Button fullWidth variant='contained' color='secondary' size='small' disabled={!dirty}
                            type='reset' >Clear</Button>

                    </Form>
                )
                }

            </Formik>
        </Paper>
    );
};

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


{/* <FormControl fullWidth component="fieldset">
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
                } */}
//                 <Button fullWidth className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit'>Submit</Button>
//                 <Button fullWidth variant='contained' color='secondary' size='small' onClick={clear} >Clear</Button>
//             </form>
//         </Paper>
//     );
// }

export default FormEmployeeData;