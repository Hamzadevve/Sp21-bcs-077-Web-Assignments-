import React , {useState} from 'react'

export default function Login() {
    const [credentials , setCredentials] = useState({email: "" , password: ""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email , password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
    }

    const handleChange = (e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className='my-3 container'>
        <h2 className='my-3'> Log In </h2>
        <form className='my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-info fw-bold ">Log In</button>
        </form>
    </div>
  )
}
