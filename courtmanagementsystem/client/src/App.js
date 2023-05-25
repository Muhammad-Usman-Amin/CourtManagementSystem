import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import { getPosts } from './actions/posts';
import { getCases } from './actions/cases';
import courtLogo from './images/courtLogo.png';
// import Posts from './components/Posts/Posts';
import Cases from './components/Cases/Cases';
// import CauseList from './components/CauseLists/CauseList';
// import Form from './components/Form/Form';
import makeStyles from './styles';
import Dashboard from './dashboardExample/Dashboard.jsx';
import SimpleDrawer from './dashboardExample/SimpleDrawer.jsx';
import CauseList from './components/CauseLists/CauseList.jsx';
import FormCases from './components/Form/FormCases';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const App = () => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getCases());
    }, [currentId, dispatch])

    return (
        <Router>
            <div style={{ display: "flex" }}>
                <SimpleDrawer />
                <div style={{ flex: 1, padding: "10px", marginTop: 55, }}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            children=<Dashboard />
                        />
                        <Route
                            path="/FormCases"
                            children=<FormCases currentId={currentId} setCurrentId={setCurrentId} />
                        />
                        <Route
                            path="/CauseLists"
                            children=<CauseList currentId={currentId} setCurrentId={setCurrentId} />
                        />
                        <Route
                            path="/Cases"
                            children=<Cases setCurrentId={setCurrentId} />
                        />
                    </Switch>
                </div>
            </div>
        </Router>
        // <Router>
        //     <Switch>
        //         {/* <Route exact path="/">
        //             <Dashboard setCurrentId={setCurrentId} />
        //         </Route> */}
        //         <Route path="/CauseLists">
        //             <Cases setCurrentId={setCurrentId} />
        //             {/* <CauseList currentId={currentId} setCurrentId={setCurrentId} /> */}
        //         </Route>
        //     </Switch>
        // </Router>
    );
    // <Container maxWidth="lg">
    {/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">District Judiciary Dir Lower</Typography>
                <img className={classes.image} src={courtLogo} alt='District Judiciary Logo' height="60" />
            </AppBar> */}
    {/* <Grow in> */ }
    {/* <Container> */ }
    {/* <Grid container justify="space-between" className={classes.mainContainer} alignItems='stretch' spacing={1}> */ }
    {/* <Grid item xs={12} sm={7}> */ }
    {/* <Cases setCurrentId={setCurrentId} /> */ }
    {/* </Grid> */ }
    {/* <Grid item xs={12} sm={4} > */ }
    {/* <FormCases currentId={currentId} setCurrentId={setCurrentId} /> */ }
    {/* </Grid> */ }
    {/* </Grid> */ }
    {/* </Container> */ }
    {/* </Grow> */ }

    // </Container>
    // );
}

export default App;

//<Grid item xs={12} sm={7}>

// <Posts setCurrentId={setCurrentId} />
// <Form currentId={currentId} setCurrentId={setCurrentId} />
// <CauseList currentId={currentId} setCurrentId={setCurrentId} />