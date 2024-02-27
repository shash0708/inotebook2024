import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup'
function App() {

 const [alert,setAlert] = useState(null); 
 const  showAlert = (message,type) =>{
 
   setAlert({
    msg: message,
    type:type
   })
   setTimeout(()=>{
    setAlert(null);
   },1500);
}

  return (
    <> 
    <NoteState>
       <Router>
      <div className="App">
        <Navbar />
        <Alert alert={alert}/>

        <Routes>
          <Route exact path="/" showAlert={showAlert} element={<Home />} />
          <Route exact path="/about" showAlert={showAlert} element={<About />} />
          <Route exact path="/login" showAlert={showAlert} element={<Login />} />
          <Route exact path="/signup" showAlert={showAlert}  element={<Signup />} />
        </Routes>
      </div>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
