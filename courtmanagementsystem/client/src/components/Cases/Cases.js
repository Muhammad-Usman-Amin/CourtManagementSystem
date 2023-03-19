import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Case from './Case/Case';
import makeStyles from './styles';

const Cases = ({ setCurrentId }) => {
    const classes = makeStyles();
    const cases = useSelector((state) => state.cases);

    // console.log(cases);

    return (
        !cases.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={2}>
                {cases.map((caseFile) => (
                    <Grid item key={caseFile._id} xs={12} sm={6}>
                        <Case caseFile={caseFile} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Cases;