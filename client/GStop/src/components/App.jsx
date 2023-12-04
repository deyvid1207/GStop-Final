import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Heading from './Heading';
import Login from './Login';
import Register from './Register';
import Shop from './Shop';
import AddGame from './AddGame';
import Details from './Details';
import Edit from './Edit';
import Delete from './Deleted';
 

const App = () => {
 return (
    <BrowserRouter> <>   
    <Heading></Heading>
 
       <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/shop"element={<Shop/>}></Route> 
          <Route exact path="/register"element={<Register/>}></Route>
          <Route exact path="/addGame"element={<AddGame/>}></Route>
          <Route exact path="/details"element={<Details/>}></Route>
          <Route exact path="/edit"element={<Edit/>}></Route>
          <Route exact path="/deleteConfirm"element={<Delete/>}></Route>          
           <Route exact path="/login"element={<Login/>}></Route>
 
       </Routes>
        
    </>
    </BrowserRouter>
 );
};

export default App;