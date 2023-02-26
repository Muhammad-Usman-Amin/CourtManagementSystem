import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl, 
    FormLabel, Select, MenuItem, InputLabel, } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
// import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { createCase, updateCase } from '../../actions/cases'

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const FormCases = ({ currentId, setCurrentId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [caseData, setCaseData] = useState({
        title: '', caseNumber: '', caseType: 'Civil',caseSubType: '', FIR: '', FIRdate: '', underSection: '', policeStation: '',institutionDate: Date,  disposalDate: Date, isTransferedIn: false, transferedInDate: Date,
    });
    const handleDateChange = (date) => {
        // console.log(date);
        setSelectedDate(date); 

        // console.log(typeof date); //Prints 12/24/2000 //object
        // console.log(selectedDate); //Prints 2023-02-22T17:08:35.583Z

        setCaseData({ ...caseData, institutionDate: date});
        console.log(caseData.institutionDate);
    };
    
    const [selectedCaseType, setSelectedCaseType] = useState('Civil');
    const caseFile = useSelector((state) => currentId ? state.cases.find((c) => c._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        // console.log(caseFile);
        setSelectedCaseType('Civil');
        
        if (caseFile) setCaseData(caseFile);
        // console.log('useEffect called');
    }, [caseFile]);

    const handleSubmit = async (e) => {
        // console.log(selectedCaseType);
        // setCaseData({ ...caseData, caseType: selectedCaseType });
        // console.log(caseData.caseType);
        e.preventDefault();

        if (currentId) {
            dispatch(updateCase(currentId, caseData));
        } else {
            dispatch(createCase(caseData));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setCaseData({title: '', caseNumber: '', caseType: 'Civil',caseSubType: '', FIR: '', FIRdate: '', underSection: '', policeStation: '',institutionDate: selectedDate ,  disposalDate: '', isTransferedIn: false});
    }

    return (
        <Paper className={classes.paper} >
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Case</Typography>

                <FormControl fullWidth component="fieldset">
                    <FormLabel component="legend"><br />Case Type</FormLabel>
                    <RadioGroup required row aria-label="Case Type" name="caseType" value={caseData.caseType} onChange={e => { setSelectedCaseType(e.target.value); setCaseData({ ...caseData, caseType: e.target.value }); }}>
                        <FormControlLabel checked={selectedCaseType === 'Civil'} value="Civil" control={<GreenRadio />} label="Civil" />
                        <FormControlLabel checked={selectedCaseType === 'Criminal'} value="Criminal" control={<Radio />} label="Criminal" />
                    </RadioGroup>
                </FormControl>
                {/* <TextField name='caseSubType' variant='outlined' label='Case Sub Type' fullWidth value={caseData.caseSubType} onChange={(e) => setCaseData({ ...caseData, caseSubType: e.target.value })} /> */}
                {selectedCaseType === 'Civil' ? <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Sub Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={caseData.caseSubType}
                        onChange={(e) => setCaseData({ ...caseData, caseSubType: e.target.value })}
                        label="Select Sub Type"
                        >
                        <MenuItem value="">
            <em>Mostly Used</em>
          </MenuItem>
                            <MenuItem value={'Suit'}>Suit</MenuItem>
                            <MenuItem value={'Civil Appeal'}>Civil Appeal</MenuItem>
                            <MenuItem value={'Family Appeal'}>Family Appeal</MenuItem>
                    </Select>
                </FormControl> : 
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Sub Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={caseData.caseSubType}
                        onChange={(e) => setCaseData({ ...caseData, caseSubType: e.target.value })}
                        label="Select Sub Type"
                        >
                        <MenuItem value="">
            <em>Mostly Used</em>
          </MenuItem>
                            <MenuItem value={'Suit'}>Session Case</MenuItem>
                            <MenuItem value={'Civil Appeal'}>CNSA Case</MenuItem>
                            <MenuItem value={'Family Appeal'}>BBA</MenuItem>
                    </Select>
                </FormControl>
                }
                <TextField name='caseNumber' variant='outlined' label='Case Number' fullWidth value={caseData.caseNumber} onChange={(e) => setCaseData({ ...caseData, caseNumber: e.target.value })} />
                {/* <Container fullwidth>
                    <TextField name='institutionDate' variant='outlined' label='Institution Date' fullWidth value={caseData.institutionDate} onChange={(e) => setCaseData({ ...caseData, institutionDate: e.target.value })} /> */}
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
                    // margin="normal"
                    id="date-picker-dialog"
                    label="Institution Date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                {/* <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                /> */}
            {/* </Grid> */}
        </MuiPickersUtilsProvider>
                {/* </Container> */}
                <TextField name='title' variant='outlined' label='Title' fullWidth value={caseData.title} onChange={(e) => setCaseData({ ...caseData, title: e.target.value })} />
                {/* <TextField name='caseType' variant='outlined' label='Case Type i.e Civil or Criminal' fullWidth value={caseData.caseType} onChange={(e) => setCaseData({ ...caseData, caseType: e.target.value })} /> */}
                {selectedCaseType === 'Criminal' &&
                    <>
                        <TextField name='FIR' variant='outlined' label='FIR Number' fullWidth value={caseData.FIR} onChange={(e) => setCaseData({ ...caseData, FIR: e.target.value })} />
                        <TextField name='FIRdate' variant='outlined' label='FIR Date' fullWidth value={caseData.FIRdate} onChange={(e) => setCaseData({ ...caseData, FIRdate: e.target.value })} />
                        <TextField name='underSection' variant='outlined' label='Under Section/s' fullWidth value={caseData.underSection} onChange={(e) => setCaseData({ ...caseData, underSection: e.target.value })} />
                        <TextField name='policeStation' variant='outlined' label='Police Station Name' fullWidth value={caseData.policeStation} onChange={(e) => setCaseData({ ...caseData, policeStation: e.target.value })} />
                    </>
                }

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    );
}

export default FormCases;



// import React from 'react';
// import Grid from '@material-ui/core/Grid';


// export default function FormCases() {
//     // The first commit of Material-UI
    

//     return (
        
//     );
// }
