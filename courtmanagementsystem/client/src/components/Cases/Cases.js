import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Case from './Case/Case';
import makeStyles from './styles';
import useStyles2 from '../../dashboardExample/dashboard';
import Container from '@material-ui/core/Container';

const Cases = ({ setCurrentId }) => {
    const classes = makeStyles();
    const classes2 = useStyles2();
    const cases = useSelector((state) => state.cases);

    // console.log(cases);
    // console.log(cases[0]["Date of Institution "]);

    return (
        !cases.length ? <CircularProgress /> : (
            <React.Fragment>
                <Grid className={classes.mainContainer} container alignItems='stretch' spacing={2}>
                    {cases.map((caseFile) => (
                        <Grid item key={caseFile._id} xs={12} sm={6}>
                            <Case caseFile={caseFile} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    );
}

export default Cases;