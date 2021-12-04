import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM, { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes, HashRouter, Link, Redirect } from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import Search from './components/Search';
import AcademicTable from './components/Tables/AcademicTable';
import ArticleTable from './components/Tables/ArticleTable';
import ContactTable from './components/Tables/ContactTable';
import DetailTable from './components/Tables/DetailTable';
import EmployTable from './components/Tables/EmployTable';
import NotiTable from './components/Tables/NotiTable';

ReactDOM.render((
<Router basename="/">
    <Routes>
        <Route path = "/" element={ <Home/>} />
        <Route path = "/search" element={ <Search/>} />
        <Route path = "/academictable" element={ <AcademicTable/>} />
        <Route path = "/articletable" element={ <ArticleTable/>} />
        <Route path = "/contacttable" element={ <ContactTable/>} />
        <Route path = "/detailtable" element={ <DetailTable/>} />
        <Route path = "/employtable" element={ <EmployTable/>} />
        <Route path = "/notitable" element={ <NotiTable/>} />
      </Routes>
  </Router>),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
