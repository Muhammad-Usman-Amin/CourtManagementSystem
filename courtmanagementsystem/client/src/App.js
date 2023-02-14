import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import courtLogo from './images/courtLogo.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import makeStyles from './styles';

const App = () => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">District Judiciary Dir Lower</Typography>
                <img className={classes.image} src={courtLogo} alt='District Judiciary Logo' height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7} >
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    )
}

export default App;