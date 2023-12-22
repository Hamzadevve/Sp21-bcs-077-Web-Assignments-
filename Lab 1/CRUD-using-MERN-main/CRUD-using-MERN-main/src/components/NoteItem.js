import React, { useContext } from "react";
import notesContext from "../context/notes/notesContext";

export default function NoteItem(props) {
  const context = useContext(notesContext);
  const { deleteNote } = context;

  const hancleDelete = () => {
    if (window.confirm("Are You Sure?")) {
      deleteNote(props.note._id);
    }
  };


  return (
    <>

      <div>
        <div className="card mx-3 my-3">
          <div className="card-body" style={{ width: "18rem" }}>
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{props.note.title}</h5>
              <div className="icons">
                <i
                  className="fa-solid fa-trash mx-1"
                  onClick={hancleDelete}
                ></i>
                <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{props.updateNote(props.note)}}></i>
              </div>
            </div>
            <p className="card-text">{props.note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
