import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import { getPosts } from './actions/posts';
import { getCases } from './actions/cases';
import courtLogo from './images/courtLogo.png';
// import Posts from './components/Posts/Posts';
import Cases from './components/Cases/Cases';
// import Form from './components/Form/Form';
import FormCases from './components/Form/FormCases';
import makeStyles from './styles';

const App = () => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getCases());
    }, [currentId, dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">District Judiciary Dir Lower</Typography>
                <img className={classes.image} src={courtLogo} alt='District Judiciary Logo' height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            {/* <Posts setCurrentId={setCurrentId} /> */}
                            <Cases setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
                            <FormCases currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    )
}

export default App;