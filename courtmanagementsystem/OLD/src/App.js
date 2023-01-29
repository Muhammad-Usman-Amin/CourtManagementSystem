// import logo from './logo.svg';
// import Navbar from './components/Navbar'; //no need for .js extension (figure out itselt)
import Navbar from './components/NavBar';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter, RouterProvider, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import causeLists from './routes/causeLists';
import Home from './routes/Root';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/causeLists" component={causeLists} />
            <Route path="/" component={Home} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
