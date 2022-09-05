import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './component/Register/index';
import Login from './component/Login/index';
import AddProfile from './component/Employee/AddProfile/index';
import ViewProfile from './component/Employee/ViewProfile';
import AdminPortal from './component/Admin/AdminPortal';
import { Header, Sidebar } from './common';

function App() {

  return (
      <>
      {/* <Header /> */}
      {/* <Sidebar /> */}
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/profile" element={<AddProfile />} />
                  <Route exact path="/admin" element={<AdminPortal />} />
                  <Route exact path="/view" element={<ViewProfile />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
