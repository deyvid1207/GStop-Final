import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import Heading from './Home/Heading.jsx';
import Login from './User/Login.jsx';
import Register from './User/Register.jsx';
import Shop from './Shop/Shop.jsx';
import AddGame from './Admin/AddGame.jsx';
import Details from './Game/Details.jsx';
import Edit from './Admin/Edit.jsx';
import Delete from './Admin/Deleted.jsx';
 

const App = () => {
 return (
    <BrowserRouter> <>   
    <Heading></Heading>
 
       <Routes>
          <Route exact path="/"  element={<Home/>}></Route>
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