import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import CauseLists from './routes/CauseLists';
import ErrorPage from './components/error-page';
import LoginForm from './routes/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: '/CauseLists/',
    //     element: <CauseLists />,
    //   },
    // ],
  },
  {
    path: '/CauseLists/',
    element: <CauseLists />,
  },
  {
    path: '/LoginForm/',
    element: <LoginForm />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
