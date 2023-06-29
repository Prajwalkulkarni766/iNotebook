import React, { useContext } from 'react';
import noteContext from '../Contexts/notes/noteContext';
import Card from 'react-bootstrap/Card';
import NoteModal from './NoteModal';

export default function NotesItem(props) {
    // taking context
    const context = useContext(noteContext);
    // importing DeleteNote and EditNote function
    const { DeleteNote, EditNote } = context;
    // this function make a structure of note
    return (
        <div className="col-md-4 my-1">
            <Card>
                <Card.Body>
                    <Card.Title>{props.note.title}</Card.Title>
                    <Card.Text>
                        {props.note.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className="float-start">{props.note.date}</div>
                    <div className="float-end">
                        <i className="fa-solid fa-trash mx-1" style={{ color: "red" }} onClick={() => { DeleteNote(props.note._id); }}></i>
                        <NoteModal iconType="fa-pen-to-square mx-1 text-primary" noteFunction={EditNote} modalTitle="Edit" showAlert={props.showAlert} valueForTitle={props.note.title} valueForDescription={props.note.description} noteId={props.note._id} />
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}