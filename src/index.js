import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { MoralisProvider } from "react-moralis";
import App from './App'
import './index.css'

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <App />
      </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>
)