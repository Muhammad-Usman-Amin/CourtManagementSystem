// import logo from './logo.svg';
// import Navbar from './components/Navbar'; //no need for .js extension (figure out itselt)
import Navbar from './components/NavBar';
import { BrowserRouter as Router} from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          {/* <Switch>
              <Route exact path = "/">
                <Home />
              </Route>
              <Route path = "/create">
                <Create />
              </Route>
              <Route path = "/blogs/:id">
                <BlogDetails />
              </Route>
              <Route path = "*" >
                <NotFoundPage />
              </Route>
            </Switch> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
