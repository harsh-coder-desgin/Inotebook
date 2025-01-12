import React,{useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote]= useState({title:"",description:"",tag:""})
    const handleClick =(e)=>{
        e.preventDefault();
          // addnote(note.title, note.description, note.tag); // Pass individual properties
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("ADD","success");


    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})

    }
  return (
    <div>
      <div className="container">
    <h2>Add Note</h2>
    <div>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
  </div>
  <button  disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
</form>
    </div>
    </div>
    </div>
  )
}

export default Addnote



// const [note,setNote]= useState({title:"",description:"",tag:""})
// const handleClick = (e) => {
//   e.preventDefault();
//   addnote(note.title, note.description, note.tag); // Pass individual properties
// };

