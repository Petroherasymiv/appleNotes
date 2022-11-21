import style from "./HeaderTableBar.module.css";
import {setActiveNote, setDoubleClick} from "../../features/addNoteSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {searchNotes} from "../../features/noteSlice";

const TableNotesForm = ({getActiveNote}) => {
    const dispatch = useDispatch()
    const activeNote = useSelector(state => state.notesText.activeNote)
    const filteredUsers = useSelector(state => state.notes.filteredUsers);
    const search = useSelector(state => state.notesText.search)
    const doubleClick = useSelector(state => state.notesText.doubleCLick)

    useEffect(() => {
        dispatch(searchNotes(search))
    }, [search])


    if (!doubleClick) {
        return (
            <div className={style.container}>
                <div className={style.boxContainer}>
                    {filteredUsers?.map(note => (
                        <div key={note.id} className={style.box}>
                            <div
                                className={`${note.id === activeNote ? style.active : style.noteStyle}`}
                                onDoubleClick={() => dispatch(setDoubleClick(true))}
                                onClick={() => {
                                    dispatch(setActiveNote(note.id))
                                }}>
                                <span className={style.body}>{note.body && note.body.substr(0, 90)}</span>
                            </div>
                            <div className={style.boxTitle}>
                                {note.title && note.title.substr(0, 15) + '...'}
                                {note.title.length > 0 ? '' : 'Нова нотатка'}
                            </div>
                            <div className={style.boxData}>
                                {new Date(note.lastModified).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}{'  '}
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
    {
        return (
            <div className={style.container}>
                <div
                    className={style.clock}>{new Date(getActiveNote.lastModified).toLocaleTimeString(navigator.language, {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    year: '2-digit',
                    month: '2-digit'
                })}{'  '}
                </div>
                <div className={style.openBox}>
                    <strong>
                        {getActiveNote.title}
                    </strong>
                    <div>
                        <br/>
                        {getActiveNote.body}
                    </div>
                </div>
            </div>

        )
    }

}
export default TableNotesForm