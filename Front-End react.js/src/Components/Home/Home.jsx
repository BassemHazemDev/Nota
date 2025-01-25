import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000';
const NOTE_ENDPOINT = `${API_URL}/note`;

export default function Home() {
    let [userToken, setUserToken] = useState('')
    let [currentUserId, setCurrentUserId] = useState('')
    let [notes, setNotes] = useState([]);
    let [noteId, setNoteId] = useState('')
    let [noteTitle, setNoteTitle] = useState('');
    let [noteBody, setNoteBody] = useState('');
    let [isEditing, setIsEditing] = useState(false);
    let [error, setError] = useState({})
    let [showError, setShowError] = useState(false);
    let [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserToken(token);
            setCurrentUserId(decodedToken.userId);
        }
    }, []);

    const fetchNotes = () => {
        if (userToken) {
            axios.get(`${NOTE_ENDPOINT}/${currentUserId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then(response => {
                    setNotes(response.data.notes);
                })
                .catch(error => handleApiError(error));;
        }
    };
    useEffect(() => {
        fetchNotes();
    }, [userToken, currentUserId]);

    const addNote = (e) => {
        e.preventDefault();
        if (noteTitle === '' && noteBody === '') {
            alert('Please fill in all fields to create a note');
            return;
        }
        let newNote = { title: noteTitle, description: noteBody };
        axios.post(`${NOTE_ENDPOINT}/add`, newNote, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then(res => {
            fetchNotes();
            setNoteTitle('');
            setNoteBody('');
            setShowError(false);
        }).catch(error => handleApiError(error));

    };


    const displayNotes = () => {
        return notes.filter((note) => {
            const title = note.title.toLowerCase();
            const description = note.description.toLowerCase();
            const query = searchQuery.toLowerCase();
            return title.includes(query) || description.includes(query);
        }).map((note, index) => (
            <div key={index} className="col-md-3 text-center mb-4">
                <div className="card sec text-white">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <button className="btn btn-primary w-25 m-1 homeBtn"
                            onClick={() => updateNote(note._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button className="btn btn-danger w-25 m-1 del homeBtn redBtn"
                            onClick={() => confirmDelete(note._id)}>Delete</button>
                    </div>
                </div>
            </div>
        ));
    };
    const confirmDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote(id);
        }
    }
    const deleteNote = (id) => {
        axios.delete(`${NOTE_ENDPOINT}/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then(res => {
            fetchNotes();
            setShowError(false);
        }).catch(error => handleApiError(error));
    }


    const updateNote = (id) => {
        let note = notes.find((e) => {
            return e._id === id
        })
        setNoteId(note._id)
        setNoteTitle(note.title);
        setNoteBody(note.description);
        setIsEditing(true);
    }

    const saveNoteUpdate = (e) => {
        e.preventDefault();
        axios.put(`${NOTE_ENDPOINT}/update`, {
            _id: noteId,
            title: noteTitle,
            description: noteBody
        },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(res => {
            fetchNotes();
            setIsEditing(false);
            setNoteTitle("");
            setNoteBody("");
            setIsEditing(false)
            setShowError(false);
        }).catch(error => handleApiError(error));
    }

    const handleApiError = (error) => {
        if (error.response.data.error === 'Invalid token') {
            localStorage.setItem('token', "")
            localStorage.setItem('isAuthenticated', "")
            setUserToken('');
            setCurrentUserId('');
            navigate('/');            
        } else {
            setError(error.response.data.error);
            setShowError(true);
        }
    }

    return (
        <>
            <div className="container text-white mt-4">
                <div className=" d-flex flex-column justify-content-center align-items-center w-100 mb-2">
                    <label htmlFor="search" className='mb-1 fw-bold fs-5'>Search</label>
                    <input type="text" name='search' id='search' className='form-control w-25' value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <div className="container d-flex justify-content-center my-4">
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add a new note
                    </button>
                    {
                        showError && <div className="alert alert-danger text-center my-3" role="alert">
                            {error}
                        </div>
                    }
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content prim text-white">
                            <div className="modal-header sec">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{isEditing ? "Editing a note" : "Adding a note"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form form onSubmit={isEditing ? saveNoteUpdate : addNote}>
                                <div className="modal-body d-flex justify-content-center align-items-center ">
                                    <div className="row mt-3 w-75">
                                        <input type="text" id="noteTitle" className="form-control w-100 mb-3 prim in" placeholder="Note Title"
                                            value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                                        <textarea id="noteBody" className="form-control w-100 mb-3 prim in" placeholder="Note Body"
                                            value={noteBody} onChange={(e) => setNoteBody(e.target.value)} />
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center align-items-center">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" aria-label="Close">{isEditing ? 'Save' : 'Add'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-white vh-100">
                <div className="row" id="notes">
                    {displayNotes()}
                </div>
            </div>
        </>
    );
}