import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {articleApi} from "./config/articleSlice";

const appStore = configureStore({
  reducer:{
      //  computed property , we can dynamically set value
      [articleApi.reducerPath]: articleApi.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={appStore}>
          <App />
      </Provider>

  </React.StrictMode>
);


