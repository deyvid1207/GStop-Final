import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Heading from './Heading';
import Register from './Register';
 

const App = () => {
 return (
    <BrowserRouter> <>   
    <Heading></Heading>
 
       <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          {/*<Route exact path="/games"><Games/></Route> */}
          <Route exact path="/register"element={<Register/>}></Route>
           {/*<Route exact path="/login"><Login/></Route>*/}
 
       </Routes>
        
    </>
    </BrowserRouter>
 );
};

export default App;