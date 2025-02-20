import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer} from "react-toastify";
import ContextProvider from './Context/ContextProvider.jsx';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <ToastContainer />
      <App />
    </ContextProvider>
  </StrictMode>
);
