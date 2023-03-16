import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, TextField } from '@material-ui/core';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  FormControlLabel, FormControl,
  FormLabel, Select, MenuItem, InputLabel,
} from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateCase } from '../../actions/cases';

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});


const CauseList = ({ currentId, setCurrentId }) => {

  const cases = useSelector((state) => state.cases);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [nextDate, setNextDate] = useState(new Date());
  const [caseData, setCaseData] = useState({
    orderDate: new Date(), orderNumber: '', nextDate: nextDate, actionAbstract: '',
  });
  // const [caseData, setCaseData] = useState({
  //   causeListEntries: {
  //     causeListEntry: {
  //       orderNumber: '',
  //       nextDate: Date,
  //       actionAbstract: '',
  //     }
  //   }
  // });
  const [caseId, setCaseId] = useState(null);

  // useEffect(() => {
  //   console.log(typeof cases);
  // }, []);

  const handleSubmit = async (e) => {
    console.log(caseData);
    // console.log(caseData);
    // // e.preventDefault();

    dispatch(updateCase(caseId, caseData));

  };

  useEffect(() => {
    if (caseId)
      handleSubmit();
  }, [caseData]);


  return (
    !cases.length ? <CircularProgress /> : (
      <TableContainer component={Paper}>
        <Table stickyHeader size='small' className={classes.table} aria-label="CauseList table">
          <TableHead>
            <TableRow>
              <TableCell>نمبر شمار</TableCell>
              <TableCell align="right">Case No</TableCell>
              <TableCell align="center">Institution</TableCell>
              <TableCell style={{ minWidth: 140 }} align="center">Title</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Previous Date</TableCell>
              <TableCell align="center">Order No</TableCell>
              <TableCell align="left">Next Date</TableCell>
              <TableCell style={{ minWidth: 140 }} align="center">Action Abstract</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseFile) => (
              <TableRow key={caseFile._id}>
                <TableCell component="th" scope="row">
                  {cases.indexOf(caseFile) + 1}
                </TableCell>
                <TableCell align="right">{caseFile["Case No"]}</TableCell>
                <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd-MM-yyy")}</TableCell>
                <TableCell align="center">{caseFile["Case Title"]}</TableCell>
                <TableCell align="center">Attendence</TableCell>
                <TableCell align="center">{format?.(parseISO(caseFile["Date of Institution "]), "dd-MM-yyy")}</TableCell>
                <TableCell align="center"><TextField name='Order No' variant='outlined' label='Order No' fullWidth value={caseData.orderNumber} onChange={(e) => { setCaseId(caseFile._id); setCurrentId(caseFile._id); setCaseData({ ...caseData, orderNumber: e.target.value }); }} /></TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                    <KeyboardDatePicker
                      // margin="normal"
                      id="date-picker-dialog"
                      label=""
                      format="dd/MM/yyyy"
                      value={caseData.nextDate}
                      onChange={(date) => { setCaseId(caseFile._id); setCurrentId(caseFile._id); setCaseData({ ...caseData, nextDate: date }); }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell align="center">
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">خلاصہ کارواءی</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={caseData.actionAbstract}
                      onChange={(e) => { setCaseId(caseFile._id); setCurrentId(caseFile._id); setCaseData({ ...caseData, actionAbstract: e.target.value }); }}
                      label="Select Sub Type"
                    >
                      <MenuItem value="">
                        <em>Mostly Used</em>
                      </MenuItem>
                      <MenuItem value={'حاضری'}>حاضری</MenuItem>
                      <MenuItem value={'بحث'}>بحث</MenuItem>
                      <MenuItem value={'شہادت'}>شہادت</MenuItem>
                      <MenuItem value={'حکم'}>حکم</MenuItem>
                      <MenuItem value="">
                        <em>All Categories</em>
                      </MenuItem>
                      <MenuItem value={'بحث بر اپیل'}>بحث بر اپیل</MenuItem>

                    </Select>

                  </FormControl>
                </TableCell>
                {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}


export default CauseList;

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
