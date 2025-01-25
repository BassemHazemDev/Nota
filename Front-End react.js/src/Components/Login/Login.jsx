import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { getEmail } from '../../PrivateRoute/PrivateRoute';

export default function Login() {
    let [user, setUser] = useState({
        "email": " ",
        "password": " "
    })
    let [error, setError] = useState({})
    let [loading, setLoading] = useState(false)
    let [showError, setShowError] = useState(false);

    let navigate = useNavigate();


    function getData(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    async function signIn(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post('http://localhost:5000/user/signin', user);
            if (data.message = 'success') {
                localStorage.setItem("token",data.token)
                getEmail(user.email)
                navigate("/home")
                setLoading(false)
                window.location.reload();
            }
        } catch (error) {
            console.error('There was an error signing up!', error);
            setError(error.response.data.error);
            setShowError(true);
        }
    }


    return (
        <>
            <div className="container text-center pt-5 w-50 text-white">
                <h3 className='mb-5'>Welcome back to Nota</h3>
                <form onSubmit={signIn} className='form-control text-start sec border-black'>
                    <div className="form-group m-2 p-2 text-white">
                        <label htmlFor="email" className='m-2'>Email</label>
                        <input onChange={getData} type="email" className="form-control in prim" name='email' id="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group m-2 p-2 text-white">
                        <label htmlFor="password" className='m-2'>Password</label>
                        <input onChange={getData} type="password" className="form-control in prim" name='password' id="password" placeholder="Enter password" />
                    </div>
                    <div className="d-flex justify-content-center m-3">
                    <button type="submit" className={"btn btn-dark m-2 mx-5"}>{loading?<i className='fa fa-spin fa-spinner'></i>:"Login"}</button>
                        <button type='button' className="btn btn-dark m-2 mx-5">
                            <Link className='text-decoration-none text-white' to={"/register"}>Register</Link>
                        </button>
                    </div>

                    {

                        showError && <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    }
                </form>
            </div>
        </>
    );
}
