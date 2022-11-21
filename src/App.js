import './App.css';
import Sidebar from "./component/ListForm/Sidebar";
import NotesForm from "./component/ListForm/NotesForm";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./firebase";
import {updateNote} from "./features/noteSlice";
import {Route, Routes} from "react-router-dom";
import TableNotesForm from "./component/TableForm/TableNotesForm";
import Header from "./component/ListForm/Header";


function App() {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const activeNote = useSelector(state => state.notesText.activeNote)
    const getActiveNote = () => notes.find(note => note.id === activeNote)

    useEffect(() => {
        getDocs(collection(db, 'notes'))
            .then(res => dispatch(updateNote(res.docs.map(el => ({...el.data(), id: el.id})))))
    }, [])

    return (
        <div className="App">
            <div className='container'>
                <Header/>
                <Routes>
                    <Route path="/" element={<NotesForm getActiveNote={getActiveNote()}/>}/>
                    <Route path="/appleNotes" element={<NotesForm getActiveNote={getActiveNote()}/>}/>
                    <Route path='/tableNotes' element={<TableNotesForm getActiveNote={getActiveNote()} />}/>
                </Routes>
            </div>
        </div>
    );

}

export default App;
