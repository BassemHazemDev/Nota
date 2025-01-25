import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!authStatus);
    }, []);

    function logout() {
        localStorage.setItem('token', "");
        localStorage.setItem('isAuthenticated', "");
        setIsAuthenticated(false);
    }

    return (
        <>
            <nav className="navbar border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Nota</a>
                    {isAuthenticated && (
                        <button className="btn btn-danger fs-6 m-1 del homeBtn redBtn">
                            <Link className='text-decoration-none text-white' onClick={logout} to={"/"}>Logout</Link>
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
}
