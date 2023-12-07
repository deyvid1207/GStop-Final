import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
 
import { UserProvider } from '../utils/UserContext.jsx';
 
import App from './App'
import Footer from './Home/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 
<React.StrictMode>
<UserProvider>
   <App></App>
 
 
   <Footer></Footer>
   </UserProvider>
   </React.StrictMode>
  ,
)
