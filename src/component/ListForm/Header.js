import style from "./Header.module.css";
import {addNote, updateNote} from "../../features/noteSlice";
import {useDispatch, useSelector} from "react-redux";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase";
import {NavLink} from "react-router-dom";
import {setDoubleClick, setSearch} from "../../features/addNoteSlice";

const Header = () => {
    const dispatch = useDispatch()
    const notes = [...useSelector(state => state.notes.notes)]
    const activeNote = useSelector(state => state.notesText.activeNote)
    const doubleClick = useSelector(state => state.notesText.doubleCLick)

    const onDeleteNote = (deleteId) => {
        dispatch(updateNote(notes.filter(note => note.id !== deleteId)))
        deleteDoc(doc(db, 'notes', deleteId))
    }
    return (
        <div className={style.container}>
            <div className={style.headerLeft}>
                <div className={style.headerLeft2}>
                    <NavLink to='/appleNotes/'
                             onClick={() => dispatch(setDoubleClick(false))}
                             className={({isActive}) => (!isActive ? style.listIcon : style.listIconActive)}
                    ></NavLink>
                    <NavLink to='/tableNotes'
                             className={({isActive}) => (!isActive ? style.tableIcon : style.tableIconActive)}
                    ></NavLink>
                </div>
                <div className={doubleClick ? style.headerLeftArrow : ''}
                     onClick={() => dispatch(setDoubleClick(false))}>
                </div>
                <div className={style.headerLeft3}>
                    <div className={style.deleteIcon} onClick={() => onDeleteNote(activeNote)}></div>
                </div>
            </div>
            <div className={style.headerRight}>
                <h1 onClick={() => dispatch(addNote())} className={style.addNoteIcon}></h1>
                <div style={{position: "relative"}}>
                    <div className={style.searchIcon}></div>
                    <input
                        type={'search'}
                        placeholder={"Пошук"}
                        // onChange={e => setSearch(e.target.value)}
                        onChange={e => dispatch(setSearch(e.target.value))}
                    />
                </div>
            </div>
        </div>
    )
}
export default Header