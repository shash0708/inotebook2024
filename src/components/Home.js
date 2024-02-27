import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import AddNote from './AddNote';
const Home =(props)=> {

    const context = useContext(noteContext);
    const {notes,setNotes} = context;

    const {showAlert} = props;
  return (
    <div  className='container my-3'>
  <AddNote/>
<Notes showAlert={showAlert}/>  
    </div>
  )
}

export default Home
