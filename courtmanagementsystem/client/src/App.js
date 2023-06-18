import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  CssBaseline,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

// import { getPosts } from './actions/posts';
import { getCases } from "./actions/cases";
import { getEmployeeData } from "./actions/employeeData.js";
import courtLogo from "./images/courtLogo.png";
// import Posts from './components/Posts/Posts';
import Cases from "./components/Cases/Cases";
// import CauseList from './components/CauseLists/CauseList';
// import Form from './components/Form/Form';
import makeStyles from "./styles";
import Dashboard from "./dashboardExample/Dashboard.jsx";
import SimpleDrawer from "./dashboardExample/SimpleDrawer.jsx";
import CauseList from "./components/CauseLists/CauseList.jsx";
import FormCases from "./components/Form/FormCases";
import FormEmployeeData from "./components/Form/FormEmployeeData";
import EmployeeListTable from "./components/Form/EmployeeListTable.jsx";
import CasesListTable from "./components/Form/CasesListTable.jsx";
import PrintDataTable from "./components/Form/PrintDataTable.jsx";
import CourtList from "./screens/CourtsScreen";
import CourtPage from "./screens/CourtPage";

import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import useStyles from "./dashboardExample/dashboard";
import Error404Screen from "./screens/Error404Screen";
import { ThemeProvider } from "@material-ui/core/styles";
import { dayTheme, nightTheme } from "./theme";

const App = () => {
  const classes = makeStyles();
  const classes2 = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const handlePageChange = (title) => {
    setPageTitle(title);
  };

  useEffect(() => {
    dispatch(getEmployeeData());
    dispatch(getCases());
  }, [currentId, dispatch]);

  const [themeMode, setThemeMode] = useState("night"); // 'day' or 'night'
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "day" ? "night" : "day"));
  };

  return (
    <ThemeProvider theme={themeMode === "day" ? dayTheme : nightTheme}>
      <Router>
        {/* <div className={classes2.root} style={{ backgroundColor: 'aliceblue' }}> */}
        <div className={classes2.root}>
          <CssBaseline />
          <SimpleDrawer
            title={pageTitle}
            toggleThemeMode={toggleThemeMode}
            themeMode={themeMode}
          />
          <main className={classes2.content}>
            <div className={classes2.appBarSpacer} />
            <Container maxWidth="lg" className={classes2.container}>
              <Switch>
                <Route
                  path="/"
                  exact
                  children=<Dashboard onPageChange={handlePageChange} />
                />
                <Route
                  path="/FormCases"
                  children=<FormCases
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/CauseLists"
                  children=<CauseList
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/Cases"
                  children=<Cases
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/FormEmployeeData"
                  children=<FormEmployeeData
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/EmployeeListTable"
                  children=<EmployeeListTable
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/CasesListTable"
                  children=<CasesListTable
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route
                  path="/CourtList"
                  children=<CourtList
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onPageChange={handlePageChange}
                  />
                />
                <Route path="/court/:courtId" component={CourtPage} />
                <Route path="/PrintDataTable" component={PrintDataTable} />

                <Route path="*">
                  <Error404Screen />
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};
export default App;

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
// <Container maxWidth="lg">
// {/* <AppBar className={classes.appBar} position="static" color="inherit">
//             <Typography className={classes.heading} variant="h3" align="center">District Judiciary Dir Lower</Typography>
//             <img className={classes.image} src={courtLogo} alt='District Judiciary Logo' height="60" />
//         </AppBar> */}
// {/* <Grow in> */ }
// {/* <Container> */ }
// {/* <Grid container justify="space-between" className={classes.mainContainer} alignItems='stretch' spacing={1}> */ }
// {/* <Grid item xs={12} sm={7}> */ }
// {/* <Cases setCurrentId={setCurrentId} /> */ }
// {/* </Grid> */ }
// {/* <Grid item xs={12} sm={4} > */ }
// {/* <FormCases currentId={currentId} setCurrentId={setCurrentId} /> */ }
// {/* </Grid> */ }
// {/* </Grid> */ }
// {/* </Container> */ }
// {/* </Grow> */ }

// </Container>
// );

//<Grid item xs={12} sm={7}>

// <Posts setCurrentId={setCurrentId} />
// <Form currentId={currentId} setCurrentId={setCurrentId} />
// <CauseList currentId={currentId} setCurrentId={setCurrentId} />
