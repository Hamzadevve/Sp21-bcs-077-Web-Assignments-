import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const navigate = useNavigate();
    const [credentials , setCredentials] = useState({name: "" , email: "" , password: ""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name  , email: credentials.email , password: credentials.password})
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token' , json.token);
            navigate("/");
          }else{
            alert("Invalid Credentials")
          }
    }

    const handleChange = (e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    return (
      <div className='my-3 container'>
      <h2 className='my-3'> Sign Up </h2>
        <form className='my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="upname" className="form-label">Name</label>
                <input type="text" className="form-control" id="upname" aria-describedby="emailHelp" name='name' onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="upemail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="upemail" aria-describedby="emailHelp" name='email' onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="uppassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="uppassword" name='password' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-info fw-bold">Sign Up</button>
        </form>
      </div>
    )
}
