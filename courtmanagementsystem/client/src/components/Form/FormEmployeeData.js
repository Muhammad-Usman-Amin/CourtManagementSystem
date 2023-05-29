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
    FormLabel, Select, MenuItem, InputLabel,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
// import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import useStyles2 from '../../dashboardExample/dashboard';
import Container from '@material-ui/core/Container';
import { createCase, updateCase } from '../../actions/cases';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

    const formik = useFormik({

        initialValues: {
            name: '',
            fatherName: '',
            dateOfBirth: Date,
            designation: '',
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
        },

        validationSchema: Yup.object({

            name: Yup.string()

                .max(20, 'Must be 20 characters or less')

                .required('Name is a required field'),

            fatherName: Yup.string()

                .max(20, 'Must be 20 characters or less')

                .required('Father Name is Required'),

            email: Yup.string().email('Invalid email address').required('Required'),

        }),

        onSubmit: values => {

            alert(JSON.stringify(values, null, 2));

        },

    });

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

    useEffect(() => {
        // setSelectedCaseType('Civil');
    }, []);
    useEffect(() => {
        // console.log(caseFile);
        // console.log('useEffect called');
        if (caseFile) {
            // setSelectedCaseType(caseFile["Case Type"]);
            // setSelectedDate(caseFile["Date of Institution "]);
            // setNextDate(caseFile.nextDate);
            // console.log(selectedCaseType);
            // setEmployeeData(caseFile);
        }
    }, [caseFile]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (currentId) {
            // dispatch(updateCase(currentId, employeeData));
        } else {
            // dispatch(createCase(employeeData));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        formik.handleReset();
    }

    return (
        <Paper className={classes.paper} >

            <form onSubmit={formik.handleSubmit} autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Add New'} Employee</Typography>

                <TextField onBlur={formik.handleBlur} onChange={formik.handleChange}
                    type='text' name='name' variant='outlined' label='Employee Name'
                    fullWidth value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? (<div style={{ color: 'red' }}>{formik.errors.name}</div>) : null}

                <TextField onBlur={formik.handleBlur} fullWidth type='text' name='fatherName' variant='outlined'
                    label='Father Name' value={formik.values.fatherName} onChange={formik.handleChange} />
                {formik.touched.fatherName && formik.errors.fatherName ? (<div style={{ color: 'red' }}>{formik.errors.fatherName}</div>) : null}

                <TextField fullWidth type='text' variant='outlined'
                    {...formik.getFieldProps('email')}
                    label='Email' />
                {formik.touched.email && formik.errors.email ? (<div style={{ color: 'red' }}>{formik.errors.email}</div>) : null}

                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="designation">Designation</InputLabel>
                    <Select
                        labelId="designation"
                        name='designation'
                        id="designation"
                        onChange={formik.handleChange}
                        value={formik.values.designation}
                        label="Select Sub Type"
                    >
                        <MenuItem value="">
                            <em>Select Designation</em>
                        </MenuItem>
                        <MenuItem value={'Computer Operator'}>Computer Operator</MenuItem>
                        <MenuItem value={'Assistant'}>Assistant</MenuItem>
                        <MenuItem value={'Senior Clerk'}>Senior Clerk</MenuItem>
                        <MenuItem value={'Junior Clerk'}>Junior Clerk</MenuItem>
                    </Select>
                </FormControl>


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
                <Button fullWidth className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit'>Submit</Button>
                <Button fullWidth variant='contained' color='secondary' size='small' onClick={clear} >Clear</Button>
            </form>
        </Paper>
    );
}

export default FormEmployeeData;