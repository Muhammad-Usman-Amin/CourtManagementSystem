import React from 'react';
import { TextField, Button, Box, IconButton } from '@material-ui/core';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { Formik, Field, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';

import DateFnsUtils from '@date-io/date-fns';
const FormEmployeeDatac = () => {
    const initialValues = {
        children: [{ name: '', dob: null, age: '' }],
    };

    const handleSubmit = (values) => {
        // Save the form data to the database here
        console.log(values.children);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <FieldArray name="children">
                        {({ push, remove }) => (
                            <>
                                {values.children.map((child, index) => (
                                    <Box key={index} marginBottom={2} display="flex">
                                        <Field
                                            as={TextField}
                                            variant='outlined'
                                            label={`Child ${index + 1} Name`}
                                            name={`children[${index}].name`}
                                            fullWidth
                                        />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                                            {/* <KeyboardDatePicker
                                                onChange={handleChange}
                                                id="date-picker-inline"
                                                // id="date-picker-dialog"
                                                label={`Child ${index + 1} Date of Birth`}
                                                format="dd/MM/yyyy"
                                                name={`children[${index}].dob`}
                                            /> */}

                                            <KeyboardDatePicker
                                                label={`Child ${index + 1} Date of Birth`}
                                                value={child.dob}
                                                format="dd/MM/yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(`children[${index}].dob`, date)
                                                }
                                                fullWidth
                                            />
                                        </MuiPickersUtilsProvider>
                                        <Field
                                            as={TextField}
                                            label={`Child ${index + 1} Age`}
                                            name={`children[${index}].age`}
                                            fullWidth
                                        />
                                        <IconButton onClick={() => remove(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => push({ name: '', dob: null, age: '' })}
                                    fullWidth
                                >
                                    Add Child
                                </Button>
                            </>
                        )}
                    </FieldArray>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default FormEmployeeDatac;
