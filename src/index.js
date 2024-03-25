import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from './routermanager';

//import './index.css';

// ----oldd synex ----ReactDOM.render(<h1> </h1> , document.getElementById('root'))

const container = ReactDOM.createRoot(document.getElementById('root'))
container.render(<><AppRouter /></>)
//container.render(<Header/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

