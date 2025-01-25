import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




export default function Register() {
    let [user, setUser] = useState({
        "name": " ",
        "email": " ",
        "age": " ",
        "password": " ",
        "cPassword":" ",
        "role":"admin"
    })
    let [errorApi, setError] = useState({})
    let [loading, setLoading] = useState(false)
    let [showError, setShowError] = useState(false);

    let navigate = useNavigate();

    
    function getData(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    async function signUp(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const {data} = await axios.post('http://localhost:5000/user/signup', user);
            if(data.message='success'){
                alert("Registred successfully")
                navigate("/")
                setLoading(false)
            }
        } catch (err) {
            console.error('There was an error signing up!', err);
            setError(err.response.data.error);
            setShowError(true);
        }
    }

    return (
        <div className="container text-center pt-5 w-50 text-white mb-5">
            <h3 className='mb-5'>Welcome to Nota</h3>
            <form className='form-control text-start sec border-black' onSubmit={signUp}>
                <div className="form-group m-2 p-2 text-white">
                    <label htmlFor="name" className='m-2'>Name</label>
                    <input onChange={getData} type="text" className="form-control in prim" id="name" name='name' placeholder="Enter your name" />
                </div>
                <div className="form-group m-2 p-2 text-white">
                    <label htmlFor="email" className='m-2'>Email</label>
                    <input onChange={getData} type="email" className="form-control in prim" id="email" name='email' placeholder="Enter your email" />
                </div>
                <div className="form-group m-2 p-2 text-white">
                    <label htmlFor="age" className='m-2'>Age</label>
                    <input onChange={getData} type="text" className="form-control in prim" id="age" name='age' placeholder="Enter age" />
                </div>
                <div className="form-group m-2 p-2 text-white">
                    <label htmlFor="password" className='m-2'>Password</label>
                    <input onChange={getData} type="password" className="form-control in prim" id="password" name='password' placeholder="Enter password" />
                </div>
                <div className="form-group m-2 p-2 text-white">
                    <label htmlFor="cPassword" className='m-2'>Confirm Password</label>
                    <input onChange={getData} type="password" className="form-control in prim" id="cPassword" name='cPassword' placeholder="Confirm your password" />
                </div>
                <div className="d-flex justify-content-center m-3">
                    <button type="submit" className={"btn btn-dark m-2 mx-5"}>{loading?<i className='fa fa-spin fa-spinner'></i>:"Register"}</button>
                </div>
                {

                    showError && <div className="alert alert-danger text-center" role="alert">
                            {errorApi}
                    </div>
                }
            </form>
        </div>
    );
}