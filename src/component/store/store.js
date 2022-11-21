import {configureStore} from "@reduxjs/toolkit";
import {noteSlice} from "../../features/noteSlice";
import {addNoteSlice} from "../../features/addNoteSlice";

export const store = configureStore({
    reducer:{
        notesText:addNoteSlice.reducer,
        notes: noteSlice.reducer,
    },
})