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
import { createCase, updateCase } from '../../actions/cases';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const FormCases =  ({ currentId, setCurrentId }) => {
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [caseData, setCaseData] = useState({
        // "Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '',"Date of Institution ": Date,  "Date of Disposal": Date, isTransferedIn: false, transferedInDate: Date, "Date of Transfer In": Date,
        "Case Title": '', "Case No": '', "Case Type": 'Civil', "Category Per PQS": '', "FIR NO": '',
         "FIR Date": selectedDate, Thana:'', Section:'', "Date of Institution ": selectedDate,
          "Date of Disposal Transfer Out": Date, "Disposal OR Transfer Out Flag": '', "Disposal Mode Flag": '',
           "Date of Transfer In": Date, "Date of Other Institution": Date, "Institution Flag": '', nextDate: nextDate,
           actionAbstract: '', orderDate: new Date(),
});

    const handleDateChange = (date) => {
        setSelectedDate(date); 

        setCaseData({ ...caseData, "Date of Institution ": date});
        // console.log(caseData["Date of Institution "]);
    };
    
    const [selectedCaseType, setSelectedCaseType] = useState('Civil');
    const caseFile = useSelector((state) => currentId ? state.cases.find((c) => c._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setSelectedCaseType('Civil');
    },[]);
    useEffect(() => {
                // console.log(caseFile);
        // console.log('useEffect called');
        if (caseFile) {
            setSelectedCaseType(caseFile["Case Type"]);
            setSelectedDate(caseFile["Date of Instituiton "]);
            setNextDate(caseFile.nextDate);
            // console.log(selectedCaseType);
            setCaseData(caseFile);
        }
    },[caseFile]);

    const handleSubmit = async (e) => {
        
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
        setSelectedCaseType('Civil');
        // setCaseData({"Case Title": '', "Case No": '', "Case Type": 'Civil',"Category Per PQS": '', "FIR NO": '', "FIR Date": '', underSection: '', policeStation: '', "Date of Institution ": selectedDate ,  "Date of Disposal": '', isTransferedIn: false, "Date of Transfered In": Date});
        setCaseData({"Case Title": '', "Case No": '', "Case Type": selectedCaseType, "Category Per PQS": '', "FIR NO": '',
        "FIR Date": new Date(), Thana:'', Section:'', "Date of Institution ": new Date(), 
        "Date of Disposal Transfer Out": Date, "Disposal OR Transfer Out Flag": '', "Disposal Mode Flag": '', 
        "Date of Transfer In": Date, "Date of Other Institution": new Date(), "Institution Flag": '',nextDate: new Date(),
        actionAbstract: '',
    });
    }

    return (
        <Paper className={classes.paper} >
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Case</Typography>

                <FormControl fullWidth component="fieldset">
                    <FormLabel component="legend"><br />Case Type</FormLabel>
                    <RadioGroup required row aria-label="Case Type" name="caseType" value={caseData["Case Type"]} onChange={e => { setSelectedCaseType(e.target.value); setCaseData({ ...caseData, "Case Type": e.target.value, "Category Per PQS": ''  }); }}>
                        <FormControlLabel checked={selectedCaseType === 'Civil'} value="Civil" control={<GreenRadio />} label="Civil" />
                        <FormControlLabel checked={selectedCaseType === 'Criminal'} value="Criminal" control={<Radio />} label="Criminal" />
                    </RadioGroup>
                </FormControl>
                {selectedCaseType === 'Civil' ? <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Sub Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={caseData["Category Per PQS"]}
                        onChange={(e) => setCaseData({ ...caseData, "Category Per PQS": e.target.value })}
                        label="Select Sub Type"
                        >
                        <MenuItem value="">
            <em>Mostly Used</em>
          </MenuItem>
                            <MenuItem value={'Civil-001-Civil Suits (Original Jurisdiction)'}>Suit</MenuItem>
                            <MenuItem value={'Civil-022-Civil Appeals'}>Civil Appeal</MenuItem>
                            <MenuItem value={'Civil-025-Family Appeals'}>Family Appeal</MenuItem>
                    <MenuItem value="">
            <em>All Categories</em>
                    </MenuItem>
                            <MenuItem value={'Civil-001-Civil Suits (Original Jurisdiction)'}>Civil-001 Civil Suits (Original Jurisdiction)</MenuItem>
                            <MenuItem value={'Civil-002-Civil Suit'}>Civil-002 Civil Suit</MenuItem>
                            <MenuItem value={'Civil-003-Suits under Order 37 CPC'}>Civil-003 Suits under Order 37 CPC</MenuItem>
                            <MenuItem value={'Civil-004-Custody of Minors'}>Civil-004 Custody of Minors</MenuItem>
                            <MenuItem value={'Civil-005-Defamation'}>Civil-005 Defamation</MenuItem>
                            <MenuItem value={'Civil-006-Family Court Cases'}>Civil-006 Family Court Cases</MenuItem>
                            <MenuItem value={'Civil-007-Succession Cases'}>Civil-007 Succession Cases</MenuItem>
                            <MenuItem value={'Civil-008-Guardianship Cases'}>Civil-008 Guardianship Cases</MenuItem>
                            <MenuItem value={'Civil-009-Land Acquisition Cases'}>Civil-009 Land Acquisition Cases</MenuItem>
                            <MenuItem value={'Civil-010-Rent Cases'}>Civil-010 Rent Cases</MenuItem>
                            <MenuItem value={'Civil-011-Proceeding under KP Mental Health Act 2017'}>Civil-011 Proceeding under KP Mental Health Act 2017</MenuItem>
                            <MenuItem value={'Civil-012-Tribunal Cases'}>Civil-012 Tribunal Cases</MenuItem>
                            <MenuItem value={'Civil-013-Small Claims'}>Civil-013 Small Claims</MenuItem>
                            <MenuItem value={'Civil-014-Execution in which periodic payments are made'}>Civil-014 Execution in which periodic payments are made</MenuItem>
                            <MenuItem value={'Civil-015-Execution Petitions'}>Civil-015 Execution Petitions</MenuItem>
                            <MenuItem value={'Civil-016-Cases under other laws'}>Civil-016 Cases under other laws</MenuItem>
                            <MenuItem value={'Civil-017-Other Civil Misc. Applications'}>Civil-017 Other Civil Misc. Applications</MenuItem>
                            <MenuItem value={'Civil-018-Others'}>Civil-018 Others</MenuItem>
                            <MenuItem value={'Civil-019-Application under section 12(2) CPC'}>Civil-019 Application under section 12(2) CPC</MenuItem>
                            <MenuItem value={'Civil-020-Review Petition'}>Civil-020 Review Petition</MenuItem>
                            <MenuItem value={'Civil-021-Objection Petitions'}>Civil-021 Objection Petitions</MenuItem>
                            <MenuItem value={'Civil-022-Civil Appeals'}>Civil-022 Civil Appeals</MenuItem>
                            <MenuItem value={'Civil-023-Civil Revisions'}>Civil-023 Civil Revisions</MenuItem>
                            <MenuItem value={'Civil-024-Guardianship and Succession Appeals'}>Civil-024 Guardianship and Succession Appeals</MenuItem>
                            <MenuItem value={'Civil-025-Family Appeals'}>Civil-025 Family Appeals</MenuItem>
                            <MenuItem value={'Civil-026-Rent Appeals '}>Civil-026 Rent Appeals </MenuItem>
                            <MenuItem value={'Civil-027-Civil Appeals against Order '}>Civil-027 Civil Appeals against Order </MenuItem>
                            <MenuItem value={'Civil-028-Insolvency Cases '}>Civil-028 Insolvency Cases </MenuItem>
                            <MenuItem value={'Civil-029-Execution Petition Against Government '}>Civil-029 Execution Petition Against Government </MenuItem>
                    </Select>

                </FormControl> 
                :
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Sub Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={caseData["Category Per PQS"]}
                        onChange={(e) => setCaseData({ ...caseData, "Category Per PQS": e.target.value })}
                        label="Select Sub Type"
                        >
                        <MenuItem value="">
            <em>Mostly Used</em>
          </MenuItem>
                            <MenuItem value={'CR-001-Homicide'}>Session Case</MenuItem>
                            <MenuItem value={'CR-011-Narcotics Substances'}>CNSA Case</MenuItem>
                            <MenuItem value={'CR-020-Bail Applications'}>BA, BBA, BCA, CrMisc</MenuItem>
                            <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
                            <MenuItem value={'CR-001-Homicide'}>CR-001 Homicide</MenuItem>
                            <MenuItem value={'CR-002-Attempt to Murder'}>CR-002 Attempt to Murder</MenuItem>
                            <MenuItem value={'CR-003-Cases triable u/s 30 Cr.PC'}>CR-003 Cases triable u/s 30 Cr.PC</MenuItem>
                            <MenuItem value={'CR-004-Hurt Cases'}>CR-004 Hurt Cases</MenuItem>
                            <MenuItem value={'CR-005-Abduction/Kidnapping'}>CR-005 Abduction/Kidnapping</MenuItem>
                            <MenuItem value={'CR-006-Arms & Amunation'}>CR-006 Arms & Amunation</MenuItem>
                            <MenuItem value={'CR-007-Hudood Laws'}>CR-007 Hudood Laws</MenuItem>
                            <MenuItem value={'CR-008-Financial Crimes'}>CR-008 Financial Crimes</MenuItem>
                            <MenuItem value={'CR-009-Foreigner Act'}>CR-009 Foreigner Act</MenuItem>
                            <MenuItem value={'CR-010-Complaint Cases'}>CR-010 Complaint Cases</MenuItem>
                            <MenuItem value={'CR-011-Narcotics Substances'}>CR-011 Narcotics Substances</MenuItem>
                            <MenuItem value={'CR-012-Habeas Corpus (491 Cr.PC.)'}>CR-012 Habeas Corpus (491 Cr.PC.)</MenuItem>
                            <MenuItem value={'CR-013-Offences against Children'}>CR-013 Offences against Children</MenuItem>
                            <MenuItem value={'CR-014-Offences Against Property'}>CR-014 Offences Against Property</MenuItem>
                            <MenuItem value={'CR-015-Sexual Offences'}>CR-015 Sexual Offences</MenuItem>
                            <MenuItem value={'CR-016-Minor Offences'}>CR-016 Minor Offences</MenuItem>
                            <MenuItem value={'CR-017-Proceedings u/s 514 Cr. P.C'}>CR-017 Proceedings u/s 514 Cr. P.C</MenuItem>
                            <MenuItem value={'CR-018-Proceedings Under Section 133 and 145 Cr. P.C'}>CR-018 Proceedings Under Section 133 and 145 Cr. P.C</MenuItem>
                            <MenuItem value={'CR-019-Security Proceedings u/s 107/51'}>CR-019 Security Proceedings u/s 107/51</MenuItem>
                            <MenuItem value={'CR-020-Bail Applications'}>CR-020 Bail Applications</MenuItem>
                            <MenuItem value={'CR-021-Other Criminal Misc. Applications'}>CR-021 Other Criminal Misc. Applications</MenuItem>
                            <MenuItem value={'CR-022-Case under Forest Laws, Motor Vehicle Laws, Food Law'}>CR-022 Case under Forest Laws, Motor Vehicle Laws, Food Law</MenuItem>
                            <MenuItem value={'CR-023-Other Local and Special Laws'}>CR-023 Other Local and Special Laws</MenuItem>
                            <MenuItem value={'CR-024-Cases under other laws'}>CR-024 Cases under other laws</MenuItem>
                            <MenuItem value={'CR-025-Criminal Appeals'}>CR-025 Criminal Appeals</MenuItem>
                            <MenuItem value={'CR-026-Criminal Revisions'}>CR-026 Criminal Revisions</MenuItem>
                    </Select>
                </FormControl>
                 
                }
                <TextField name='caseNumber' variant='outlined' label='Case Number' fullWidth value={caseData["Case No"]} onChange={(e) => setCaseData({ ...caseData, "Case No": e.target.value })} />
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
                    // disableToolbar
                    // variant="inline"
                    // margin="normal"
                    id="date-picker-inline"
                    // id="date-picker-dialog"
                    label="Institution Date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            {/* </Grid> */}
        </MuiPickersUtilsProvider>
                {/* </Container> */}
                <TextField name='title' variant='outlined' label='Title' fullWidth value={caseData["Case Title"]} onChange={(e) => setCaseData({ ...caseData, "Case Title": e.target.value })} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                <KeyboardDatePicker
                    margin="normal"
                    disableToolbar
                    variant="inline"
                    id="date-picker-inline"
                    label="Next Date"
                    format="dd/MM/yyyy"
                    value={caseData['nextDate'] ? caseData['nextDate'] : nextDate}
                    onChange={(date) => setCaseData({ ...caseData, nextDate : date })}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
                <TextField name='Action Abstract' variant='outlined' label='Action Abstract' fullWidth value={caseData.actionAbstract} onChange={(e) => setCaseData({ ...caseData, actionAbstract: e.target.value })} />
            
                {selectedCaseType === 'Criminal' &&
                    <>
                        <TextField name='FIR' variant='outlined' label='FIR Number' fullWidth value={caseData["FIR NO"]} onChange={(e) => setCaseData({ ...caseData, "FIR NO": e.target.value })} />
                        {/* <TextField name='FIRdate' variant='outlined' label='FIR Date' fullWidth value={caseData["FIR Date"]} onChange={(e) => setCaseData({ ...caseData, "FIR Date": e.target.value })} /> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                <KeyboardDatePicker
                    // margin="normal"
                    id="date-picker-dialog"
                    label="FIR Date"
                    format="dd/MM/yyyy"
                    value={caseData['FIR Date'] ? caseData['FIR Date'] : selectedDate}
                    onChange={(date) => setCaseData({ ...caseData, "FIR Date": date })}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
                        <TextField name='underSection' variant='outlined' label='Under Section/s' fullWidth value={caseData.Section} onChange={(e) => setCaseData({ ...caseData, Section: e.target.value })} />
                        <TextField name='policeStation' variant='outlined' label='Police Station Name' fullWidth value={caseData.Thana} onChange={(e) => setCaseData({ ...caseData, Thana: e.target.value })} />
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
