import React, { useContext, useEffect } from 'react';
import noteContext from '../Contexts/notes/noteContext';
import NotesItem from './NotesItem';
import NoteModal from './NoteModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    // used to redirect to another component
    let navigate = useNavigate();
    // taking context
    const context = useContext(noteContext);
    // importing  notes, AddNewNote and getNotes function
    const { notes, AddNewNote, getNotes } = context;
    // this will get all notes realted to logged in user on first render only
    useEffect(() => {
        if (!sessionStorage.getItem("auth-token")) {
            // redirecting to login component
            navigate("/");
        }
        getNotes()
    }, []);
    // this function take the note and import the structure of the note
    return (
        <div className="my-3">
            <Container>
                <Row>
                    <Col className="col-sm-11 col-md-11 col-lg-11 col-xl-11 col-9"><h1>Your Notes</h1></Col>
                    <Col className="col-sm-1 col-md-1 col-lg-1 col-xl-1 col-1"> <NoteModal showAlert={props.showAlert} iconType="fa-plus p-2 fa-2x" noteFunction={AddNewNote} modalTitle="Add New" valueForTitle="" valueForDescription="" noteId="" /></Col>
                </Row>
            </Container>
            <div className="container my-3 row">
                <div className="container mx-3">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NotesItem showAlert={props.showAlert} key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}
