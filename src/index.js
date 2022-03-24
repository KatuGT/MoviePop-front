import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Paginas/Home/Home';

ReactDOM.render(
  <BrowserRouter>
      <Routes path="/" element={<App />}>
        <Route index element={ <Home/>}/>
      </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);

