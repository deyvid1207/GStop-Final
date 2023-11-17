import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
 
import { UserProvider } from '../UserContext.jsx';
import Heading from './Heading'
import Home from './Home'
import App from './App'
import Footer from './Footer'

ReactDOM.createRoot(document.getElementById('root')).render(
 
<React.StrictMode>
<UserProvider>
   <App></App>
 
 
   <Footer></Footer>
   </UserProvider>
   </React.StrictMode>
  ,
)
