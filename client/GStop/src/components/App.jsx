import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Heading from './Heading';
import Login from './Login';
import Register from './Register';
import Shop from './Shop';
import AddGame from './AddGame';
 
 

const App = () => {
 return (
    <BrowserRouter> <>   
    <Heading></Heading>
 
       <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/shop"element={<Shop/>}></Route> 
          <Route exact path="/register"element={<Register/>}></Route>
          <Route exact path="/addGame"element={<AddGame/>}></Route>
       
           <Route exact path="/login"element={<Login/>}></Route>
 
       </Routes>
        
    </>
    </BrowserRouter>
 );
};

export default App;