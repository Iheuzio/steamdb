import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from 'react';

import './index.css';
import Homepage from './components/main/Homepage';
import ErrorPage from './components/misc/route_not_found.js'
import SearchPage from './components/search/SearchPage';
import GameDetails from './components/detail/GameDetails.js';
import reportWebVitals from './reportWebVitals';

const router = createHashRouter([
  {
    path: '/', element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/search', element: <SearchPage />
  },
  {
    path: '/details', element: <GameDetails />
  }
]);

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
