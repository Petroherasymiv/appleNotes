import style from './NotesForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {searchNotes, updateNote} from "../../features/noteSlice";
import {useEffect, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useDebounce} from "../hooks/debounced";
import SideBar from "./Sidebar";


const NotesForm = ({getActiveNote}) => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const activeNote = useSelector(state => state.notesText.activeNote)
    const [value, setValue] = useState('')
    const debounced = useDebounce(value)
    const search = useSelector(state => state.notesText.search)


    const onUpdateNote = (upDateNote) => {
        const onUpdateNotesArray = notes.map(note => {
            if (note.id === activeNote) {
                return upDateNote
            }
            return note
        })
        dispatch(updateNote(onUpdateNotesArray))
    }

    const onEditField = (key, value) => {
        onUpdateNote({
            ...getActiveNote,
            [key]: value,
            lastModified: Date.now()
        })

    }
    useEffect(() => {
        dispatch(searchNotes(search))
    }, [search])

    useEffect(() => {
        if (getActiveNote) {
            updateDoc(doc(db, 'notes', activeNote), {
                title: getActiveNote.title,
                body: getActiveNote.body,
                lastModified: Date.now(),
            })
        }
    }, [debounced])

    // notes.map(note => {
    //     if (note.title.length === 0 && note.body.length === 0)
    //         deleteDoc(doc(db, 'notes', note.id))
    // })

    if (!getActiveNote) {
        return (
            <>
                <div className={style.container}>
                    <SideBar/>
                    <div className={style.NoNotes}>
                        <h1>No Notes</h1>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={style.container}>
                <SideBar/>
                <div className={style.notesForm}>
                    <div
                        className={style.clock}>{new Date(getActiveNote.lastModified).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        year: '2-digit',
                        month: '2-digit'
                    })}{'  '}
                    </div>
                    <div>
                        <input onChange={e => {
                            onEditField('title', e.target.value)
                            setValue(e.target.value)
                        }}
                               placeholder={'Write your title here...'}
                               value={getActiveNote.title}
                               type={"text"}
                               id='title'
                               autoFocus
                        />
                    </div>
                    <div>
            <textarea id='body'
                      onChange={(e) => {
                          onEditField('body', e.target.value)
                          setValue(e.target.value)
                      }}
                      placeholder={'Write your note here...'}
                      value={getActiveNote.body}>
            </textarea>
                    </div>
                </div>

            </div>
        </>
    )
}
export default NotesForm