import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const shincodeinfo: any = {
  name: "shincode",
  age: 24,
};

const ShincodeContext = createContext(shincodeinfo);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ShincodeContext.Provider value={shincodeinfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ShincodeContext.Provider>
)

export default ShincodeContext;
