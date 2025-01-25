import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
    <div className="container text-white">
      <div className="d-flex flex-column align-items-center vh-100 mt-5">
        <h2>The page is not found</h2>
        <p>please try to login or go to home page</p>
        <div className="d-flex justify-content-between">
        <button className="btn btn-primary rounded-2 mt-2 mx-5" >
          <Link className='text-decoration-none text-white' to={"/login"}>Login</Link></button>
        <button className="btn btn-primary rounded-2 mt-2 mx-5" >
        <Link className='text-decoration-none text-white' to={"/"}>Home</Link></button>
        </div>
      </div>
    </div>
    
    </>
  )
}
