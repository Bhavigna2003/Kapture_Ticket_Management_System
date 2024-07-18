import './App.css';
import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {store, persistor} from './components/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {


 return(


  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </PersistGate>
  </Provider>

  );
}

export default App;
