import notesContext from "./notesContext";
import { useState } from "react";

const NotesState = (props)=>{

  const host = "http://localhost:5000";

  const fetchAllNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/getnotes`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlM2ViMGQzM2I5OGNhYWQyYzg5YjI4In0sImlhdCI6MTY3NTk2NzQxNX0.-tyru0W3ycdi-spJrVlq_yMojgy6Chyvi5kcodc_Klc'
      }
    });
    const json = await response.json();
    setNotes(json);
  }


    const addNote = async (title , description , tags)=>{

      const response = await fetch(`${host}/api/notes/addnotes` , {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlM2ViMGQzM2I5OGNhYWQyYzg5YjI4In0sImlhdCI6MTY3NTk2NzQxNX0.-tyru0W3ycdi-spJrVlq_yMojgy6Chyvi5kcodc_Klc'
        },
        body: JSON.stringify({title , description , tags})
      });

      const json = await response.json();
      setNotes(notes.concat(json));
    }

    const deleteNote = async (id)=>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlM2ViMGQzM2I5OGNhYWQyYzg5YjI4In0sImlhdCI6MTY3NTk2NzQxNX0.-tyru0W3ycdi-spJrVlq_yMojgy6Chyvi5kcodc_Klc'
        }
      });

      const json = await response.json();
      console.log(json);

      let newNotes = notes.filter((notes)=>{
        return notes._id !== id;
      })
      setNotes(newNotes);
    }

    const editNote = async (id , title , description , tags)=>{
      await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlM2ViMGQzM2I5OGNhYWQyYzg5YjI4In0sImlhdCI6MTY3NTk2NzQxNX0.-tyru0W3ycdi-spJrVlq_yMojgy6Chyvi5kcodc_Klc'
        },
        body: JSON.stringify({title , description , tags})
      });

      let newNotes = JSON.parse(JSON.stringify(notes));
      for(let i=0;i<newNotes.length;i++){
        let element = newNotes[i];
        if(element._id === id){
          newNotes.title = title;
          newNotes.description = description;
          newNotes.tags = tags;
          break;
        }
      }
      setNotes(newNotes);
      fetchAllNotes();
    }



    const [notes , setNotes] = useState([]);

    return(
        <notesContext.Provider value={{notes , addNote , deleteNote , fetchAllNotes , editNote}}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;