import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//Este archivo index.tsx es el que conecta nuestro codigo realizazo con react al archivo index.html en la Carpeta Public. 
// La acual sera accesible por nginx atravez del build generado 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
