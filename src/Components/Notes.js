import React, { useContext } from 'react';
import noteContext from '../Contexts/notes/noteContext';
import NotesItem from './NotesItem';
import NoteModal from './NoteModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Notes() {
    // taking context
    const context = useContext(noteContext);
    const { notes, AddNewNote } = context;
    // this function take the note and import the structure of the note
    return (
        <div className="my-3">
            <Container>
                <Row>
                    <Col className="col-sm-11 col-md-11 col-lg-11 col-xl-11 col-9"><h1>Your Notes</h1></Col>
                    <Col className="col-sm-1 col-md-1 col-lg-1 col-xl-1 col-1"> <NoteModal iconType="fa-plus p-2 fa-2x" noteFunction={AddNewNote} modalTitle="Add New" valueForTitle="" valueForDescription="" noteId="" /></Col>
                </Row>
            </Container>
            <div className="container my-3 row">
                {notes.map((note) => {
                    return <NotesItem key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}
