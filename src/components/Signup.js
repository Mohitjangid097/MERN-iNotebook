import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate   = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("https://inotebook-4m5m.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/')
            props.showAlert("Account Created Successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label hmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label hmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label hmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label hmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLenght={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup