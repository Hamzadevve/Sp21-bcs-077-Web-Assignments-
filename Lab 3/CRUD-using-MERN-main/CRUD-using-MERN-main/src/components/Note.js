import React, { useEffect , useState , useRef } from "react";
import NoteItem from "./NoteItem";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";
import AddNote from "./AddNote";

export default function Note() {
  const context = useContext(notesContext);
  const { notes , fetchAllNotes , editNote} = context;

  useEffect(()=>{
    fetchAllNotes();
    // eslint-disable-next-line
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e)=>{
    refClose.current.click();
    e.preventDefault();
    editNote(note.id , note.etitle , note.edescription , note.etags);
}

const updateNote = (currentNote)=>{
  ref.current.click();
  setNote({id: currentNote._id , etitle: currentNote.title , edescription: currentNote.description , etags: currentNote.tags});
}

const handleChange = (e)=>{
    setNote({
        ...note,
        [e.target.name]: e.target.value
    })
}

const [note , setNote] = useState({id : "" , etitle: "" , edescription: "" , etags: ""});
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Your Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form action="" className="container">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Note Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Note Description</label>
          <textarea className="form-control" id="edescription" rows="3" name="edescription" value={note.edescription} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="etags" className="form-label">Note Tag</label>
          <input type="text" className="form-control" id="etags" name="etags" value={note.etags} onChange={handleChange}/>
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className="my-3">Your Notes</h1>
      <div className="container my-3 d-flex flex-wrap justify-content-start">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <NoteItem note={note} updateNote={updateNote}/>
            </div>
          );
        })}
      </div>
    </>
  );
}
