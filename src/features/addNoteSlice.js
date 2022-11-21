import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeNote: false,
    search: '',
    doubleCLick:false,
}
export const addNoteSlice = createSlice({
    name: 'notesText',
    initialState,
    reducers: {
        setActiveNote: (state, action) => {
            state.activeNote = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setDoubleClick: (state, action) => {
            state.doubleCLick = action.payload
        }
    }
})


export const {setActiveNote, setSearch, setDoubleClick} = addNoteSlice.actions
export default addNoteSlice.reducer