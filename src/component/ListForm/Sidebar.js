import style from './SideBar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setActiveNote} from "../../features/addNoteSlice";

const SideBar = () => {
    const dispatch = useDispatch()
    const activeNote = useSelector(state => state.notesText.activeNote)
    const filteredUsers = useSelector(state => state.notes.filteredUsers);

    return (
        <div className={style.container}>
            <div className={style.notesStyle}>
                {filteredUsers?.map(note => (
                    <div key={note.id}
                         className={`${note.id === activeNote ? style.active : style.noteStyle}`}
                         onClick={() => {
                             dispatch(setActiveNote(note.id))
                         }}>
                        <strong>
                            {note.title && note.title.substr(0, 30)}
                            {note.title.length > 0 ? '' : 'Нова нотатка'}
                        </strong>
                        <br/>
                        <b>{new Date(note.lastModified).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</b>{'  '}
                        <span>{note.body && note.body.substr(0, 23) + '...'}</span>
                    </div>

                ))
                }

            </div>

        </div>
    )
}
export default SideBar