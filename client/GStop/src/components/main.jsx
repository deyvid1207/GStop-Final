import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
 
 
import Heading from './Heading'
import Home from './Home'
import Footer from './Footer'

ReactDOM.createRoot(document.getElementById('root')).render(
 
<React.StrictMode>
  <Router> 
   <Heading/>
   </Router>
   <Home></Home>
   <Footer></Footer>
  </React.StrictMode>,
)
