import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import VaccineSlice from './Redux/Redux-toolkit/VaccineSlice';
import {Provider} from 'react-redux'
import mySaga from '@redux-saga/core'
import { fetchDataSaga } from './Redux/Redux-saga/fetchDataSaga';
import editVaccineslice from './Redux/Redux-toolkit/editVaccineslice';

const sagaMiddleware = mySaga()

const store = configureStore({
  reducer:{
    vaccine:VaccineSlice,
    editData:editVaccineslice
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    thunk:false
  }).concat(sagaMiddleware)
})

sagaMiddleware.run(fetchDataSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

