import React , {useState , useContext} from "react";
import notesContext from "../context/notes/notesContext";


export default function AddNote() {
    const context = useContext(notesContext);
    const {addNote} = context;


    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({title: "" , description: ""  , tag: ""});
    }

    const handleChange = (e)=>{
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const [note , setNote] = useState({title: "" , description: ""  , tag: ""});
  return (
    <>
      <h1 className="my-3">Add a Note</h1>
      <form action="" className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Note Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} required minLength={3} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Note Description</label>
          <textarea className="form-control" id="description" rows="3" name="description" required minLength={5} value={note.description} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Note Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={handleChange}/>
        </div>
        <button disabled={note.title.length === 0 || note.description.length === 0} className="btn btn-info my-3" onClick={handleClick}>Submit</button>
      </form>
    </>
  );
}
