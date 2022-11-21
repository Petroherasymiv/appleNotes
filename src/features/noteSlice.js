import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {v4} from "uuid";
import {addDoc, collection, getDocs, doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {setActiveNote} from "./addNoteSlice";


const initialState = {
    notes: [],
    filteredUsers: []
}
export const addNote = createAsyncThunk('notes/addNote', async (_, {dispatch}) => {
    const note = {
        id: v4(),
        title: '',
        body: '',
        lastModified: Date.now(),
    }
    await addDoc(collection(db, 'notes'), note)
    // await dispatch(addNotes(note))
    await getDocs(collection(db, 'notes'))
        .then(res => dispatch(updateNote(res.docs.map(el => ({...el.data(), id: el.id})))))
    await dispatch(setActiveNote(note.id))
})

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.notes.push(action.payload)
        },
        updateNote: (state, action) => {
            state.notes = action.payload
            state.filteredUsers = action.payload
            state.notes.sort((a, b) => b.lastModified - a.lastModified)
        },
        searchNotes: (state, action) => {
            const filteredUsers = state.notes.filter(note =>
                note.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                note.body.toLowerCase().includes(action.payload.toLowerCase())
            )
            return {
                ...state,
                filteredUsers:
                    action.payload.length > 0 ? filteredUsers : [...state.notes]
            };
        }
    },
    extraReducers: {
        [addNote.fulfilled]: () => console.log('fulfilled'),
        [addNote.pending]: () => console.log('pending'),
        [addNote.rejected]: () => console.log('rejected'),
    }
})

export const {addNotes, updateNote, searchNotes} = noteSlice.actions
export default noteSlice.reducer